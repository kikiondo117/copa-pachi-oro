// app/components/form-field.tsx
interface FormFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
  required?: boolean;
  withLabel?: boolean;
  placeholder?: string;
}

export function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {},
  required,
  withLabel = true,
  placeholder = "",
}: FormFieldProps) {
  return (
    <>
      {withLabel ? (
        <label htmlFor={htmlFor} className="text-black text-base">
          {label}
        </label>
      ) : null}

      <input
        onChange={onChange}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className="w-full p-2 rounded-sm my-2 text-black text-base font-big-noodle-oblique"
        value={value}
        placeholder={placeholder}
        required
      />
    </>
  );
}
