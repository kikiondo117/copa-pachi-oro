import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// * Components
import { Header } from "~/components/Header";
import { TeamForm } from "~/components/TeamForm";
import { Footer } from "~/components/Footer.";
import { Container } from "~/components/ui/Container";
import { TeamSent } from "../components/TeamSended";
// * Utils
import TwitchLogoJuanYut from "~/../public/assets/juanyut-logo-nombre.svg";
import MainMessage from "~/../public/assets/main-landing-message-text.png";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../utils/validators.server";
import { login, getUser, register } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json({ user });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  let confirm_password = form.get("confirm_password");
  let team = form.get("team");
  const action = form.get("action");
  console.log("*******ACTION", action, team, confirm_password);

  if (typeof email !== "string" || typeof password !== "string") {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  if (
    action === "register" &&
    (typeof team !== "string" || typeof confirm_password !== "string")
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
      return await register({ email, password, confirm_password, team });
    }
  }
};

export default function Index() {
  const { user } = useLoaderData();
  console.log("*****loaderData", user);
  return (
    <div className="min-h-screen ">
      <Header user={user} />
      <main className="bg-hero-tracer bg-cover bg-blue-gray-dark min-h-screen mx-auto flex items-center py-20">
        <Container className="m-auto">
          <div className="col-start-1 col-end-7  h-full">
            <div className="flex flex-col h-full justify-between ">
              <img src={MainMessage} alt="" className="my-auto h-52 w-96" />
              <div>
                <img src={TwitchLogoJuanYut} className=" h-10 w-44" alt="" />
                <p className=" text-white">
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

      <div className="absolute right-0 top-[39rem]">
        <img src="/assets/img/graffiti2.svg" alt="" />
      </div>

      <section
        id="acerca"
        className="min-h-screen mx-auto flex items-center pt-14 bg-blue-gray-default"
      >
        <div className="container m-auto grid grid-cols-2">
          {/* <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
          {/* <h2 className="col-start-1 col-end-7 text-white text-7xl ">
            La comunidad te necesita, únete ahora y compite
          </h2> */}
          <div className="col-start-8 col-end-12 max-w-sm">
            <h4 className="text-orange-default font-coolveltica text-white">
              ¿Qué es?
            </h4>
            <p>
              Es un torneo rápido, el cual reúne a jugadores apasionados de
              Overwatch. La finalidad de{" "}
              <span className="text-orange-default">Copa Pachi Oro</span> es
              incentivar el juego competitivo, motivar a que los jugadores sean
              mejores, aportar un granito de arena a la comunidad de OWMX,
              generar entretenimiento, diversión, y conocer nuevos héroes de la
              comunidad.
            </p>
          </div>
        </div>
      </section>

      <section id="equipos" className="h-screen bg-teams-bg bg-cover ">
        <Container>
          <h3 className="pt-16 font-coolveltica text-2xl">Equipos</h3>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
