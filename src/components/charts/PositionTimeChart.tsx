import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: {
    time: number;
    space: number;
  }[];
  maxTime: number;
  minDistance: number;
  maxDistance: number;
  width?: number;
};

export function PositionTimeChart({
  data,
  maxTime,
  minDistance,
  maxDistance,
  width
}: Props) {
  return (
    <LineChart width={width == null?400:width} height={260} data={data}>
      <CartesianGrid strokeDasharray="5 3" />
      <XAxis
        dataKey="time"
        type="number"
        domain={[0, maxTime]}
        label={{
          value: "Tempo (s)",
          position: "insideBottom",
        }}
      />
      <YAxis
        type="number"
        domain={[minDistance, maxDistance]}
        label={{
          value: "Espaço (m)",
        }}
      />
      <Tooltip />
      <Line
        type="linear"
        dataKey="space"
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );
}
