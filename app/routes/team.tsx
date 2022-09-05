import * as React from "react";
import invariant from "tiny-invariant";
import { useLoaderData, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
// * Utils and Types
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { TeamMemberInterface } from "~/types/types.user";
import { getUser } from "~/utils/auth.server";
// * Models
import { addTeamMember, updateTeamMember } from "~/models/member.server";
import { addSub, updatedSub } from "~/models/subs.server";
// * Components
import {
  Modal2,
  PlayerForm,
  Container,
  Header,
  CardTeam,
  TeamPlayers,
} from "~/components";

type User = Awaited<ReturnType<typeof getUser>>;

interface LoaderData {
  user: User;
  capitan: boolean;
}

type ActionData =
  | {
      name: null | string;
      rango: null | string;
      rol: null | string;
      img: null | string;
    }
  | undefined
  | null;

export default function Team() {
  const [isModal, setIsModal] = React.useState({ status: false });
  const [isSub, setIsSub] = React.useState(false);
  const [playerSelected, setPlayerSelected] =
    React.useState<null | TeamMemberInterface>(null);

  const errors = useActionData() as ActionData;
  const { user, capitan } = useLoaderData() as LoaderData;

  React.useEffect(() => {
    console.log("errors", errors);
    if (errors === null) {
      setIsModal({ status: false });
    }
  }, [errors]);

  const handleClick = (isSub: boolean, player: TeamMemberInterface) => {
    setIsSub(!!isSub);
    setPlayerSelected(player);
    setIsModal({ status: true });
  };

  return (
    <div>
      <Header user={user} />

      <main className=" h-screen bg-hero-rein bg-cover pt-28">
        <Container className="mx-auto">
          <div className=" col-start-3 col-end-11">
            <CardTeam team={user?.team} />
          </div>

          <TeamPlayers
            classNameMembers="col-start-3 col-end-7 col-span-4 cursor-pointer"
            classNameSubs="col-span-4 cursor-pointer"
            members={user.members}
            subs={user.subs}
            onClick={handleClick}
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
        <Modal2
          onClose={() => setIsModal({ status: false })}
          className="w-[35rem] grid grid-cols-6"
        >
          <div className=" col-start-2 col-end-6">
            <PlayerForm
              errors={errors}
              showCapitan={!capitan}
              isSub={isSub}
              playerSelected={playerSelected}
            />
          </div>
        </Modal2>
      )}
    </div>
  );
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

  return json<LoaderData>({ user, capitan });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  const form = await request.formData();
  const name = form.get("name");
  const rango = form.get("rango");
  const action = form.get("action");
  const rol = form.get("rol");
  const img = "test";
  const capitan = form.get("capitan") === "on" ? true : false;
  let id = form.get("user_id");

  const errors: ActionData = {
    name: name ? null : "Title is required",
    rango: rango ? null : "Rango is required",
    rol: rol ? null : "Rol is required",
    img: img ? null : "Img is required",
  };

  const hasErrors = Object.values(errors).some((errorMesage) => errorMesage);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof name === "string", "title must be a string");
  invariant(typeof rango === "string", "rango must be a string");
  invariant(typeof rol === "string", "rol miust be a string");
  invariant(typeof img === "string", "img must be a string");

  if (action === "addPlayer") {
    await addTeamMember(user.email, {
      name,
      rango,
      rol,
      capitan,
      img,
    });

    return null;
  }

  if (action === "addSub") {
    await addSub(user.email, {
      name,
      rango,
      rol,
      capitan,
      img,
    });

    return null;
  }

  if (action === "updatePlayer" && id) {
    id = id as string;
    await updateTeamMember(id, {
      name,
      rango,
      rol,
      capitan,
      img,
    });

    return null;
  }

  if (action === "updateSub" && id) {
    id = id as string;
    await updatedSub(id, {
      name,
      rango,
      rol,
      capitan,
      img,
    });

    return null;
  }
};
