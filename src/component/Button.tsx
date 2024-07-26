type Props = {
  isLoading: boolean;
  disabled?: boolean;
  label?: string;
  type?: "button" | "submit" | "reset";
};

export function Button({ isLoading, disabled, type, label }: Props) {
  return (
    <button disabled={disabled || isLoading} type={type} className="">
      {label}
    </button>
  );
}
