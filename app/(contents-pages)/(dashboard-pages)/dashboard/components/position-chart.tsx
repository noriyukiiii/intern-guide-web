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

const PositionChart = React.memo(({ allData }: { allData: ChartData }) => {
  const positionData = Object.keys(allData.position ?? {}).map((key) => ({
    name: key,
    value: allData.position?.[key] ?? 0,
  }));
  const COLORS_BLUE_GREEN = [
    "#FBD55B",
    "#DB8FBE",
    "#228765",
    "#FF9E3D",
    "#4999CA",
    "#FF7847",
    "#8387C3",
  ];

  const generateColor = (index: number) => {
    const hue = (index * 137) % 360; // กระจายสีแบบสุ่ม
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div className="w-full h-fit flex justify-center">
      <Card className="w-[300px]">
        <CardHeader>ตำแหน่ง</CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Tooltip />
              <Pie
                data={positionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={false}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {positionData.map((entry, index) => (
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

export default PositionChart;
