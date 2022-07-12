export function Header() {
  return (
    <header className="fixed w-screen bg-special-blue text-white">
      <div className="container flex justify-between mx-auto">
        <span className="text-4xl my-2 text-special-orange ">
          <span>IMG/</span>COPA PACHI ORO
        </span>

        <ul className="flex items-center">
          <li className="mx-4">ACERCA DE</li>
          <li className="mx-4">EQUIPOS</li>
          <li className="mx-4">INICIAR SESIÓN</li>
        </ul>
      </div>
    </header>
  );
}
