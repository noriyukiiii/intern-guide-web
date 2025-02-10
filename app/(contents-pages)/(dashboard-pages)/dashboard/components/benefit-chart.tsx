"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChartData } from "@/lib/dashboardtype";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const BenefitChart = React.memo(({ allData }: { allData: ChartData }) => {
  const benefitDescData = Object.keys(allData.benefit ?? {}).map(
    (key) => ({
      name: key,
      value: allData.benefit?.[key] ?? 0,
    })
  );

  const generateColor = (index: number) => {
    const goldenRatio = 0.61803398875; // ค่า Golden Ratio
    const hue = (index * goldenRatio * 360) % 360; // กระจายสีทั่วสเปกตรัม
    return `hsl(${hue}, 70%, 50%)`; // ปรับค่าความเข้มของสีให้ดูสวยงาม
  };

  const COLORS_BLUE_GREEN = [
    "#4D9DE0", // สีฟ้าสด
    "#F79C42", // สีส้มอ่อน
    "#6C5B7B", // สีม่วงอ่อน
    "#F1C6A1", // สีครีมอ่อน
    "#F6A2B1", // สีชมพูพีช
    "#A1C4D4", // สีฟ้าอ่อน
    "#B5E3B4", // สีเขียวอ่อน
    "#D6D6D6", // สีเทาอ่อน
    "#B5C6B7", // สีเขียวเทา
    "#D6A4A4", // สีชมพูอ่อน
    "#8C3136", // สีแดงเข้ม
    "#3E0A28", // สีม่วงแดง
  ];

  return (
    <div className="w-full h-fit flex justify-center">
      <Card className="w-[300px]">
        <CardHeader>สวัสดิการ</CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Tooltip />
              <Pie
                data={benefitDescData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {benefitDescData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS_BLUE_GREEN[index % COLORS_BLUE_GREEN.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
});

export default BenefitChart;
