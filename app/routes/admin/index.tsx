import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import type { UserInterface } from "~/types/types.user";
import { redirect, json } from "@remix-run/node";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";
import * as React from 'react'
// * UTILS && CONTROLLER
import { getUser } from "~/utils/auth.server";
import { getTeams, deleteTeam } from "~/controller/team.controller";
// * Components
import { Header, Container, CardTeam, Button, Modal2, PreviewTeamPlayes } from "~/components/";



export default function AdminTeam() {
  const [showModal, setShowModal] = React.useState(false)
  const [userSelected, setUserSelected] = React.useState<UserInterface>()
  const { user, teams } = useLoaderData();
  const submit = useSubmit();

  return (
    <div className="bg-gray-1 bg-cover">
      <Header user={user} />

      <Container className="flex h-screen flex-row overflow-y-scroll pt-20">
        <header className="col-start-3 col-end-11 h-fit">
          <Link to="/admin/team">
            <Button.Primary className="flex h-10 w-[7.6rem] items-center justify-around">
              Crear equipo
              <img
                className=" h-5"
                src="/assets/icons/IconAdd-white.svg"
                alt=""
              />
            </Button.Primary>
          </Link>
        </header>

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
                  <button
                    onClick={() => {
                      const formData = new FormData();
                      formData.append("action", "delete_team");
                      formData.append("id", user.id);
                      submit(formData, { method: "post" });
                    }}
                  >
                    <img
                      className="mb-4 ml-6 h-6"
                      src="/assets/icons/iconDelete.svg"
                      alt=""
                    />
                  </button>
                </div>
                <button onClick={() => {
                  setShowModal(true);
                  setUserSelected(user)
                }} className='w-full' key={user.id}>
                  <CardTeam team={user.team} />
                </button>
              </div>
            ))}
        </div>
      </Container>

      {showModal && userSelected && <Modal2 modalClassName="w-[52rem] h-[36.6rem]" onClose={() => setShowModal(false)}>
        <PreviewTeamPlayes team={userSelected.team} members={userSelected.members} subs={userSelected.subs} />
      </Modal2>
      }

    </div >
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

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("action");
  let id = form.get('id')



  switch (action) {
    case "delete_team": {
      if (id) {
        id = id as string
        await deleteTeam({ id })
        return redirect('/')
      }

      return json({ payload: 'Error ID' })
    }
    default:
      break;
  }
};
