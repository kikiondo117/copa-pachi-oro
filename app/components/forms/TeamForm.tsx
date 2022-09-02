import * as React from "react";
import { Form, useTransition } from "@remix-run/react";

import { FormField, FormSelect, Button } from "~/components";
import { platforms, regions } from "~/constants/selectOptions";

export function TeamForm() {
  const [form, setFormData] = React.useState({
    email: "",
    password: "",
    confirm_password: "",
    team: "",
    region: "",
    genero: "",
    platform: "",
  });
  const transition = useTransition();

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
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
        <p className="mt-6 text-xs text-blue-gray-default">Crea tu cuenta</p>
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
        <p className="mt-2 text-xs text-blue-gray-default">Datos del equipo</p>
        <FormField
          htmlFor="team"
          value={form.team}
          onChange={(e) => handleInputChange(e, "team")}
          placeholder="Nombre del equipo"
        />
        <div className="flex justify-between">
          <FormSelect
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange(e, "region")
            }
            value={form.region}
            title="region"
            name="region"
            className=" h-9"
            defaultLabel="Región"
            options={regions}
            name="region"
          />

          <FormSelect
            className=" ml-2"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange(e, "platform")
            }
            value={form.platform}
            title="plataforma"
            name="plataforma"
            defaultLabel="Plataforma"
            options={platforms}
            name="plataforma"
          />
        </div>

        <div className=" mt-2 h-[6.25rem] w-[6.25rem]">
          <img src="/assets/img/imageInput.svg" alt="" />
        </div>
      </div>
      <div className=" flex w-full items-center justify-center">
        <Button.Primary
          className="mb-4 px-4"
          {...(transition.submission
            ? { disabled: true }
            : { disabled: false })}
        >
          {transition.submission ? "Guardando" : "Registrar equipo"}
        </Button.Primary>
      </div>
    </Form>
  );
}
