// components/CompanyBarChart.tsx
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion"; // Animation
import { useMemo } from "react";

// Helper function to generate random colors for each bar
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface CompanyBarChartProps {
  companyData: { name: string; value: number }[];
  barColor?: string;
}

const CompanyBarChart = ({
  companyData,
  barColor = "#6366F1",
}: CompanyBarChartProps) => {
  // Use random colors for each bar if no barColor is provided
  const barColors = useMemo(() => {
    return companyData.map(() => generateRandomColor());
  }, [companyData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-2xl border border-gray-200 bg-white rounded-xl">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-t-xl p-4">
          <CardTitle className="text-2xl font-semibold">
            📊 จำนวนบริษัทที่อยู่ใน MOU และ นอก MOU
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={companyData}>
              <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 12 }} />
              <YAxis tick={{ fill: "#555", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Bar
                dataKey="value"
                fill={barColor}
                radius={[10, 10, 0, 0]}
                barSize={20}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompanyBarChart;
