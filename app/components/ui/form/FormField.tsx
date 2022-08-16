// app/components/form-field.tsx
interface FormFieldProps {
  htmlFor: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
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
      {/* {withLabel ? (
        <label htmlFor={htmlFor} className="text-black text-base">
          {label}
        </label>
      ) : null} */}

      <input
        onChange={onChange}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className={`my-2 w-full rounded p-2 pl-4 font-big-noodle-oblique text-base text-black ${
          className ? className : ""
        }`}
        value={value}
        placeholder={placeholder}
        required
      />
    </>
  );
}
