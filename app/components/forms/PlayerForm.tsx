import type { TeamMemberInterface, TeamInterface } from "~/types/types.user";
import * as React from "react";
import { Form, useTransition } from "@remix-run/react";
// * Components
import Toggle from "react-toggle";
import { Button } from "~/components";

type AddPlayerProps = {
  isSub: boolean;
  playerSelected?: TeamMemberInterface | null;
  showCapitan: boolean;
  team?: TeamInterface;
};

export function PlayerForm(props: AddPlayerProps) {
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
      <h2 className="font-coolveltica text-[1.3rem] text-blue-gray-default">
        Registrar Jugador
      </h2>
      <Form className="flex flex-col" method="post">
        <div className=" mt-2 h-[6.25rem] w-[6.25rem]">
          <img src="/assets/img/imageInput.svg" alt="" />
        </div>
        <input type="hidden" name="team" value={props.team} />

        {props.playerSelected ? (
          <>
            <input
              type="hidden"
              name="action"
              value={`${props.isSub ? "updateSub" : "updatePlayer"}`}
            />
            <input
              type="hidden"
              name="user_id"
              value={props.playerSelected.id}
            />
          </>
        ) : (
          <input
            type="hidden"
            name="action"
            value={`${props.isSub ? "addSub" : "addPlayer"}`}
          />
        )}

        <input
          className="my-2 w-full rounded p-2 pl-4 font-big-noodle-oblique text-base text-black"
          name="name"
          type="text"
          placeholder="Nombre"
          value={dataForm.name}
          onChange={(e) => inputChange(e)}
        />
        <input
          className="my-2 w-full rounded p-2 pl-4 font-big-noodle-oblique text-base text-black"
          name="rango"
          type="number"
          placeholder="Rango en SR (Ej: 3100)"
          value={dataForm.rango}
          onChange={(e) => inputChange(e)}
        />

        <select
          title="Rol"
          className=" my-2 h-10 w-full rounded px-4 font-big-noodle-oblique"
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

        {props.showCapitan && (
          <>
            <div className="mt-2 flex flex-row">
              <span className="text-md font-coolveltica text-blue-gray-default">
                Marcar jugador como capitán
              </span>

              <Toggle
                name="capitan"
                className="custom-classname ml-4"
                icons={false}
                onChange={() =>
                  setDataForm((prevState) => ({
                    ...prevState,
                    capitan: !prevState.capitan,
                  }))
                }
              />
            </div>
            <p className="font-coolveltica text-xs tracking-wider text-gray-two">
              Solo puede haber un capitán por equipo, seleccionar este campo
              cambiará de capitán si ya tienes uno.
            </p>
          </>
        )}

        {isCreating ? (
          <div className=" font-big-noodle-oblique">Loading...</div>
        ) : (
          <Button.Primary className=" mt-16 w-[1] px-[45.5px]">
            GUARDAR JUGADOR
          </Button.Primary>
        )}
      </Form>
    </div>
  );
}
