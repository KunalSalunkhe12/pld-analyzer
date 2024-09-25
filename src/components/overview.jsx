import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { formatCurrency, COLORS } from "./utils";

export const Overview = ({ data }) => {
  const pieChartData = Object.entries(data.totals)
    .filter(
      ([key]) =>
        key !== "discount" && key !== "total_cost" && key !== "base_rate"
    )
    .map(([key, value]) => ({
      name: key.replace(/_/g, " ").toUpperCase(),
      value: Math.abs(value),
    }));

  pieChartData.push({
    name: "BASE RATE",
    value: Math.abs(data.totals.base_rate),
  });

  const costBeforeDiscount = Object.entries(data.totals)
    .filter(([key]) => key !== "discount" && key !== "total_cost")
    .reduce((sum, [_, value]) => sum + value, 0);

  const discountData = [
    { name: "Cost Before Discount", value: costBeforeDiscount },
    { name: "Discount", value: Math.abs(data.totals.discount) },
    {
      name: "Total Cost",
      value: costBeforeDiscount - Math.abs(data.totals.discount),
    },
  ];

  return (
    <>
      <div className="mb-8">
        <Card className="bg-blue-500 bg-opacity-15">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              TOTAL COST
            </CardTitle>
            <Badge variant="secondary" className="bg-blue-500 text-white">
              Current
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {formatCurrency(data.totals.total_cost)}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-green-500 bg-opacity-15">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              DISCOUNT
            </CardTitle>
            <Badge variant="secondary" className="bg-green-500 text-white">
              Current
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(data.totals.discount)}
            </div>
          </CardContent>
        </Card>
        {Object.entries(data.totals)
          .filter(([key]) => key !== "discount" && key !== "total_cost")
          .map(([key, value]) => (
            <Card key={key} className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {key.replace(/_/g, " ").toUpperCase()}
                </CardTitle>
                <Badge variant="secondary" className="bg-red-500 text-white">
                  Current
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(value)}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Current Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ color: "white" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Discount Visualization</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={discountData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />

                <XAxis dataKey="name" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    color: "white",
                  }}
                />

                <Bar dataKey="value" fill="#8884d8">
                  {discountData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.name === "Discount"
                          ? COLORS[1]
                          : entry.name === "Total Cost"
                          ? COLORS[2]
                          : "#6B7280"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
