"use client";
import React, { useState } from "react";
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

const PositionChart = React.memo(({ allData }: { allData: ChartData }) => {
  const positionData = Object.keys(allData.position ?? {}).map((key) => ({
    name: key,
    value: allData.position?.[key] ?? 0,
  }));
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042", // 4 สีเดิม
    "#0070E0",
    "#00A77E",
    "#E0A700",
    "#E05C00", // โทนเข้มขึ้น
    "#339CFF",
    "#33D1A1",
    "#FFD166",
    "#FF9F66", // โทนอ่อนลง
    "#0056A0",
    "#008060", // เพิ่มเฉดที่เข้มกว่าตัวหลัก
  ];

  const generateColor = (index: number) => COLORS[index % COLORS.length];

  return (
    <div className="w-full h-fit flex justify-center">
      <Card className="w-[600px]">
        {/* <CardHeader className="text-center">
          รายชื่อสถานประกอบการแยกตามสายการเรียน
        </CardHeader> */}
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{ fontSize: "12px" }} // ✅ ใช้ wrapperStyle
              />
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={positionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {positionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={generateColor(index)} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
});

export default PositionChart;
