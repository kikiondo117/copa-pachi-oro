import * as React from "react";
import { Form, useTransition } from "@remix-run/react";

import { FormField, Button } from "~/components";

export function TeamForm() {
  const [form, setFormData] = React.useState({
    email: "",
    password: "",
    confirm_password: "",
    team: "",
    region: "",
    genero: "",
  });
  const transition = useTransition();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  return (
    <Form
      method="post"
      className="flex h-[32rem] w-full flex-col justify-between bg-special-gray px-4 font-coolveltica"
    >
      <input type="hidden" name="action" value={"register"} />
      <div>
        <p className="mt-6 text-xs">Crea tu cuenta</p>
        <FormField
          htmlFor="email"
          type="email"
          value={form.email}
          onChange={(e) => handleInputChange(e, "email")}
          placeholder="Correo Electrónico"
        />
        <FormField
          htmlFor="password"
          type="password"
          value={form.password}
          onChange={(e) => handleInputChange(e, "password")}
          placeholder="Contraseña"
        />
        <FormField
          value={form.confirm_password}
          htmlFor="confirm_password"
          type="password"
          onChange={(e) => handleInputChange(e, "confirm_password")}
          placeholder="Repetir Contraseña"
        />
        <p className="mt-2 text-xs">Datos del equipo</p>
        <FormField
          htmlFor="team"
          value={form.team}
          onChange={(e) => handleInputChange(e, "team")}
          placeholder="Nombre del equipo"
        />
        <div className="flex justify-between">
          <select
            className=" w-full h-9 mr-1 mt-1 pl-4 rounded font-big-noodle-oblique "
            name="region"
            id="region"
          >
            <option value="" disabled selected hidden>
              Región
            </option>
            <option value="NA">NA</option>
            <option value="SA">SA</option>
            <option value="EU">EU</option>
          </select>
          <select
            className="ml-1 mt-1 w-full rounded pl-4 font-big-noodle-oblique"
            name="plataforma"
            id="plataforma"
          >
            <option value="" disabled selected hidden>
              Plataforma
            </option>
            <option value="PC">PC</option>
            <option value="XBOX">Xbox</option>
            <option value="PLAYSTIATION">PlayStation</option>
            <option value="SWITCH">Switch</option>
            <option value="MIXTO">mixto</option>
          </select>
        </div>

        <div className=" mt-2 h-[6.25rem] w-[6.25rem]">
          <img src="/assets/img/imageInput.svg" alt="" />
        </div>
      </div>

      <Button.Primary
        className="mb-4"
        {...(transition.submission ? { disabled: true } : { disabled: false })}
      >
        {transition.submission ? "Guardando" : "Registrar equipo"}
      </Button.Primary>
    </Form>
  );
}
