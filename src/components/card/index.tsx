import React, { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: string;
  extra?: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ extra, children, ...rest }) => {
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-[20px] bg-[#061A11] bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
