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
import { Card } from "../components/ui/card";
import { Users, DollarSign, TrendingUp } from "lucide-react";
import { useCustomer } from "../context/CustomerContext";
import { useLoan } from "../context/LoanContext";

const Dashboard = () => {
  const { customers } = useCustomer();
  const { loan } = useLoan();

  // Aggregate loan data
  const totalLoans = loan.reduce(
    (acc, curr) => acc + Number(curr.loanAmount),
    0
  );
  const revenue = loan.reduce(
    (acc, curr) =>
      acc + (Number(curr.loanAmount) * Number(curr.interestRate)) / 100,
    0
  );
  const barData = loan.reduce((acc, curr) => {
    const month = new Date().toLocaleString("default", { month: "short" });
    const existing = acc.find((item) => item.name === month);
    if (existing) {
      existing.loans += Number(curr.loanAmount);
    } else {
      acc.push({ name: month, loans: Number(curr.loanAmount) });
    }
    return acc;
  }, []);

  const paid = loan.filter((l) => l.status === "Paid").length;
  const pending = loan.filter((l) => l.status === "Pending").length;
  const defaulted = loan.filter((l) => l.status === "Defaulted").length;

  const pieData = [
    { name: "Paid", value: paid },
    { name: "Pending", value: pending },
    { name: "Defaulted", value: defaulted },
  ];

  const COLORS = ["#10B981", "#FBBF24", "#EF4444"];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <Card className="flex items-center p-4 bg-white shadow-md rounded-xl">
        <Users className="text-blue-600 w-10 h-10" />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">Total Customers</h3>
          <p className="text-2xl font-bold">{customers.length}</p>
        </div>
      </Card>
      <Card className="flex items-center p-4 bg-white shadow-md rounded-xl">
        <DollarSign className="text-green-600 w-10 h-10" />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">Total Loans</h3>
          <p className="text-2xl font-bold">${totalLoans}</p>
        </div>
      </Card>
      <Card className="flex items-center p-4 bg-white shadow-md rounded-xl">
        <TrendingUp className="text-red-600 w-10 h-10" />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl font-bold">${revenue.toFixed(2)}</p>
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
