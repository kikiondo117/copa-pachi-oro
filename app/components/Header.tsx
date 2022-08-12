import * as React from "react";
import type { UserInterface } from "../types/user";
// * Components
import { LoginForm } from "./LoginForm";
import Logo from "~/../public/assets/logo-pachi-retas.svg";

interface HeaderProps {
  user?: UserInterface;
}

export function Header({ user }: HeaderProps) {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <header className="fixed w-full flex items-center bg-special-blue h-14 text-white z-20">
      <div className="w-laptop flex justify-between mx-auto">
        <div className=" h-9 w-auto">
          <img src={Logo} className="h-full w-auto" alt="Copa Pachichi Oro" />

          {/* <a className="" href="/">
          </a> */}
        </div>

        <ul className="flex items-center font-big-noodle-oblique text-base ">
          <li className="mx-4">
            <a href="#acerca">ACERCA DE</a>
          </li>
          <li className="mx-4">
            <a href="#equipos">EQUIPOS</a>
          </li>
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
