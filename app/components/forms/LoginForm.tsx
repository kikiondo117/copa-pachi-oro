import * as React from "react";
import { Form, useTransition } from "@remix-run/react";
// * Components
import { FormField } from "~/components";

export function LoginForm() {
  const transition = useTransition();

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
    <Form className=" flex flex-col justify-center" method="post">
      <img
        src="/assets/ArrowLogin.svg"
        className=" absolute -top-3 right-20"
        alt=""
      />
      <input type="hidden" name="action" value={"login"} />
      <FormField
        htmlFor="email"
        value={form.email}
        onChange={(e) => handleInputChange(e, "email")}
        placeholder="Correo electrónico"
      />
      <FormField
        htmlFor="password"
        value={form.password}
        type="password"
        onChange={(e) => handleInputChange(e, "password")}
        placeholder="Constraseña"
      />
      {/* <img src="/assets/" className="absolute mr-2 w-10" alt="Search Icon" /> */}
      <button
        type="submit"
        className={`
          mt-4 w-fit self-center rounded bg-special-orange p-2 text-base
          ${transition.submission ? "bg-grey-500" : ""} 
          `}
        {...(transition.submission ? { disabled: true } : { disabled: false })}
      >
        Iniciar Sesión
      </button>
    </Form>
  );
}
