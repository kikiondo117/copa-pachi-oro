import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// * Components
import { Header } from "~/components/Header";
import { TeamForm } from "~/components/TeamForm";
// * Utils
import TwitchLogoJuanYut from "~/../public/assets/juanyut-logo-nombre.svg";
import MainMessage from "~/../public/assets/main-landing-message.svg";
import { Container } from "~/components/ui/Container";
import { validateEmail, validatePassword } from "../utils/validators.server";
import { login, getUser } from "~/utils/auth.server";
import { TeamSended } from "~/components/TeamSended";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json({ user });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (Object.values(errors).some(Boolean)) {
    return json({ errors, fields: { email, password } }, { status: 400 });
  }

  return await login({ email, password });
};

export default function Index() {
  const { user } = useLoaderData();
  console.log("*****loaderData", user);
  return (
    <div className="min-h-screen">
      <Header user={user} />
      <div className="absolute z-10">
        <img src="/assets/img_graffiti_effect_1.svg" alt="" />
      </div>
      <main className="bg-hero-tracer bg-cover bg-fixed bg-blue-gray-dark min-h-screen mx-auto flex items-center">
        <Container className="m-auto">
          <div className="col-start-1 col-end-7  h-full">
            <div className="flex flex-col h-full justify-between ">
              <img src={MainMessage} alt="" className="my-auto h-59 w-full" />
              <div>
                <a href="https://www.twitch.tv/juanyut" target="_blank">
                  <img
                    src={TwitchLogoJuanYut}
                    className=" h-10 w-44 hover:animate-bounce"
                    alt=""
                  />
                </a>
                <p className=" text-white font-coolveltica">
                  Mi pequeño aporte con mucho cariño y esfuerzo a la comunidad
                  de Overwatch MX, JuanYut.
                </p>
              </div>
            </div>
          </div>
          <div className="col-start-9 col-end-13 w-full">
            <div className="bg-form-top bg-cover h-24 w-auto" />
            {/* TODO Destion required */}
            {user ? <TeamSended /> : <TeamForm />}
          </div>
        </Container>
      </main>

      <section className=" h-[30rem] mx-auto bg-special-blue bg-pachi-retas-sm bg-cover bg-center">
        <Container className="mx-auto">
          <div className="col-start-1 col-end-3">
            <h4 className="font-coolveltica text-white text-2xl mb-4">
              Acerca de
            </h4>
            <div className="">
              <iframe
                width="560"
                height="320"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="col-start-8 col-end-13 flex flex-col justify-center">
            <h4 className="text-special-orange font-coolveltica">¿Qué es?</h4>
            <p className=" w-full font-coolveltica text-white text-base">
              Es un torneo rápido, el cual reúne a jugadores apasionados de
              Overwatch. La finalidad de{" "}
              <span className="text-special-orange">Copa Pachi Oro</span> es
              incentivar el juego competitivo, motivar a que los jugadores sean
              mejores, aportar un granito de arena a la comunidad de OWMX,
              generar entretenimiento, diversión, y conocer nuevos héroes de la
              comunidad.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
