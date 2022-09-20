import * as React from "react";
// * Types
import { getUser } from "~/utils/auth.server";
// * Components
import classNames from "classnames";
import { LoginForm } from "~/components";
import Logo from "~/../public/assets/logo-pachi-retas.svg";
import { Link } from "@remix-run/react";

interface HeaderProps {
  user?: Awaited<ReturnType<typeof getUser>>;
}

export function Header({ user }: HeaderProps) {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <header className="fixed z-20 flex h-14 w-full items-center bg-special-blue text-white">
      <div className="mx-auto flex w-laptop justify-between">
        <a href="/" className=" h-9 w-auto">
          <img src={Logo} className="h-full w-auto" alt="Copa Pachichi Oro" />
        </a>

        <ul className="flex gap-x-8 items-center font-big-noodle-oblique text-base ">
          {user?.admin && (
            <>
              <li className="">
                <Link to="/admin/torneo">TORNEOS</Link>
              </li>
              <li className="">
                <Link to="/admin">EQUIPOS</Link>
              </li>
            </>
          )}

          {user && !user.admin ? (
            <>
              <li className="">
                <Link to="/team">EQUIPO</Link>
              </li>
              <li className="">
                <Link to="/teams">EQUIPOS</Link>
              </li>
            </>
          ) : null}

          {!user && (
            <>
              <li>
                <a href="#acerca">ACERCA DE</a>
              </li>
              <li>
                <a href="#equipos">EQUIPOS</a>
              </li>
            </>
          )}

          <li>
            <button
              className={classNames(" h-[34px] rounded-[4px] px-4", {
                " bg-special-blue-light ": user,
                "bg-green-admin": user?.admin || !user,
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
