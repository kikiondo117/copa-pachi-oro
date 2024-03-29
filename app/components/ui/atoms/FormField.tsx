import React from "react";

// app/components/form-field.tsx
interface FormFieldProps {
  htmlFor: string;
  type?: string;
  value: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export function FormField({
  htmlFor,
  type = "text",
  value,
  onChange = () => {},
  placeholder = "",
  className,
}: FormFieldProps) {
  return (
    <>
      <input
        onChange={onChange}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className={` w-full rounded p-2 font-big-noodle-oblique text-base text-blue-gray-default ${
          className ? className : ""
        }`}
        value={value}
        placeholder={placeholder}
        required
      />
    </>
  );
}
