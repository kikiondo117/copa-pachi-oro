import type { LoaderFunction } from "@remix-run/node";
import type { UserInterface } from "../../types/types.user";
import { redirect, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
// * Utils
import { getUser } from "~/utils/auth.server";
import { getTeams } from "~/utils/user.server";
import { Header, Container, CardTeam, Button } from "~/components/";

export default function AdminTeam() {
  const { user, teams } = useLoaderData();

  return (
    <div className="bg-gray-1 bg-cover">
      <Header user={user} />
      <Button.Primary className=" col-start-3 m-0 flex h-10 w-[7.6rem] ">
        Crear equipo{" "}
        <img className=" h-5" src="/assets/icons/IconAdd-white.svg" alt="" />
      </Button.Primary>

      <Container className=" flex h-screen flex-row overflow-y-scroll pt-20">
        <div className="col-start-3 col-end-11 flex flex-wrap content-start gap-4 overflow-scroll ">
          {teams &&
            teams.map((user: UserInterface) => (
              <div key={user.id} className="h-fit min-w-[23rem]">
                <div className=" flex justify-end ">
                  <Link to={`/admin/${user.id}`} key={user.id}>
                    <img
                      className="mb-4 h-6"
                      src="/assets/icons/iconEdit.svg"
                      alt=""
                    />
                  </Link>
                  <img
                    className="mb-4 ml-6 h-6"
                    src="/assets/icons/iconDelete.svg"
                    alt=""
                  />
                </div>
                <Link to={`/admin/${user.id}`} key={user.id}>
                  <CardTeam team={user.team} />
                </Link>
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user || !user.admin) {
    return redirect("/");
  }
  const teams = await getTeams();
  return json({ user, teams });
};
