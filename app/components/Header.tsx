import Logo from "~/../public/assets/Pachimari_Gold_Logo.svg";

export function Header() {
  return (
    <header className="fixed w-screen flex items-center bg-special-blue h-20 text-white">
      <div className="container flex justify-between mx-auto">
        <div className="flex justify-start ">
          <img src={Logo} className="mr-4" width="32px" alt="" />
          <span className="text-4xl my-2 text-special-orange font-big-noodle-oblique">
            COPA PACHI ORO
          </span>
        </div>

        <ul className="flex items-center font-big-noodle-oblique text-3xl">
          <li className="mx-4">ACERCA DE</li>
          <li className="mx-4">EQUIPOS</li>
          <li className="mx-4 btn-orange-default">INICIAR SESIÓN</li>
        </ul>
      </div>
    </header>
  );
}
