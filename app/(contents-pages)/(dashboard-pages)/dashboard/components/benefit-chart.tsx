"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChartData } from "@/lib/dashboardtype";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
  Legend,
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
        ตำแหน่ง
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0]; // ดึงข้อมูลจาก payload ที่ถูกส่งมา

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

const BenefitChart = React.memo(
  ({
    allData,
    onSelect,
    selected, // ✅ รับค่าที่ถูกเลือกจาก `ContentChart`
  }: {
    allData: ChartData;
    onSelect: (selected: string | null) => void;
    selected: string | null; // ✅ เพิ่ม prop นี้
  }) => {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(-1);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    // ✅ แปลงข้อมูลให้อยู่ในรูปที่ PieChart ใช้ได้
    const benefitData = Object.keys(allData.benefit ?? {}).map((key) => ({
      name: key,
      value: allData.benefit[key] ?? 0,
    }));

    // ✅ เมื่อ `selected` เปลี่ยน ต้อง sync กับ `selectedIndex`
    useEffect(() => {
      const index = benefitData.findIndex((item) => item.name === selected);
      setSelectedIndex(index !== -1 ? index : null);
      setActiveIndex(index !== -1 ? index : undefined);
    }, [selected, benefitData]);

    const onPieEnter = (_: any, index: any) => {
      if (selectedIndex === null) {
        setActiveIndex(index);
      }
    };

    const onPieLeave = () => {
      setActiveIndex(selectedIndex ?? undefined);
    };

    const onPieClick = (data: any, index: number) => {
      const newIndex = index === selectedIndex ? null : index;
      setSelectedIndex(newIndex);
      setActiveIndex(newIndex ?? undefined);

      // ✅ ส่งค่าชื่ออาชีพกลับไปให้ Parent Component
      onSelect(newIndex !== null ? benefitData[newIndex].name : null);
    };

    return (
      <div className="w-full h-fit flex justify-center">
        <Card className="w-[600px]">
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{ fontSize: "12px" }}
                />
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={benefitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  onClick={onPieClick}
                >
                  {benefitData.map((entry, index) => (
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

export default BenefitChart;
