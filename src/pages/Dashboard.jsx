import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent } from "../components/ui/card";
import { Users, DollarSign, TrendingUp } from "lucide-react";

const barData = [
  { name: "Jan", loans: 4000 },
  { name: "Feb", loans: 3000 },
  { name: "Mar", loans: 5000 },
  { name: "Apr", loans: 7000 },
];

const pieData = [
  { name: "Paid", value: 60 },
  { name: "Pending", value: 30 },
  { name: "Defaulted", value: 10 },
];

const COLORS = ["#10B981", "#FBBF24", "#EF4444"];

const Dashboard = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <Card className="flex items-center p-4 bg-white shadow-md rounded-xl">
        <Users className="text-blue-600 w-10 h-10" />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">Total Customers</h3>
          <p className="text-2xl font-bold">1,045</p>
        </div>
      </Card>
      <Card className="flex items-center p-4 bg-white shadow-md rounded-xl">
        <DollarSign className="text-green-600 w-10 h-10" />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">Total Loans</h3>
          <p className="text-2xl font-bold">$124,500</p>
        </div>
      </Card>
      <Card className="flex items-center p-4 bg-white shadow-md rounded-xl">
        <TrendingUp className="text-red-600 w-10 h-10" />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl font-bold">$89,200</p>
        </div>
      </Card>

      {/* Charts Section */}
      <Card className="col-span-2 p-4 bg-white shadow-md rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Loan Disbursement</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="loans" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4 bg-white shadow-md rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Loan Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dashboard;
