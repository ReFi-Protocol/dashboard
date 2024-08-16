import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

type Props = {
  label: string;
  className?: string;
  error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, className, error, ...props }: Props, ref) => {
    return (
      <div className={classNames(className)}>
        <label
          htmlFor={label}
          className="text-black block text-sm font-medium leading-6"
        >
          {label}
        </label>
        <div className="mt-2">
          <input
            ref={ref}
            {...props}
            id={label}
            autoComplete={label}
            className="ring-black block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
        {error && <p className="text-xs text-red-600">{error.message}</p>}
      </div>
    );
  },
);
