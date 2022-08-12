import { Form } from "@remix-run/react";
import { Button } from "./ui/Button";

export function AddPlayer({ isSub }: { isSub: boolean }) {
  return (
    <div>
      <h2>Registrar Jugador</h2>
      <Form className="flex flex-col" method="post">
        <input
          type="hidden"
          name="action"
          value={`${isSub ? "addSub" : "addPlayer"}`}
        />
        <input type="media" />
        <input name="name" type="text" placeholder="Nombre" />
        <input name="rango" type="text" placeholder="Rango en SR (Ej: 3100)" />
        <input name="rol" type="text" />
        <span>Marcar jugador como capitán</span>
        <input type="checkbox" />
        <p>
          Solo puede haber un capitán por equipo, seleccionar este campo
          cambiará de capitán si ya tienes uno.
        </p>
        <Button.Primary>GUARDAR JUGADOR </Button.Primary>
      </Form>
    </div>
  );
}
