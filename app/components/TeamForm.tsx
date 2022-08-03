import type { ActionFunction } from "@remix-run/node";

import * as React from "react";
import { FormField } from "./Form-field";
import { Button } from "./ui/Button";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const confirm_password = form.get("confirm_password");
  let firstName = form.get("firstName");
  let lastName = form.get("lastName");
};

export function TeamForm() {
  const [form, setFormData] = React.useState({
    email: "",
    password: "",
    confirm_password: "",
    team: "",
    region: "",
    genero: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  return (
    <form
      method="POST"
      className="flex flex-col justify-between bg-special-gray px-4 w-full font-coolveltica h-[39rem]"
    >
      <div>
        <p className="mt-6">Crea tu cuenta</p>
        <FormField
          htmlFor="email"
          type="email"
          label="email"
          value={form.email}
          onChange={(e) => handleInputChange(e, "email")}
          withLabel={false}
          placeholder="Correo Electrónico"
          required
        />
        <FormField
          htmlFor="password"
          type="password"
          label="password"
          value={form.password}
          onChange={(e) => handleInputChange(e, "password")}
          withLabel={false}
          placeholder="Contraseña"
          required
        />
        <FormField
          htmlFor="confirm password"
          type="password"
          label="confirm password"
          value={form.confirm_password}
          onChange={(e) => handleInputChange(e, "confirm_password")}
          withLabel={false}
          placeholder="Repetir Contraseña"
          required
        />
        <p className="mt-2">Datos del equipo</p>
        <FormField
          htmlFor="team"
          label="Nombre del equipo"
          value={form.team}
          onChange={(e) => handleInputChange(e, "team")}
          withLabel={false}
          placeholder="Nombre del equipo"
          required
        />
      </div>
      {/* <div className="flex justify-between mt-4">
        <select className="w-full" name="region" id="region"></select>
        <select className="w-full" name="genero" id="genero"></select>
      </div> */}
      {/* <input className="mt-4" type="img" /> */}

      <Button.Primary>Registrar equipo</Button.Primary>
    </form>
  );
}
