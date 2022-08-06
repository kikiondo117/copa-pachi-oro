// import type { LoaderFunction } from "@remix-run/node";
// import { requireUserId } from "~/utils/auth.server";
// * Components
import { Header } from "~/components/Header";
import { Container } from "~/components/ui/Container";
import { CardTeam } from "../components/ui/CardTeam";

// export const loader: LoaderFunction = async ({ request }) => {
//   await requireUserId(request);
//   return null;
// };

export default function Team() {
  return (
    <div>
      <Header />

      <main className=" pt-28">
        <Container className="mx-auto">
          <div className=" col-start-3 col-end-12">
            <CardTeam />
          </div>
          <div className="col-start-3 col-end-7">
            <p>Jugadores principales</p>
            <div>
              <ul>
                <li>Jugador 1</li>
                <li>Jugador 2</li>
                <li>Jugador 3</li>
                <li>Jugador 4</li>
                <li>Jugador 5</li>
              </ul>
            </div>
          </div>

          <div className="col-start-7 col-end-12">
            <p>Jugadores suplentes (hasta 4)</p>
            <ul>
              <li>Jugador 1</li>
            </ul>
          </div>
        </Container>
      </main>
    </div>
  );
}
