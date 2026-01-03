import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ResponsiveContainer } from "recharts";

const ATSChart = ({ data }) => {
  const chartData = data.map((r) => ({
    version: `v${r.version}`,
    score: r.atsScore,
  }));

  return (
    // <LineChart width={500} height={300} data={chartData}>
    //   <CartesianGrid />
    //   <XAxis dataKey="version" />
    //   <YAxis />
    //   <Tooltip />
    //   <Line dataKey="score" />
    // </LineChart>

    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        width={600}
        height={320}
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

        <XAxis
          dataKey="version"
          tick={{ fill: "#6B7280", fontSize: 12 }}
          axisLine={{ stroke: "#D1D5DB" }}
          tickLine={false}
        />

        <YAxis
          domain={[0, 100]}
          tick={{ fill: "#6B7280", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
          labelStyle={{ color: "#374151", fontWeight: 600 }}
          itemStyle={{ color: "#2563EB" }}
        />

        <Line
          type="monotone"
          dataKey="score"
          stroke="#2563EB"
          strokeWidth={3}
          dot={{ r: 5, strokeWidth: 2, fill: "#FFFFFF" }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ATSChart;
