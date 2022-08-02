// * Components
import { Header } from "~/components/Header";
import { TeamForm } from "~/components/TeamForm";
// * Utils
import TwitchLogoJuanYut from "~/../public/assets/juanyut-logo-nombre.svg";
import MainMessage from "~/../public/assets/main-landing-message-text.png";
import { Container } from "~/components/ui/Container";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-hero-tracer bg-cover bg-blue-gray-dark min-h-screen mx-auto flex items-center pt-20">
        <Container className="m-auto">
          <div className="col-start-1 col-end-7  h-full">
            <div className="flex flex-col h-full justify-between">
              <img src={MainMessage} alt="" className=" h-52 w-96" />
              <div>
                <img src={TwitchLogoJuanYut} className=" h-10 w-44" alt="" />
                <p>
                  Mi pequeño aporte con mucho cariño y esfuerzo a la comunidad
                  de Overwatch MX, JuanYut.
                </p>
              </div>
            </div>
          </div>
          <div className="col-start-9 col-end-13 w-full">
            <div className="bg-form-top bg-cover h-24 w-auto" />
            <TeamForm />
          </div>
        </Container>
      </main>

      <section className="min-h-screen mx-auto flex items-center pt-14 bg-blue-gray-default">
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
    </div>
  );
}
