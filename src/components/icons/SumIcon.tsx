import { FC } from "react";

const SumIcon: FC<{
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
        d="M18 16V18C18 18.2652 17.8946 18.5196 17.7071 18.7071C17.5196 18.8946 17.2652 19 17 19H6L12 12L6 5H17C17.2652 5 17.5196 5.10536 17.7071 5.29289C17.8946 5.48043 18 5.73478 18 6V8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SumIcon;
