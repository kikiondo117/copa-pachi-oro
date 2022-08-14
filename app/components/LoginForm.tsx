import * as React from "react";
import { Form, useActionData } from "@remix-run/react";
// * Components
import { FormField } from "~/components";

// export const action: ActionFunction = async ({ request }) => {
//   const form = await request.formData();
//   const email = form.get("email");
//   const password = form.get("password");

//   if (typeof email !== "string" || typeof password !== "string") {
//     return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
//   }

//   const errors = {
//     email: validateEmail(email),
//     password: validatePassword(password),
//   };

//   if (Object.values(errors).some(Boolean)) {
//     return json({ errors, fields: { email, password } }, { status: 400 });
//   }

//   return await login({ email, password });
// };

export function LoginForm() {
  const actionData = useActionData();
  console.log("*****actionData", actionData);

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
    <Form method="post">
      <input type="hidden" name="action" value={"login"} />
      <FormField
        htmlFor="email"
        value={form.email}
        label="Correo electronico"
        onChange={(e) => handleInputChange(e, "email")}
        required
      />
      <FormField
        htmlFor="password"
        value={form.password}
        label="Contraseña"
        type="password"
        onChange={(e) => handleInputChange(e, "password")}
        required
      />
      <button
        type="submit"
        className="self-center mt-4 w-fit bg-special-orange p-2 text-base rounded"
      >
        Iniciar Sesión
      </button>
    </Form>
  );
}
