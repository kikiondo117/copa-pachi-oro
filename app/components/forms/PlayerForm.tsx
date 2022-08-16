import type { TeamMemberInterface } from "~/types/types.user";
import * as React from "react";
import { Form, useTransition } from "@remix-run/react";
import { Button } from "~/components";

type AddPlayerProps = {
  isSub: boolean;
  playerSelected?: TeamMemberInterface | null;
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
    <div>
      <h2>Registrar Jugador</h2>
      <Form className="flex flex-col" method="post">
        <input
          type="hidden"
          name="action"
          value={`${props.isSub ? "addSub" : "addPlayer"}`}
        />
        <input type="media" />
        <input
          name="name"
          type="text"
          placeholder="Nombre"
          value={dataForm.name}
          onChange={(e) => inputChange(e)}
        />
        <input
          name="rango"
          type="text"
          placeholder="Rango en SR (Ej: 3100)"
          value={dataForm.rango}
          onChange={(e) => inputChange(e)}
        />
        <input
          name="rol"
          type="text"
          value={dataForm.rol}
          onChange={(e) => inputChange(e)}
        />
        <span>Marcar jugador como capitán</span>
        <input
          name="capitan"
          type="checkbox"
          checked={dataForm.capitan}
          onChange={(e) => inputChange(e)}
        />
        <p>
          Solo puede haber un capitán por equipo, seleccionar este campo
          cambiará de capitán si ya tienes uno.
        </p>

        {isCreating ? (
          <div>Loading...</div>
        ) : (
          <Button.Primary
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
