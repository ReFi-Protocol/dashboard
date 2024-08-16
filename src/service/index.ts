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
      mode: "dark",
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

export function fetchHistoricalPrice(): Promise<[number, number][]> {
  return fetchFromCoinGecko(
    "coins/refi-protocol/market_chart?vs_currency=usd&days=360&precision=7",
  ).then((data) => data.prices);
}
export function fetchPrice() {
  return fetchFromCoinGecko("coins/refi-protocol/tickers");
}

function fetchFromCoinGecko(path: string) {
  const baseApiUrl = "https://api.coingecko.com/api/v3";

  const url = `${baseApiUrl}/${path}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-DuiZWUEaAQfvPjcqDiHycdXq",
    },
  };

  return fetch(url, options).then((res) => res.json());
}
