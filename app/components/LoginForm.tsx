import * as React from "react";
import { Form } from "@remix-run/react";
import { FormField } from "./Form-field";

export function LoginForm() {
  const [form, setForm] = React.useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setForm((form) => ({ ...form, [field]: event.target.value }));
  };

  return (
    <Form className="mx-4 flex flex-col">
      <FormField
        htmlFor="correo electronico"
        value={form.email}
        label="Correo electronico"
        onChange={(e) => handleInputChange(e, "email")}
        required
      />
      <FormField
        htmlFor="contraseña"
        value={form.password}
        label="Contraseña"
        type="password"
        onChange={(e) => handleInputChange(e, "password")}
        required
      />
      <button className="self-center mt-4 w-fit bg-special-orange p-2 text-base rounded">
        Iniciar Sesión
      </button>
    </Form>
  );
}
