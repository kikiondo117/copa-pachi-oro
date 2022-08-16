import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { UserInterface } from "../../types/types.user";
import { redirect, json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
// * Utils
import { getUser } from "~/utils/auth.server";
import { getTeam, approveTeam } from "~/utils/user.server";
// * Components
import { Header, Container, CardPlayer } from "~/components";

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
  const submit = useSubmit();

  const approveTeam = () => {
    submit(null, { method: "post" });
  };

  return (
    <div>
      <Header user={user} />

      <Container className="py-24">
        <section className="  col-span-4 flex flex-col">
          <h2>Datos del equipo {team.team.name}</h2>
          <p>
            MARCAR EQUIPO COMO APROBADO: {team.isApproved ? "true" : "false"}
          </p>

          <button name="button" onClick={approveTeam}>
            Approved
          </button>
        </section>
        <section className=" col-span-4">
          <h3>JUGADORES PRINCIPALES</h3>
          {team.members.map((player) => {
            return <CardPlayer key={player.name} player={player} />;
          })}
        </section>
        <section className=" col-span-4">
          <h3>Jugadores suplentes (hasta 4)</h3>
          {team.subs.map((player) => {
            return <CardPlayer key="player.name" player={player} />;
          })}
        </section>
      </Container>
    </div>
  );
}
