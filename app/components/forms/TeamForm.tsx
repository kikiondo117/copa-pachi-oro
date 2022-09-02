import * as React from "react";
import { Form, useTransition } from "@remix-run/react";

import { FormField, FormSelect, Button, IOption } from "~/components";

const regions: IOption[] = [
  { value: "na", label: "NA" },
  { value: "sa", label: "SA" },
  { value: "eu", label: "EU" },
];

const platforms: IOption[] = [
  { value: "pc", label: "PC" },
  { value: "xbox", label: "XBOX" },
  { value: "playstation", label: "PLAYSTATION" },
  { value: "switch", label: "SWITCH" },
  { value: "mixto", label: "MIXTO" },
];

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
          />

          <FormSelect
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange(e, "platform")
            }
            value={form.platform}
            title="plataforma"
            name="plataforma"
            defaultLabel="Plataforma"
            options={platforms}
          />
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
