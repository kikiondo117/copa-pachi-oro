import { Button } from "../atoms/Button";

export function TeamConfirmedRegister() {
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
