import { ApexOptions } from "apexcharts";

export function createLineChartConfig(
  data: number[],
  categories: string[],
  params: { name: string },
): {
  series: ApexAxisChartSeries;
  options: ApexOptions;
} {
  const series: ApexAxisChartSeries = [
    {
      name: params.name,
      data: data,
      color: "#07BA9A",
    },
  ];

  const options: ApexOptions = {
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
      categories: categories,
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

  return { series, options };
}
