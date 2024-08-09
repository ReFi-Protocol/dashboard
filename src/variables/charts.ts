import { ApexOptions } from "apexcharts";

export const lineChartDataTotalSpent: ApexAxisChartSeries = [
  {
    name: "Exchange rate",
    data: [50, 64, 48, 66, 49, 68, 71, 70],
    color: "#07BA9A",
  },
] as const;

export const lineChartOptionsTotalSpent: ApexOptions = {
  legend: {
    show: false,
  },
  theme: {
    mode: "light",
  },
  chart: {
    type: "line",
    toolbar: {
      show: false,
    },
    background: "transparent",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  tooltip: {
    style: {
      fontSize: "12px",
    },
    theme: "dark",
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
  grid: {
    show: false,
  },
  xaxis: {
    axisBorder: {
      show: true,
      color: "#A7A7A7",
    },
    axisTicks: {
      show: true,
      color: "#A7A7A7",
    },
    labels: {
      style: {
        colors: "#A7A7A7",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    categories: [
      "Jul 10",
      "Jul 11",
      "Jul 12",
      "Jul 13",
      "Jul 14",
      "Jul 15",
      "Jul 16",
      "Jul 17",
    ],
  },
  yaxis: {
    show: true,
    min: 0,
    labels: {
      style: {
        colors: "#A7A7A7",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
  },
  fill: {
    type: "solid",
  },
};
