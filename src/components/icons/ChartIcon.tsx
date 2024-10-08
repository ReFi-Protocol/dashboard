import { FC } from "react";

const ChartIcon: FC<{
  width?: number;
  height?: number;
  fill?: string;
}> = ({ width = 16, height = 20, fill = "white" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 18.5L2 17L9.5 9.5L13.5 13.5L20.6 5.5L22 6.9L13.5 16.5L9.5 12.5L3.5 18.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default ChartIcon;
