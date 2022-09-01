import React from "react";

export interface IOption {
  label: string;
  value: string;
}

interface FormSelectProps extends React.HtmlHTMLAttributes<HTMLSelectElement> {
  defaultLabel?: string;
  options: IOption[];
  value: string;
}

export function FormSelect({
  defaultLabel = "",
  options,
  value,
  ...rest
}: FormSelectProps) {
  return (
    <select
      {...rest}
      value={value}
      className={`ml-1 mt-1 w-full rounded pl-4 font-big-noodle-oblique text-blue-gray-default ${rest.className}`}
    >
      <option value="" disabled className="text-blue-gray-default">
        {defaultLabel}
      </option>
      {options.map((option: IOption) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
