import * as React from "react";

import { Button } from "./ui/Button";

export function TeamSended() {
  return (
    <div className="flex flex-col justify-between bg-special-gray px-4 w-full font-coolveltica h-[39rem]">
      <div className="my-auto">
        <img src="" alt="Pachi" />
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
