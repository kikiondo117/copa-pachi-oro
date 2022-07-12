export function TeamForm() {
  return (
    <form className="flex flex-col bg-special-gray px-4 ">
      <p className=" mt-6">Crea tu cuenta</p>
      <input className="mt-2" type="email" />
      <input className="mt-4" type="password" />
      <input className="mt-4" type="password" />
      <p className="mt-2">Datos del equipo</p>
      <input className="mt-4" type="text" />
      <div className="flex justify-between mt-4">
        <select className="w-full" name="region" id="region"></select>
        <select className="w-full" name="plataforma" id="plataforma"></select>
      </div>
      <input className="mt-4" type="img" />
      <button className=" my-9">Registrar equipo</button>
    </form>
  );
}
