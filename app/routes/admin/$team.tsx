import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { UserInterface } from "../../types/types.user";
import * as React from "react";
import { redirect, json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
// * Utils
import { getUser } from "~/utils/auth.server";
import { getTeam, approveTeam } from "~/utils/user.server";
// * Components
import Toggle from "react-toggle";
import { Header, Container, TeamMember, FormField } from "~/components";

interface loaderData {
  user: UserInterface;
  team: UserInterface;
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

export const action: ActionFunction = async ({ request, params }) => {
  if (params.team) {
    const response = await approveTeam(params.team);
    console.log("response", response);
    return redirect(`/admin/${params.team}`);
  }

  return redirect(`/admin/${params.team}`);
};

export default function AdminTeam() {
  const { user, team } = useLoaderData<loaderData>();
  const [members, setMembers] = React.useState(() => new Array(5).fill(null));
  const [subs, setSubs] = React.useState(() => new Array(4).fill(null));
  const [isSub, setIsSub] = React.useState(false);

  const submit = useSubmit();

  const approveTeam = () => {
    submit(null, { method: "post" });
  };

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
          <p>
            MARCAR EQUIPO COMO APROBADO:{" "}
            <Toggle
              checked={team.isApproved}
              icons={false}
              onClick={approveTeam}
            />
          </p>

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
                      onClick={() => null}
                    />
                  </li>
                );
              })}
          </ul>
        </section>
      </Container>
    </div>
  );
}
