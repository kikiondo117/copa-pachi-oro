import * as React from "react";
import type { UserInterface } from "../types/user";

import { Button } from "./ui/Button";

interface TeamSentProps {
  user?: UserInterface;
}

export function TeamSent(props: TeamSentProps) {
  return (
    <div className="flex flex-col justify-between bg-special-gray px-4 w-full font-coolveltica h-[39rem]">
      <div className="my-auto">
        <img src="/assets/img/pachi.svg" alt="Pachi" className="mx-auto" />
        <p className="text-center text-special-blue-light text-2xl">
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
