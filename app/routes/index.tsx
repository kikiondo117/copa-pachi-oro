import type { LoaderFunction } from "@remix-run/node";
// * Components
import { Header } from "~/components/Header";
import { TeamForm } from "~/components/TeamForm";
// * Utils
import { requireUserId } from "~/utils/auth.server";
// import TwitchLogoJuanYut from "~/../public/assets/JuanYut_Logo_Nombre.svg";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-hero-tracer bg-cover min-h-screen mx-auto flex items-center pt-14">
        <div className="container m-auto grid grid-cols-12 w-full">
          <h2 className="col-start-1 col-end-7 flex items-center font-coolveltica text-white md:text-4xl text-8xl tracking-wider ">
            La comunidad te necesita, únete ahora y compite
          </h2>
          <div className="col-start-8 col-end-12 w-full">
            <div className="bg-form-top bg-cover h-24 w-auto" />
            <TeamForm />
            {/* <TwitchLogoJuanYut /> */}
          </div>
        </div>
      </main>

      <main className="min-h-screen mx-auto flex items-center pt-14 bg-blue-gray-default">
        <div className="container m-auto grid grid-cols-2">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
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
      </main>
    </div>
  );
}
