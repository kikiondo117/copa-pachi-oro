import * as React from "react";
import { Form } from "@remix-run/react";

import { FormField } from "./Form-field";
import { Button } from "./ui/Button";

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
    <Form
      method="post"
      className="flex flex-col justify-between bg-special-gray px-4 w-full font-coolveltica h-[32rem]"
    >
      <input type="hidden" name="action" value={"register"} />
      <div>
        <p className="mt-6 text-xs">Crea tu cuenta</p>
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
          htmlFor="confirm_password"
          type="password"
          label="confirm password"
          value={form.confirm_password}
          onChange={(e) => handleInputChange(e, "confirm_password")}
          withLabel={false}
          placeholder="Repetir Contraseña"
          required
        />
        <p className="mt-2 text-xs">Datos del equipo</p>
        <FormField
          htmlFor="team"
          label="Nombre del equipo"
          value={form.team}
          onChange={(e) => handleInputChange(e, "team")}
          withLabel={false}
          placeholder="Nombre del equipo"
          required
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
            <option value="NA">Región: NA</option>
            <option value="SA">Región: SA</option>
            <option value="EU">Región: EU</option>
          </select>
          <select
            className="w-full ml-1 mt-1 pl-4 rounded font-big-noodle-oblique"
            name="plataforma"
            id="plataforma"
          >
            <option value="" disabled selected hidden>
              Plataforma
            </option>
            <option value="PC">PC</option>
            <option value="XBOX">Xbox</option>
            <option value="PLAYSTIATION">Plataforma: PlayStation</option>
            <option value="SWITCH">Plataforma: Switch</option>
            <option value="MIXTO">mixto</option>
          </select>
        </div>

        {/* <input className="mt-4" type="media" /> */}
      </div>

      <Button.Primary className=" mb-4">Registrar equipo</Button.Primary>
    </Form>
  );
}
