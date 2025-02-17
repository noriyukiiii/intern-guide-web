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
import { motion } from "framer-motion"; // ใช้ Animation

interface CompanyBarChartProps {
  companyData: { name: string; value: number }[];
  barColor?: string;
}

const CompanyBarChart = ({
  companyData,
  barColor = "#6366F1",
}: CompanyBarChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-xl border border-gray-200 bg-white rounded-xl">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-t-xl p-4">
          <CardTitle className="text-xl font-semibold">
            📊 จำนวนบริษัท MOU และ Non-MOU
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={companyData}>
              <XAxis dataKey="name" tick={{ fill: "#555" }} />
              <YAxis tick={{ fill: "#555" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="value" fill={barColor} radius={[10, 10, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompanyBarChart;
