"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartData } from "@/lib/dashboardtype";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Sector,
} from "recharts";
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {` ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};
const occupationMapping: Record<string, string> = {
  No_Info: "ไม่มีข้อมูล",
  Network: "Network",
  database: "Database",
  both: "ทั้งสองสาย",
};

const occupationOrder = ["No_Info", "Network", "database", "both"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="custom-tooltip p-3 rounded-lg shadow-lg bg-white opacity-90 border border-gray-200">
        <p className="label text-sm font-semibold text-gray-700">
          {`${name} : ${value} บริษัท`}
        </p>
      </div>
    );
  }
  return null;
};

const OccupationChart = React.memo(
  ({
    allData,
    onSelect,
    selected,
  }: {
    allData: ChartData;
    onSelect: (selected: string | null) => void;
    selected: string | null;
  }) => {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(-1);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(
      typeof window !== "undefined"
        ? Number(localStorage.getItem("selectedIndex")) || null
        : null
    );

    const occupationData = occupationOrder.map((key) => ({
      name: occupationMapping[key] || key,
      value: allData.occupation?.[key] ?? 0,
    }));

    useEffect(() => {
      if (selected) {
        const index = occupationData.findIndex(
          (item) => item.name === selected
        );
        setSelectedIndex(index !== -1 ? index : null);
        setActiveIndex(index !== -1 ? index : undefined);
      }
    }, [selected, occupationData]);

    useEffect(() => {
      if (typeof window !== "undefined") {
        if (selectedIndex !== null) {
          localStorage.setItem("selectedIndex", String(selectedIndex));
        } else {
          localStorage.removeItem("selectedIndex");
        }
      }
    }, [selectedIndex]);

    const onPieEnter = (_: any, index: number) => {
      if (selectedIndex === null) setActiveIndex(index);
    };

    const onPieLeave = () => {
      setActiveIndex(selectedIndex ?? undefined);
    };

    const onPieClick = (_: any, index: number) => {
      const newIndex = index === selectedIndex ? null : index;
      setSelectedIndex(newIndex);
      setActiveIndex(newIndex ?? undefined);
      onSelect(newIndex !== null ? occupationData[newIndex].name : null);
    };

    return (
      <div className="w-full h-fit flex justify-center">
        <Card className="w-[600px]">
          <CardContent>
            <CardHeader>
              <div className="w-full flex justify-center font-bold text-2xl">
                สายการเรียน
              </div>
            </CardHeader>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{ fontSize: "14px", paddingTop: "30px" }}
                />
                <Pie
                  activeIndex={activeIndex}
                  data={occupationData}
                  activeShape={renderActiveShape}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={1}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  onClick={onPieClick}
                >
                  {occupationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      opacity={
                        selectedIndex === null || selectedIndex === index
                          ? 1
                          : 0.6
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  }
);

export default OccupationChart;
