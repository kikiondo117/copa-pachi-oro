import * as React from "react";
import { LoginForm } from "./LoginForm";
import Logo from "~/../public/assets/Pachimari_Gold_Logo.svg";

interface HeaderProps {
  user?: {
    email: string;
    id: string;
    profile: { firstName: string; lastName: string };
  };
}

export function Header({ user }: HeaderProps) {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <header className="fixed w-full flex items-center bg-special-blue h-14 text-white z-20">
      <div className="w-laptop flex justify-between mx-auto">
        <a className="flex justify-start" href="/">
          <img src={Logo} className="mr-4" width="32px" alt="" />
          {/* <img src={PachiRetas} alt="" /> */}
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
