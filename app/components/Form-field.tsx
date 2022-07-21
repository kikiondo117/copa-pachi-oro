// app/components/form-field.tsx
interface FormFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
  required: boolean;
}

export function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {},
  required,
}: FormFieldProps) {
  return (
    <>
      <label htmlFor={htmlFor} className="text-black text-base">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className="w-full p-2 rounded-sm my-2 text-black text-base"
        value={value}
        required
      />
    </>
  );
}
