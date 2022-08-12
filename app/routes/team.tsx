import * as React from "react";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
// * Utils
import { getUser } from "~/utils/auth.server";
// * Components
import { Header } from "~/components/Header";
import { TeamMember } from "~/components/TeamMember";
import { Container } from "~/components/ui/Container";
import { CardTeam } from "../components/ui/CardTeam";
import { Modal } from "~/components/ui/Modal";
import { AddPlayer } from "~/components/AddPlayer";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json({ user });
};

export default function Team() {
  const [isModal, setIsModal] = React.useState(false);
  const { user } = useLoaderData();

  return (
    <div>
      <Header user={user} />

      <main className=" pt-28">
        <Container className="mx-auto">
          <div className=" col-start-3 col-end-12">
            <CardTeam />
          </div>
          <div className="col-start-3 col-end-7">
            <p className=" text-2xl">Jugadores principales</p>
            <div>
              <ul>
                <li>
                  <TeamMember onClick={() => setIsModal(true)} />
                </li>
                <li>Jugador 2</li>
                <li>Jugador 3</li>
                <li>Jugador 4</li>
                <li>Jugador 5</li>
              </ul>
            </div>
          </div>

          <div className="col-start-7 col-end-12">
            <p className=" text-2xl">Jugadores suplentes (hasta 4)</p>
            <ul>
              <li>
                Jugador 1<button onClick={() => handleOnClick()}>Enviar</button>
              </li>
            </ul>
          </div>
        </Container>
      </main>

      {isModal && (
        <Modal onClose={() => setIsModal(false)} className="grid grid-cols-6">
          <div className=" col-start-2 col-end-6">
            <AddPlayer />
          </div>
        </Modal>
      )}
    </div>
  );
}
