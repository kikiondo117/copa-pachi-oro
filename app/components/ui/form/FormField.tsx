// app/components/form-field.tsx
interface FormFieldProps {
  htmlFor: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
  placeholder?: string;
}

export function FormField({
  htmlFor,
  type = "text",
  value,
  onChange = () => {},
  placeholder = "",
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
        className="w-full p-2 pl-4 rounded my-2 text-black text-base font-big-noodle-oblique"
        value={value}
        placeholder={placeholder}
        required
      />
    </>
  );
}
