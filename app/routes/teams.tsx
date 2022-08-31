import * as React from "react";
import { useLoaderData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
// * Types
import type { LoaderFunction } from "@remix-run/node";
import type { UserInterface } from "~/types/types.user";
// * Utils and Controllers
import { getUser } from "~/utils/auth.server";
import { getTeamsApproved } from "~/controller/team.controller";
// * Components
import { Container, Header, CardTeam, Modal2, PreviewTeamPlayes } from "~/components";

interface TeamsInterface {
  user: UserInterface;
  teams: UserInterface[];
}

export default function Teams() {
  const { user, teams } = useLoaderData<TeamsInterface>();
  const [showModal, setShowModal] = React.useState(false);
  const [teamSelected, setTeamSelected] = React.useState<UserInterface>();

  return (
    <div>
      <Header user={user} />
      <Container className="pt-28">
        {teams.map((user) => (
          <CardTeam
            key={user.id}
            onClick={() => {
              setShowModal(true);
              setTeamSelected(user);
            }}
            team={user.team}
            className="col-span-4 cursor-pointer"
          />
        ))}
      </Container>

      {showModal && teamSelected && (
        <Modal2 modalClassName="h-[36.8rem] w-[52.5rem]" onClose={() => setShowModal(false)}>
            <PreviewTeamPlayes
                team={teamSelected.team}
                members={teamSelected.members}
                subs={teamSelected.subs}
              />
        </Modal2>
      )}
    </div>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const teams = await getTeamsApproved();

  if (!user) {
    return redirect("/");
  }

  if (user.admin) {
    return redirect("/admin");
  }

  return json({ user, teams });
};
