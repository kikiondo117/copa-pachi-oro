import * as React from "react";
import { LoginForm } from "./LoginForm";
import Logo from "~/../public/assets/Pachimari_Gold_Logo.svg";
import PachiRetas from "~/../public/assets/pachi-retas.png";
import { Container } from "./ui/Container";

export function Header() {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <header className="fixed w-laptop-full flex items-center bg-special-blue h-14 text-white">
      <div className="w-laptop flex justify-between mx-auto">
        <a className="flex justify-start" href="/">
          <img src={Logo} className="mr-4" width="32px" alt="" />
          <img src={PachiRetas} alt="" />
        </a>

        <ul className="flex items-center font-big-noodle-oblique text-2xl">
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
