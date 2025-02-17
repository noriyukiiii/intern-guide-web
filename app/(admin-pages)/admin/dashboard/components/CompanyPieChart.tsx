// components/CompanyPieChart.tsx
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion"; // ใช้ Animation

interface CompanyPieChartProps {
  companyData: { name: string; value: number }[];
  colors?: string[];
}

const CompanyPieChart = ({
  companyData,
  colors = ["#4F46E5", "#EF4444"],
}: CompanyPieChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-xl border border-gray-200 bg-white rounded-xl">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-xl p-4">
          <CardTitle className="text-xl font-semibold">
            🏢 สัดส่วนบริษัท MOU vs Non-MOU
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={companyData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {companyData.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompanyPieChart;
