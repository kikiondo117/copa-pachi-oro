import * as React from "react";
import type { User } from "../types/types.user";

import { Button } from "./ui/Button";

interface TeamSentProps {
  user?: User;
}

export function TeamSent(props: TeamSentProps) {
  return (
    <div className="flex h-[39rem] w-full flex-col justify-between bg-special-gray px-4 font-coolveltica">
      <div className="my-auto">
        <img src="/assets/img/pachi.svg" alt="Pachi" className="mx-auto" />
        <p className="text-center text-2xl text-special-blue-light">
          ¡Registro exitoso!
        </p>
        <p>
          Se ha creado correctamente la cuenta y el equipo. El siguiente paso es
          iniciar sesión y llenar la información faltante de tu equipo.
        </p>
      </div>
      <Button className=" mb-8">Iniciar Sesión</Button>
    </div>
  );
}
