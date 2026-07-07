import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    time: number;
    speed: number;
  }[];
  maxTime: number;
  minSpeed: number;
  maxSpeed: number;
  width?: number;
};

export function SpeedTimeChart({
  data,
  maxTime,
  minSpeed,
  maxSpeed,
  width
}: Props) {
  return (
    <ResponsiveContainer width="100%" height={295}>
      <LineChart width={width == null?400:width} height={260} data={data}>
        <CartesianGrid stroke="#555" strokeDasharray="3 5" opacity={0.4} />
        <XAxis
          stroke="#fff"
          tick={{ fill: "#fff", fontSize: 12 }}
          dataKey="time"
          type="number"
          domain={[0, maxTime]}
          label={{
            value: "Tempo (s)",
            position: "insideBottom",
            offset: -2,
            fill: "#fff",
          }}
        />
        <YAxis
          stroke="#fff"
          tick={{ fill: "#fff", fontSize: 12 }}
          type="number"
          domain={[minSpeed, maxSpeed]}
          label={{
            value: "Velocidade (m/s)",
            angle: -90,
            fill: "#fff",
          }}
        />
        <Tooltip
          formatter={(value) => [Number(value).toFixed(3) + "m/s", "Velocidade"]}
          labelFormatter={(label) => `Tempo : ${Number(label).toFixed(3)}s`}
          contentStyle={{
            backgroundColor: "#18181b",
            border: "1px solid #444",
            borderRadius: 8,
          }}
          labelStyle={{ color: "#fff" }}
          itemStyle={{ color: "#60a5fa" }}
        />
        <Line
          type="linear"
          dataKey="speed"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}