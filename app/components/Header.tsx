import * as React from "react";
import Logo from "~/../public/assets/Pachimari_Gold_Logo.svg";
import { LoginForm } from "./LoginForm";

export function Header() {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <header className="fixed w-screen flex items-center bg-special-blue h-14 text-white">
      <div className="container flex justify-between mx-auto">
        <a className="flex justify-start" href="/">
          <img src={Logo} className="mr-4" width="32px" alt="" />
          <span className="text-4xl my-2 text-special-orange font-big-noodle-oblique">
            COPA PACHI ORO
          </span>
        </a>

        <ul className="flex items-center font-big-noodle-oblique text-3xl">
          <li className="mx-4">ACERCA DE</li>
          <li className="mx-4">EQUIPOS</li>
          <li>
            <button
              className="mx-4 btn-orange-default"
              onClick={() => {
                setShowLogin((prevState) => !prevState);
              }}
            >
              INICIAR SESIÓN
            </button>
            {showLogin && (
              <div className="absolute rounded-lg bg-special-gray w-96 p-4 left-2">
                <LoginForm />
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
