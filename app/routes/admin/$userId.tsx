import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { TeamMemberInterface } from "../../types/types.user";

import * as React from "react";
import invariant from "tiny-invariant";
import { redirect, json } from "@remix-run/node";
import {
  useLoaderData,
  useSubmit,
  useActionData,
  useTransition,
  Form,
  useCatch,
} from "@remix-run/react";
// * Utils and controllers
import { getUser } from "~/utils/auth.server";
import { platforms, regions } from "~/constants/selectOptions";
import { addTeamMember, updateTeamMember } from "~/models/member.server";
import { addSub, updatedSub } from "~/models/subs.server";
import { getOwner } from "~/models/user.server";
import { getCapitan } from "~/models/capitan.server";
import { approveTeam, deleteTeam, saveTeam } from "~/models/team.server";
// * Components
import Toggle from "react-toggle";
import {
  FormSelect,
  Header,
  Container,
  TeamMember,
  FormField,
  Modal2,
  PlayerForm,
  NavAdminTeam,
  ErrorTemplate,
} from "~/components";

interface LoaderData {
  admin: Awaited<ReturnType<typeof getUser>>;
  owner: Awaited<ReturnType<typeof getOwner>>;
  capitan: Awaited<ReturnType<typeof getCapitan>>;
}

export default function AdminTeam() {
  const { admin, owner, capitan } = useLoaderData<LoaderData>();
  const [members, setMembers] = React.useState(() => new Array(5).fill(null));
  const [subs, setSubs] = React.useState(() => new Array(4).fill(null));
  const [isSub, setIsSub] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [playerSelected, setPlayerSelected] =
    React.useState<null | TeamMemberInterface>(null);
  const transition = useTransition();
  const response = useActionData();
  const submit = useSubmit();

  const [form, setFormData] = React.useState({
    team: owner?.team.name,
    region: owner?.team.region,
    platform: owner?.team.plataforma,
  });

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  const approveTeam = () => {
    const formData = new FormData();
    formData.append("action", "approveTeam");
    submit(formData, { method: "post" });
  };

  const saveTeam = () => {
    const formData = new FormData();
    formData.append("action", "saveTeam");
    formData.append(`team`, `${form.team}`);
    formData.append(`region`, `${form.region}`);
    formData.append(`plataforma`, `${form.platform}`);

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

      <Container className="pt-24">
        <NavAdminTeam save={saveTeam} />
        <article className="col-span-4 flex flex-col gap-y-[22px] font-coolveltica ">
          <h2 className=" text-xl tracking-wider">Datos del equipo </h2>
          <div className="flex gap-x-4 items-center">
            <span className=" font-big-noodle-oblique text-lg">
              Marcar equipo como aprobado:
            </span>
            <Toggle
              className="custom-classname"
              disabled={
                transition.submission?.formData.get("action") === "approveTeam"
              }
              checked={owner?.isApproved}
              icons={false}
              onClick={approveTeam}
            />
          </div>

          <Form
            method="post"
            className="flex gap-y-4 h-[32rem] w-full flex-col font-coolveltica"
          >
            <FormField
              htmlFor="name"
              value={form.team}
              type="text"
              className=" w-80"
              placeholder={owner?.team.name}
              onChange={(e) => handleInputChange(e, "team")}
            />

            <div className="flex w-80 justify-between ">
              <FormSelect
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleInputChange(e, "region")
                }
                value={form.region}
                title="Región"
                className=" mr-2 h-9"
                defaultLabel="Región"
                options={regions}
              />

              <FormSelect
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleInputChange(e, "platform")
                }
                value={form.platform}
                title="Plataforma"
                defaultLabel="Plataforma"
                options={platforms}
              />
            </div>
          </Form>
        </article>

        <section className=" flex flex-col gap-y-4 col-span-4 font-coolveltica">
          <p className=" text-[22px] text-white">Jugadores principales</p>
          <div>
            <ul className="flex flex-col gap-y-4">
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

        <section className=" flex flex-col gap-y-4 col-span-4 font-coolveltica">
          <p className=" text-2xl text-white">
            Jugadores suplentes <span className=" text-base ">(hasta 4)</span>
          </p>
          <ul className="flex flex-col gap-y-4">
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
            className="grid w-[35rem] grid-cols-6"
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
  const { userId } = params;
  invariant(userId, "userId is required");

  if (!admin || !admin.admin) {
    return redirect("/");
  }

  const owner = await getOwner(userId);

  if (!owner) {
    throw new Response("Not found", { status: 404 });
  }

  return json<LoaderData>({
    admin,
    owner,
    capitan: await getCapitan({ id: owner.id }),
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const owner = await getOwner(params.userId);
  const form = await request.formData();
  const name = form.get("name");
  const rango = form.get("rango");
  const action = form.get("action");
  let team = form.get("team");
  let region = form.get("region");
  let plataforma = form.get("plataforma");
  const rol = form.get("rol");
  const img = "test";
  const capitan = form.get("capitan") === "on" ? true : false;

  let id = form.get("user_id");

  invariant(typeof team === "string", "Team si required");
  invariant(typeof region === "string", "Region si required");
  invariant(typeof plataforma === "string", "Plataforma si required");

  switch (action) {
    case "saveTeam": {
      return await saveTeam({
        id: owner.id,
        body: { team, region, plataforma },
      });
    }

    case "delete_team": {
      await deleteTeam({ id: owner?.id });
      return redirect("/");
    }

    case "approveTeam": {
      return await approveTeam(owner.email);
    }

    case "addPlayer": {
      invariant(typeof name === "string", "Name is required");
      invariant(typeof rango === "string", "Rango is required");
      invariant(typeof rol === "string", "Rol is required");

      return await addTeamMember(owner.email, {
        name,
        rango,
        rol,
        capitan,
        img,
      });
    }

    case "addSub": {
      invariant(typeof name === "string", "Name is required");
      invariant(typeof rango === "string", "Rango is required");
      invariant(typeof rol === "string", "Rol is required");

      return await addSub(owner.email, {
        name,
        rango,
        rol,
        capitan,
        img,
      });
    }

    case "updatePlayer": {
      invariant(typeof name === "string", "Name is required");
      invariant(typeof rango === "string", "Rango is required");
      invariant(typeof rol === "string", "Rol is required");
      invariant(typeof id === "string", "Id is required");
      return await updateTeamMember(id, {
        name,
        rango,
        rol,
        capitan,
        img,
      });
    }

    case "updatePlayer": {
      invariant(typeof name === "string", "Name is required");
      invariant(typeof rango === "string", "Rango is required");
      invariant(typeof rol === "string", "Rol is required");
      invariant(typeof id === "string", "Id is required");
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

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <ErrorTemplate />;
  }

  throw new Error(`Unsupported thrown response status code: ${caught.status}`);
}
