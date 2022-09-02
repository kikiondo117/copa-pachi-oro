import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type {
  UserInterface,
  TeamMemberInterface,
} from "../../types/types.user";
import * as React from "react";
import { redirect, json } from "@remix-run/node";
import {
  useLoaderData,
  useSubmit,
  useActionData,
  useTransition,
} from "@remix-run/react";
// * Utils and controllers
import { getUser } from "~/utils/auth.server";
import {
  approveTeam,
  addTeamMember,
  addSub,
  updateTeamMember,
  updatedSub,
  getOwner,
  deleteTeam,
  getCapitan,
} from "~/controller/team.controller";
// * Components
import Toggle from "react-toggle";
import {
  Header,
  Container,
  TeamMember,
  FormField,
  Modal2,
  PlayerForm,
  Nav,
} from "~/components";

interface loaderData {
  admin: UserInterface;
  owner: UserInterface;
  capitan: null | UserInterface;
}

export default function AdminTeam() {
  const { admin, owner, capitan } = useLoaderData<loaderData>();
  const transition = useTransition();
  const [members, setMembers] = React.useState(() => new Array(5).fill(null));
  const [subs, setSubs] = React.useState(() => new Array(4).fill(null));
  const [isSub, setIsSub] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [playerSelected, setPlayerSelected] =
    React.useState<null | TeamMemberInterface>(null);

  const response = useActionData();
  const submit = useSubmit();

  const approveTeam = () => {
    const formData = new FormData();
    formData.append("action", "approveTeam");
    submit(formData, { method: "post" });
  };

  React.useEffect(() => {
    setShowModal(false);
  }, [response]);

  React.useEffect(() => {
    if (owner && owner.members) {
      setMembers((prevState) =>
        prevState.map((value, index) => {
          if (owner.members[index] !== undefined) {
            return owner.members[index];
          }
          return null;
        })
      );
    }

    if (owner && owner.subs) {
      setSubs((prevState) =>
        prevState.map((value, index) => {
          if (owner.subs[index] !== undefined) {
            return owner.subs[index];
          }
          return null;
        })
      );
    }
  }, [owner]);

  return (
    <div className="h-screen bg-blue-gray-dark text-white">
      <Header user={admin} />

      <Container className="py-24">
        <Nav />

        <article className="col-span-4 flex flex-col font-coolveltica ">
          <h2 className=" text-xl">Datos del equipo </h2>
          <span>
            MARCAR EQUIPO COMO APROBADO:
            <Toggle
              className="custom-classname ml-4"
              disabled={
                transition.submission?.formData.get("action") === "approveTeam"
              }
              checked={owner.isApproved}
              icons={false}
              onClick={approveTeam}
              onChange={() => null}
            />
          </span>

          <FormField
            htmlFor="name"
            value=""
            type="text"
            className=" w-80"
            placeholder={owner.team.name}
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
                        setIsSub(true);
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
            className="w-[35rem] grid grid-cols-6"
          >
            <div className=" col-start-2 col-end-6">
              <PlayerForm
                showCapitan={capitan !== null ? false : true}
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
  const admin = await getUser(request);

  if (!admin || !admin.admin) {
    return redirect("/");
  }

  if (params.owner) {
    try {
      const owner = await getOwner(params.owner);
      const capitan = await getCapitan({ id: params.owner });

      if (owner) {
        return json({ admin, owner, capitan });
      } else {
        return redirect("/");
      }
    } catch {
      return redirect("/");
    }
  }

  return json({ admin });
};

export const action: ActionFunction = async ({ request, params }) => {
  const owner = await getOwner(params.owner);
  const form = await request.formData();
  const name = form.get("name");
  const rango = form.get("rango");
  const action = form.get("action");
  const rol = form.get("rol");
  const img = "test";
  const capitan = form.get("capitan") === "on" ? true : false;

  let id = form.get("user_id");

  if (action === "delete_team" && owner) {
    await deleteTeam({ id: owner?.id });
    return redirect("/");
  }

  if (action === "approveTeam" && owner) {
    return await approveTeam(owner.email);
  }

  if (
    typeof name !== "string" ||
    typeof rango !== "string" ||
    typeof capitan !== "boolean" ||
    typeof img !== "string" ||
    typeof rol !== "string"
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  if (owner) {
    if (action === "addPlayer") {
      return await addTeamMember(owner.email, {
        name,
        rango,
        rol,
        capitan,
        img,
      });
    }

    if (action === "addSub") {
      return await addSub(owner.email, {
        name,
        rango,
        rol,
        capitan,
        img,
      });
    }

    if (action === "updatePlayer" && id) {
      id = id as string;
      return await updateTeamMember(id, {
        name,
        rango,
        rol,
        capitan,
        img,
      });
    }

    if (action === "updateSub" && id) {
      id = id as string;
      return await updatedSub(id, {
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
