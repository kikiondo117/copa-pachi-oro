import * as React from "react";
import { Form, useTransition, useActionData } from "@remix-run/react";
// * Types
import { ActionDataLogin } from "~/types/actions";
// * Components
import { FormField } from "~/components";

export function LoginForm() {
  const transition = useTransition();
  const errors = useActionData() as ActionDataLogin;

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
    <Form className=" flex flex-col justify-center gap-y-2" method="post">
      <img
        src="/assets/ArrowLogin.svg"
        className=" absolute -top-3 right-20"
        alt=""
      />
      <p className=" font-coolveltica text-blue-gray-default">Inicia sesión</p>
      <input type="hidden" name="action" value={"login"} />

      {errors?.email ? <em className="bg-red-500">Email is required</em> : null}
      <FormField
        htmlFor="email"
        value={form.email}
        onChange={(e) => handleInputChange(e, "email")}
        placeholder="Correo electrónico"
      />

      {errors?.password ? (
        <em className="bg-red-500">Password is required</em>
      ) : null}
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
          ${
            transition.submission?.formData.get("action") === "login"
              ? "bg-grey-500"
              : ""
          } 
          `}
        {...(transition.submission?.formData.get("action") === "login"
          ? { disabled: true }
          : { disabled: false })}
      >
        {transition.submission?.formData.get("action") === "login"
          ? "Iniciando Sesión"
          : "Iniciar Sesión"}
      </button>
    </Form>
  );
}
