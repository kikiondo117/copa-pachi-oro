import * as React from "react";
import { Form } from "@remix-run/react";

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
          htmlFor="confirm_password"
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
        <div className="flex justify-between">
          <select className="w-full" name="region" id="region">
            <option value="NA">NA</option>
            <option value="SA">SA</option>
            <option value="EU">EU</option>
          </select>
          <select className="w-full" name="plataforma" id="plataforma">
            <option value="PC">PC</option>
            <option value="XBOX">Xbox</option>
            <option value="PLAYSTIATION">Play Station</option>
            <option value="SWITCH">Switch</option>
            <option value="MIXTO">mixto</option>
          </select>
        </div>

        <div className=" mt-2 h-[6.25rem] w-[6.25rem]">
          <img src="/assets/img/imageInput.svg" alt="" />
        </div>
        {/* <input className="mt-4" type="media" /> */}
      </div>

      <Button.Primary>Registrar equipo</Button.Primary>
    </Form>
  );
}
