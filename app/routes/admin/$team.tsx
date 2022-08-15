import type { LoaderFunction } from "@remix-run/node";
import type { UserInterface } from "../../types/types.user";
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// * Utils
import { getUser } from "~/utils/auth.server";
import { Header } from "~/components/ui/Header";
import { getTeam } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log("request", request);
  console.log("params", params);

  const user = await getUser(request);
  if (!user || !user.admin) {
    return redirect("/");
  }
  if (params.team) {
    const team = await getTeam(params.team);
    return json({ user, team });
  }

  return json({ user });
};

interface loaderData {
  user: UserInterface;
  team: UserInterface;
}

export default function AdminTeam() {
  const { user, team } = useLoaderData<loaderData>();

  console.log("TEAM", team);

  return (
    <div>
      <Header user={user} />
      <div className="py-24">
        <h1 className="text-2xl">Team</h1>
        {team && <div>Team {team.team.name}</div>}
      </div>
    </div>
  );
}
