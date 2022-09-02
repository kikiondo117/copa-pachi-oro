import * as React from "react";
import type { UserInterface } from "~/types/types.user";
// * Components
import classNames from "classnames";
import { LoginForm } from "~/components";
import Logo from "~/../public/assets/logo-pachi-retas.svg";

interface HeaderProps {
  user?: UserInterface;
}

export function Header({ user }: HeaderProps) {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <header className="fixed z-20 flex h-14 w-full items-center bg-special-blue text-white">
      <div className="mx-auto flex w-laptop justify-between">
        <a href="/" className=" h-9 w-auto">
          <img src={Logo} className="h-full w-auto" alt="Copa Pachichi Oro" />
        </a>

        <ul className="flex items-center font-big-noodle-oblique text-base ">
          {user?.admin && (
            <>
              <li className="mx-4">
                <a href="/admin/torneo">TORNEOS</a>
              </li>
              <li className="mx-4">
                <a href="/admin">EQUIPOS</a>
              </li>
            </>
          )}

          {user && !user.admin ? (
            <>
              <li className="mx-4">
                <a href="/team">Equipo</a>
              </li>
              <li className="mx-4">
                <a href="/teams">EQUIPOS</a>
              </li>
            </>
          ) : null}

          {!user && (
            <>
              <li className="mx-4">
                <a href="#acerca">ACERCA DE</a>
              </li>
              <li className="mx-4">
                <a href="#equipos">EQUIPOS</a>
              </li>
            </>
          )}

          <li>
            <button
              className={classNames("mx-4 h-[34px] rounded-[4px] px-4", {
                " bg-special-blue-light ": user,
                "bg-organge-light": user?.admin || !user,
              })}
              onClick={() => {
                return user ? null : setShowLogin((prevState) => !prevState);
              }}
            >
              {user ? user.email : " INICIAR SESIÓN"}
            </button>

            {showLogin && (
              <div className="absolute right-7 mt-5 w-96 rounded-lg bg-special-gray p-4 ">
                <LoginForm />
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
