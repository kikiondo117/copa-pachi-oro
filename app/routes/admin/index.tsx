import type { LoaderFunction } from "@remix-run/node";
import type { UserInterface } from "../../types/types.user";
import { redirect, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
// * Utils
import { getUser } from "~/utils/auth.server";
import { getTeams } from "~/utils/user.server";
import { Header, Container, CardTeam } from "~/components/";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user || !user.admin) {
    return redirect("/");
  }
  const teams = await getTeams();
  return json({ user, teams });
};

export default function AdminTeam() {
  const { user, teams } = useLoaderData();

  return (
    <div>
      <Header user={user} />
      <Container className="pt-14">
        {teams &&
          teams.map((user: UserInterface) => (
            <Link className="col-span-4" to={`/admin/${user.id}`} key={user.id}>
              <CardTeam team={user.team} />
            </Link>
          ))}
      </Container>
    </div>
  );
}
