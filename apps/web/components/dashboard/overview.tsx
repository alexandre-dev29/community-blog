"use client"

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000),
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000),
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000),
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000),
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000),
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000),
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000),
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000),
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000),
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000),
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000),
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000),
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip/>
        <Legend/>
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#1d9efa" radius={[4, 4, 0, 0]}/>
      </BarChart>
    </ResponsiveContainer>
  )
}
