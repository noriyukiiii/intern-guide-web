"use client";

import React, { useEffect, useState, useRef } from "react"; // เพิ่ม useRef ที่นี่
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

  // 👉 กำหนดความยาวสูงสุดของแต่ละบรรทัด
  const maxLineLength = 11;

  // 🔹 แบ่งข้อความตามคำ (เว้นวรรค) และจัดกลุ่มให้เหมาะสม
  const words = payload.name.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word: any) => {
    if ((currentLine + " " + word).trim().length <= maxLineLength) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);

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

      {/* 🔹 ใช้ <tspan> เพื่อให้ขึ้นบรรทัดใหม่ตามการตัดคำ */}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {lines.map((line, index) => (
          <tspan
            key={index}
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            dy={index === 0 ? 0 : 18}
          >
            {line}
          </tspan>
        ))}
      </text>

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={lines.length * 18 + 6} // ปรับให้ % อยู่ถัดจากข้อความสุดท้าย
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

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

const ProvinceChart = React.memo(
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
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // ใช้ useRef เก็บสี เพื่อไม่ให้ข้อมูลหายเมื่อ allData เปลี่ยนแปลง
    const colorsRef = useRef<Map<string, string>>(new Map());

    // ฟังก์ชั่นสำหรับโหลดสีจาก sessionStorage หรือ localStorage
    const loadColorsFromStorage = () => {
      const savedColors = localStorage.getItem("provinceColors");
      if (savedColors) {
        return new Map(JSON.parse(savedColors));
      }
      return new Map();
    };

    // ฟังก์ชั่นสำหรับเก็บสีลงใน sessionStorage หรือ localStorage
    const saveColorsToStorage = (colors: Map<string, string>) => {
      localStorage.setItem(
        "provinceColors",
        JSON.stringify(Array.from(colors.entries()))
      );
    };

    // กำหนดสีเริ่มต้นสำหรับแต่ละชื่อของ province
    useEffect(() => {
      const defaultColors = [
        "#0088FE", // Blue
        "#00C49F", // Green
        "#FFBB28", // Yellow
        "#FF8042", // Orange
        // "#A28BFF", // Purple
        "#C70039", // Dark Red
        "#B57170", // Dark Purple
        "#20b912", // Chartreuse Green
        "#FF1493", // Deep Pink
        "#8A2BE2", // Blue Violet
        // "#32CD32", // Lime Green
        // "#FF6384", // Pink
        // "#36A2EB", // Light Blue
        // "#FFCE56", // Light Yellow
        "#4BC0C0", // Teal
        // "#9966FF", // Violet
        "#FF5733", // Red-Orange
        "#900C3F", // Dark Maroon
        // "#DAF7A6", // Light Green
        // "#FFC300", // Bright Yellow
        "#FF69B4", // Hot Pink
      ];

      // localStorage.removeItem("provinceColors");
      // console.log(localStorage.getItem("provinceColors"));
      // โหลดสีที่เก็บใน localStorage (ถ้ามี)
      const storedColors = loadColorsFromStorage();

      // ตั้งค่าสีเริ่มต้นหากยังไม่เคยมีสีเก็บ
      Object.keys(allData.province ?? {}).forEach((key, index) => {
        if (!storedColors.has(key)) {
          storedColors.set(key, defaultColors[index % defaultColors.length]);
        }
      });

      // เก็บสีลงใน localStorage
      saveColorsToStorage(storedColors);
      colorsRef.current = storedColors;
    }, [allData.province]); // 🔹 ใช้ allData.province เท่านั้นเป็น dependency

    // กำหนด province โดยใช้สีที่เก็บไว้ใน colorsRef
    const provinceData = Object.keys(allData.province ?? {}).map((key) => ({
      name: key,
      value: allData.province[key] ?? 0,
      color: colorsRef.current.get(key) || "#8884d8", // ใช้สีที่เก็บไว้
    }));

    // เมื่อเลือกใหม่ ควรอัพเดท selectedIndex
    useEffect(() => {
      const index = provinceData.findIndex((item) => item.name === selected);
      setSelectedIndex(index !== -1 ? index : null);
      setActiveIndex(index !== -1 ? index : undefined);
    }, [selected, provinceData]);

    const onPieEnter = (_: any, index: any) => {
      if (selectedIndex === null) {
        setActiveIndex(index);
      }
    };

    const onPieLeave = () => {
      setActiveIndex(selectedIndex ?? undefined);
    };

    const onPieClick = (_: any, index: number) => {
      const newIndex = index === selectedIndex ? null : index;
      setSelectedIndex(newIndex);
      setActiveIndex(newIndex ?? undefined);
      onSelect(newIndex !== null ? provinceData[newIndex].name : null);
    };

    return (
      <div className="w-full h-fit flex justify-center">
        <Card className="w-[600px]">
          <CardContent>
            <CardHeader>
              <div className="w-full flex justify-center font-bold text-2xl">
                ตำแหน่ง
              </div>
            </CardHeader>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{ fontSize: "12px", paddingTop: "0px" }}
                />
                <Pie
                  activeIndex={activeIndex}
                  data={provinceData}
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
                  {provinceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color} // ใช้สีที่เก็บไว้ใน ref
                      opacity={
                        selectedIndex === null ||
                        selectedIndex === index ||
                        activeIndex === index
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

export default ProvinceChart;
