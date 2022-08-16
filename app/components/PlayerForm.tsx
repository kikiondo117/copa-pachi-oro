import type { TeamMemberInterface } from "../types/types.user";
import * as React from "react";
import { Form, useTransition } from "@remix-run/react";
import { Button } from "./ui/Button";
import { Switch } from "./ui/Switch";

type AddPlayerProps = {
  isSub: boolean;
  playerSelected?: TeamMemberInterface | null;
};

export function AddPlayer(props: AddPlayerProps) {
  const transition = useTransition();
  const isCreating = Boolean(transition.submission);
  const [dataForm, setDataForm] = React.useState(() => {
    if (props.playerSelected) {
      return {
        name: props.playerSelected.name,
        rango: props.playerSelected.rango,
        rol: props.playerSelected.rango,
        capitan: props.playerSelected.capitan,
      };
    }

    return {
      name: "",
      rango: "",
      rol: "",
      capitan: false,
    };
  });

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataForm((data) => ({
      ...data,
      ...(e.target.type === "checkbox"
        ? { [e.target.name]: e.target.checked }
        : { [e.target.name]: e.target.value }),
    }));
  };

  return (
    <div className=" my-6">
      <h2 className="text-blue-gray-default text-[1.3rem] font-coolveltica">
        Registrar Jugador
      </h2>
      <Form className="flex flex-col" method="post">
        <div className=" mt-2 h-[6.25rem] w-[6.25rem]">
          <img src="/assets/img/imageInput.svg" alt="" />
        </div>
        <input
          type="hidden"
          name="action"
          value={`${props.isSub ? "addSub" : "addPlayer"}`}
        />
        {/* <input type="media" /> */}
        <input
          className="w-full p-2 pl-4 rounded my-2 text-black text-base font-big-noodle-oblique"
          name="name"
          type="text"
          placeholder="Nombre"
          value={dataForm.name}
          onChange={(e) => inputChange(e)}
        />
        <input
          className="w-full p-2 pl-4 rounded my-2 text-black text-base font-big-noodle-oblique"
          name="rango"
          type="text"
          placeholder="Rango en SR (Ej: 3100)"
          value={dataForm.rango}
          onChange={(e) => inputChange(e)}
        />
        {/* <input
          className="w-full p-2 pl-4 rounded my-2 text-black text-base font-big-noodle-oblique"
          name="rol"
          type="text"
          placeholder="rol"
          value={dataForm.rol}
          onChange={(e) => inputChange(e)}
        /> */}
        <select
          className=" w-full h-10 my-2 px-4 rounded font-big-noodle-oblique"
          name="rol"
          id="rol"
        >
          <option value="" disabled selected hidden>
            Rol
          </option>
          <option value="Tank">Tanque</option>
          <option value="Damage">Daño</option>
          <option value="Support">Soporte</option>
        </select>
        <div className="flex flex-row">
          <span className="font-coolveltica text-md text-blue-gray-default">
            Marcar jugador como capitán
            {/* <Switch></Switch> */}
          </span>
          {/* <input
            name="capitan"
            type="checkbox"
            checked={dataForm.capitan}
            onChange={(e) => inputChange(e)}
          /> */}
        </div>
        <p className="font-coolveltica text-xs text-gray-two tracking-wider">
          Solo puede haber un capitán por equipo, seleccionar este campo
          cambiará de capitán si ya tienes uno.
        </p>

        {isCreating ? (
          <div>Loading...</div>
        ) : (
          <Button.Primary
            className=" w-[1] mt-16 "
            {...(props.playerSelected
              ? { disabled: true }
              : { disabled: false })}
          >
            GUARDAR JUGADOR
          </Button.Primary>
        )}
      </Form>
    </div>
  );
}
