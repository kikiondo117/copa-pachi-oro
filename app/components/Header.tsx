import * as React from "react";
import type { UserInterface } from "../types/user";

import { LoginForm } from "./LoginForm";
import Logo from "~/../public/assets/Pachimari_Gold_Logo.svg";

interface HeaderProps {
  user?: UserInterface;
}

export function Header({ user }: HeaderProps) {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <header className="fixed w-full flex items-center bg-special-blue h-14 text-white">
      <div className="w-laptop flex justify-between mx-auto">
        <a className="flex justify-start" href="/">
          <img src={Logo} className="mr-4" width="32px" alt="" />
          <span className="text-4xl my-2 text-special-orange font-big-noodle-oblique">
            COPA PACHI ORO
          </span>
        </a>

        <ul className="flex items-center font-big-noodle-oblique text-base ">
          <li className="mx-4">ACERCA DE</li>
          <li className="mx-4">EQUIPOS</li>
          <li>
            <button
              className={`mx-4 rounded-md  ${
                user ? "bg-special-blue-light" : "btn-orange-default"
              }`}
              onClick={() => {
                return user ? null : setShowLogin((prevState) => !prevState);
              }}
            >
              {user ? user.email : " INICIAR SESIÓN"}
            </button>
            {showLogin && (
              <div className="absolute rounded-lg bg-special-gray w-96 p-4 right-7 mt-5">
                <LoginForm />
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
