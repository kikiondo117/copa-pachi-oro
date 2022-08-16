import * as React from "react";

import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { TeamMemberInterface } from "../types/types.user";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// * Components
import {
  Header,
  TeamForm,
  Footer,
  Container,
  TeamSent,
  Modal,
  CardTournament,
} from "~/components";
// * Utils
import TwitchLogoJuanYut from "~/../public/assets/juanyut-logo-nombre.svg";
import MainMessage from "~/../public/assets/main-landing-message.svg";
import { validateEmail, validatePassword } from "../utils/validators.server";
import { validateName } from "../utils/validators.server";
import { login, getUser, register } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (user && user.admin) {
    return redirect("/admin");
  }

  if (user) {
    return redirect("/team");
  }

  return json({ user });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  let confirm_password = form.get("confirm_password");
  let team = form.get("team");
  let region = form.get("region");
  let plataforma = form.get("plataforma");
  let isApproved = false;
  let subs: TeamMemberInterface[] = [];
  let members: TeamMemberInterface[] = [];
  const action = form.get("action");

  if (typeof email !== "string" || typeof password !== "string") {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  if (
    action === "register" &&
    (typeof team !== "string" ||
      typeof confirm_password !== "string" ||
      typeof region !== "string" ||
      typeof plataforma !== "string")
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === "register"
      ? {
          confirm_password: validatePassword(
            (confirm_password as string) || ""
          ),
          team: validateName((team as string) || ""),
        }
      : {}),
  };

  if (Object.values(errors).some(Boolean)) {
    return json({ errors, fields: { email, password } }, { status: 400 });
  }

  switch (action) {
    case "login": {
      return await login({ email, password });
    }

    case "register": {
      confirm_password = confirm_password as string;
      team = team as string;
      region = region as string;
      plataforma = plataforma as string;
      return await register({
        email,
        password,
        confirm_password,
        team,
        region,
        plataforma,
        members,
        subs,
        isApproved,
      });
    }
  }
};

export default function Index() {
  const { user } = useLoaderData();
  const [showModal, setShowModal] = React.useState({ status: false, data: {} });

  console.log("*****loaderData", user);

  return (
    <div className="min-h-screen ">
      <Header user={user} />
      <div className="absolute z-10">
        <img src="/assets/img_graffiti_effect_1.svg" alt="" />
      </div>

      <main className="pt-14 bg-hero-tracer bg-cover bg-fixed bg-blue-gray-dark min-h-screen mx-auto flex items-center">
        <Container className="m-auto py-6">
          <div className="col-start-1 col-end-7 h-full">
            <div className="flex flex-col h-full justify-between items-start">
              <img
                src={MainMessage}
                alt=""
                className="my-auto mx-0 h-[13.5rem]"
              />
              <div>
                <a
                  href="https://www.twitch.tv/juanyut"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img
                    src={TwitchLogoJuanYut}
                    className=" h-10 w-[13.313rem] mb-2 hover:animate-bounce"
                    alt=""
                  />
                </a>
                <p className=" text-white font-coolveltica text-xs">
                  Mi pequeño aporte con mucho cariño y esfuerzo a la comunidad
                  de Overwatch MX, JuanYut.
                </p>
              </div>
            </div>
          </div>
          <div className="col-start-9 col-end-13 w-full">
            <div className="bg-form-top bg-cover h-24 w-auto" />
            {/* TODO Observation flow required */}
            {user ? <TeamSent /> : <TeamForm />}
          </div>
        </Container>
      </main>

      <div className="absolute right-0 top-2/3">
        <img src="/assets/img/graffiti2.svg" alt="" />
      </div>

      <section
        id="acerca"
        className=" h-[30rem] mx-auto bg-special-blue bg-pachi-retas-sm bg-cover bg-center  flex items-center"
      >
        <Container className="mx-auto">
          <div className="col-start-1 col-end-7 my-auto">
            <h4 className="font-coolveltica text-white text-2xl mb-4">
              Acerca de
            </h4>
            <div className=" h-72">
              <iframe
                height="100%"
                width="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="col-start-8 col-end-13 flex flex-col justify-center">
            <h4 className="text-special-orange font-coolveltica text-[1.625rem]">
              ✌ ¿Qué es?
            </h4>
            <p className=" w-full font-coolveltica font-normal text-white text-md tracking-wider leading-5">
              Es un torneo rápido, el cual reúne a jugadores apasionados de
              Overwatch. La finalidad de{" "}
              <span className="text-special-orange">Pachi Retas</span> es
              incentivar el juego competitivo, motivar a que los jugadores sean
              mejores, aportar un granito de arena a la comunidad de OWMX,
              generar entretenimiento, diversión, y conocer nuevos héroes de la
              comunidad.
            </p>
          </div>
        </Container>
      </section>

      <section
        id="equipos"
        className="h-screen bg-teams-bg bg-cover mx-auto  flex flex-col items-center justify-center relative"
      >
        <div className="w-full flex-row items-start mb-4 ">
          <h3 className=" pl-[4.5rem] font-coolveltica text-2xl leading-7 tracking-wider">
            Equipos
          </h3>
        </div>
        <Container className="max-h-[27.5rem] overflow-auto ">
          <CardTournament></CardTournament>

          {showModal.status && (
            <Modal
              onClose={() =>
                setShowModal((prevState) => ({ ...prevState, status: false }))
              }
            >
              Hola
            </Modal>
          )}
          {/* AÑADIR CLASSNAME - ELIMINAR COL-SPAN-4 */}
          {/* {array.map((team) => (
            <CardTeam
              onClick={() => setShowModal(() => ({ status: true, data: team }))}
              className="col-span-4"
            ></CardTeam>
          ))} */}
        </Container>
      </section>

      <Footer />
    </div>
  );
}
