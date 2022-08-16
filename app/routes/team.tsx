import * as React from "react";
import { useLoaderData, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
// * Utils and Types
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { UserInterface, TeamMemberInterface } from "~/types/types.user";
import { getUser } from "~/utils/auth.server";
import { addTeamMember, addSub } from "../utils/user.server";
// * Components
import {
  Modal,
  PlayerForm,
  Container,
  TeamMember,
  Header,
  CardTeam,
  TeamPlayers,
} from "~/components";

interface LoaderInterface {
  user: UserInterface;
  capitan: boolean;
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const member = user?.members.find((member) => member.capitan);
  const sub = user?.subs.find((sub) => sub.capitan);
  let capitan = false;

  if (!user) {
    return redirect("/");
  }

  if (user.admin) {
    return redirect("/admin");
  }

  if (member !== undefined || sub !== undefined) {
    capitan = true;
  }

  return { user, capitan };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  const form = await request.formData();
  const name = form.get("name");
  const rango = form.get("rango");
  const action = form.get("action");
  const rol = "test";
  const img = "test";
  const capitan = form.get("capitan") === "on" ? true : false;

  if (
    typeof name !== "string" ||
    typeof rango !== "string" ||
    typeof capitan !== "boolean" ||
    typeof img !== "string"
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  if (user) {
    if (action === "addPlayer") {
      return await addTeamMember(user?.email, {
        name,
        rango,
        rol,
        capitan,
        img,
      });
    } else {
      return await addSub(user.email, {
        name,
        rango,
        rol,
        capitan,
        img,
      });
    }
  }

  return json({ error: `Invalid User`, form: action }, { status: 400 });
};

export default function Team() {
  const [isModal, setIsModal] = React.useState({ status: false });
  const [isSub, setIsSub] = React.useState(false);
  const [playerSelected, setPlayerSelected] =
    React.useState<null | TeamMemberInterface>(null);

  const response = useActionData();
  const { user, capitan } = useLoaderData<LoaderInterface>();

  React.useEffect(() => {
    setIsModal({ status: false });
  }, [response]);

  return (
    <div>
      <Header user={user} />

      <main className=" h-screen bg-hero-rein bg-cover pt-28">
        <Container className="mx-auto">
          <div className=" col-start-3 col-end-11">
            <CardTeam team={user.team} />
          </div>

          <TeamPlayers
            classNameMembers="col-start-3 col-end-7 col-span-4"
            classNameSubs="col-span-4"
            members={user.members}
            subs={user.subs}
          />

          <div className=" col-start-3 col-end-12 flex flex-row items-center font-coolveltica text-blue-gray-default">
            <img
              src="/assets/icons/disclaimer.svg"
              alt=""
              className="mr-[18px] inline"
            />
            {user.members.length === 5
              ? "Información de todos los jugadores principales completada, esperando aprobación del equipo."
              : "Completa la información de todos los jugadores principales para que tu equipo sea aprobado."}
          </div>
        </Container>
      </main>

      {isModal.status && (
        <Modal
          onClose={() => setIsModal({ status: false })}
          className="grid grid-cols-6"
        >
          <div className=" col-start-2 col-end-6">
            <PlayerForm
              showCapitan={!capitan}
              isSub={isSub}
              playerSelected={playerSelected}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
