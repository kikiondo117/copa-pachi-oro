import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type {
  UserInterface,
  TeamMemberInterface,
} from "../../types/types.user";
import * as React from "react";
import { redirect, json } from "@remix-run/node";
import { useLoaderData, useSubmit, useActionData } from "@remix-run/react";
// * Utils
import { getUser } from "~/utils/auth.server";
import {
  getTeam,
  approveTeam,
  addTeamMember,
  addSub,
  updateTeamMember,
  updatedSub,
} from "~/utils/user.server";
// * Components
import Toggle from "react-toggle";
import {
  Header,
  Container,
  TeamMember,
  FormField,
  Modal2,
  PlayerForm,
} from "~/components";

interface loaderData {
  user: UserInterface;
  team: UserInterface;
}

export default function AdminTeam() {
  const { user, team } = useLoaderData<loaderData>();
  const [members, setMembers] = React.useState(() => new Array(5).fill(null));
  const [subs, setSubs] = React.useState(() => new Array(4).fill(null));
  const [isSub, setIsSub] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [playerSelected, setPlayerSelected] =
    React.useState<null | TeamMemberInterface>(null);

  const response = useActionData();
  const submit = useSubmit();

  const approveTeam = () => {
    submit(null, { method: "post" });
  };

  React.useEffect(() => {
    setShowModal(false);
  }, [response]);

  React.useEffect(() => {
    if (team && team.members) {
      setMembers((prevState) =>
        prevState.map((value, index) => {
          if (team.members[index] !== undefined) {
            return team.members[index];
          }
          return null;
        })
      );
    }

    if (team && team.subs) {
      setSubs((prevState) =>
        prevState.map((value, index) => {
          if (team.subs[index] !== undefined) {
            return team.subs[index];
          }
          return null;
        })
      );
    }
  }, [team]);

  return (
    <div className="h-screen bg-blue-gray-dark text-white">
      <Header user={user} />

      <Container className="py-24">
        <article className="col-span-4 flex flex-col font-coolveltica ">
          <h2 className=" text-xl">Datos del equipo </h2>
          <span>
            MARCAR EQUIPO COMO APROBADO:{" "}
            <Toggle
              checked={team.isApproved}
              icons={false}
              onClick={approveTeam}
            />
          </span>

          <FormField
            htmlFor="name"
            value=""
            type="text"
            className=" w-80"
            placeholder={team.team.name}
          />
        </article>

        <section className="col-span-4 font-coolveltica">
          <p className=" mb-4 text-[22px] text-white">Jugadores principales</p>
          <div>
            <ul>
              {members.length &&
                members.map((member, index) => {
                  return (
                    <li key={index}>
                      <TeamMember
                        label="Obligatorio"
                        member={member ? member : null}
                        onClick={() => {
                          setIsSub(false);
                          setShowModal(true);
                          setPlayerSelected(member);
                        }}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>

        <section className="col-span-4 font-coolveltica">
          <p className=" mb-4 text-2xl text-white">
            Jugadores suplentes <span className=" text-base ">(hasta 4)</span>
          </p>
          <ul>
            {subs.length &&
              subs.map((sub, index) => {
                return (
                  <li key={index}>
                    <TeamMember
                      label="Opcional"
                      member={sub ? sub : null}
                      onClick={() => {
                        setShowModal(true);
                        setPlayerSelected(sub);
                      }}
                    />
                  </li>
                );
              })}
          </ul>
        </section>

        {showModal && (
          <Modal2
            onClose={() => setShowModal(false)}
            className="grid grid-cols-6"
          >
            <div className=" col-start-2 col-end-6">
              <PlayerForm
                showCapitan={false}
                isSub={isSub}
                playerSelected={playerSelected}
              />
            </div>
          </Modal2>
        )}
      </Container>
    </div>
  );
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await getUser(request);

  if (!user || !user.admin) {
    return redirect("/");
  }

  if (params.team) {
    try {
      const team = await getTeam(params.team);
      return json({ user, team });
    } catch {
      return redirect("/");
    }
  }

  return json({ user });
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

  if (
    typeof name !== "string" ||
    typeof rango !== "string" ||
    typeof capitan !== "boolean" ||
    typeof img !== "string"
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }
  console.log("rol", rol, id);

  // if (user) {
  //   if (action === "addPlayer") {
  //     return await addTeamMember(user.email, {
  //       name,
  //       rango,
  //       rol,
  //       capitan,
  //       img,
  //     });
  //   }

  //   if (action === "addSub") {
  //     return await addSub(user.email, {
  //       name,
  //       rango,
  //       rol,
  //       capitan,
  //       img,
  //     });
  //   }

  //   if (action === "updatePlayer" && id) {
  //     id = id as string;
  //     return await updateTeamMember(id, {
  //       name,
  //       rango,
  //       rol,
  //       capitan,
  //       img,
  //     });
  //   }

  //   if (action === "updateSub" && id) {
  //     id = id as string;
  //     return await updatedSub(id, {
  //       name,
  //       rango,
  //       rol,
  //       capitan,
  //       img,
  //     });
  //   }
  // }

  return json({ error: `Invalid User`, form: action }, { status: 400 });
};
