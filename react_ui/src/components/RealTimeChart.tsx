import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import { CategoryScale } from "chart.js";
import { socket } from "../service/socket";

import Chart from "chart.js/auto";

Chart.register(CategoryScale);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const RealTimeChart = () => {
  const labels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const [data, setData] = useState<any>([
    { x: 0, y: 0 },
    { x: 10, y: 10 },
  ]);

  const CData = {
    labels: labels,
    datasets: [
      {
        data: data,
      },
    ],
  };
  useEffect(() => {
    console.log("RealTimeChart");
    socket.on("createWschat", (value: any) => {
      console.log("createWschat---->", value);
      setData([...data, { x: value, y: value / 2 }]);
      console.log(data);
    });
    return () => {
      socket.off("createWschat");
    };
  }, [data]);

  return <Line options={options} data={CData} />;
};

export default RealTimeChart;
