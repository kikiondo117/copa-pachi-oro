import * as React from "react";
import { Form, useTransition, useActionData } from "@remix-run/react";

import { FormField, FormSelect, Button } from "~/components";
import { platforms, regions } from "~/constants/selectOptions";

type ActionData =
  | {
      email: null | string;
      password: null | string;
      confirm_password: null | string;
      team: null | string;
      region: null | string;
      plataforma: null | string;
    }
  | undefined
  | null;

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
  const errors = useActionData() as ActionData;

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
      className=" flex min-h-[526px] w-full flex-col justify-between bg-special-gray px-6 pb-6 font-coolveltica"
    >
      <input type="hidden" name="action" value={"register"} />
      <div className="flex flex-col gap-y-2 ">
        <p className="mt-6 text-xs text-blue-gray-default">Crea tu cuenta</p>

        {errors?.email ? (
          <em className="bg-red-500">Email is required</em>
        ) : null}
        <FormField
          htmlFor="email"
          type="email"
          value={form.email}
          onChange={(e) => handleInputChange(e, "email")}
          placeholder="Correo Electrónico"
        />

        {errors?.password ? (
          <em className="bg-red-500">Password is required</em>
        ) : null}
        <FormField
          htmlFor="password"
          type="password"
          value={form.password}
          onChange={(e) => handleInputChange(e, "password")}
          placeholder="Contraseña"
        />

        {errors?.confirm_password ? (
          <em className="bg-red-500">Confirm password is required</em>
        ) : null}
        <FormField
          value={form.confirm_password}
          htmlFor="confirm_password"
          type="password"
          onChange={(e) => handleInputChange(e, "confirm_password")}
          placeholder="Repetir Contraseña"
        />

        <p className=" mt-2 text-xs text-blue-gray-default">Datos del equipo</p>
        {errors?.team ? <em className="bg-red-500">Team is required</em> : null}
        <FormField
          htmlFor="team"
          value={form.team}
          onChange={(e) => handleInputChange(e, "team")}
          placeholder="Nombre del equipo"
        />
        <div className="flex justify-between gap-2">
          {errors?.region ? (
            <em className="bg-red-500">Region is required</em>
          ) : null}
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

          {errors?.plataforma ? (
            <em className="bg-red-500">Plataforma is required</em>
          ) : null}
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

        <div className=" h-[6.25rem] w-[6.25rem]">
          <img src="/assets/img/imageInput.svg" alt="" />
        </div>
      </div>
      <div className=" flex w-full items-center justify-center">
        <Button.Primary
          className=" px-4 bg-special-blue-light"
          {...(transition.submission?.formData.get("action") === "register"
            ? { disabled: true }
            : { disabled: false })}
        >
          {transition.submission?.formData.get("action") === "register"
            ? "Guardando"
            : "Registrar equipo"}
        </Button.Primary>
      </div>
    </Form>
  );
}
