import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import type { UserInterface } from "~/types/types.user";
import { redirect, json } from "@remix-run/node";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";
import * as React from "react";
// * UTILS && CONTROLLER
import { getUser } from "~/utils/auth.server";
import { getTeams, deleteTeam } from "~/controller/team.controller";
// * Components
import {
  Header,
  Container,
  CardTeam,
  Button,
  Modal2,
  PreviewTeamPlayes,
} from "~/components/";

export default function AdminTeam() {
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [userSelected, setUserSelected] = React.useState<UserInterface>();
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
                  <button onClick={() => setShowDeleteModal(true)}>
                    <img
                      className="mb-4 ml-6 h-6"
                      src="/assets/icons/iconDelete.svg"
                      alt=""
                    />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setUserSelected(user);
                  }}
                  className="w-full"
                  key={user.id}
                >
                  <CardTeam team={user.team} />
                </button>
              </div>
            ))}
        </div>
      </Container>

      {showModal && userSelected && (
        <Modal2 onClose={() => setShowModal(false)}>
          <PreviewTeamPlayes
            team={userSelected.team}
            members={userSelected.members}
            subs={userSelected.subs}
          />
        </Modal2>
      )}

      {showDeleteModal && userSelected && (
        <Modal2
          className="w-[35rem] h-[12.25rem] p-4"
          onClose={() => setShowDeleteModal(false)}
        >
          <div className="h-full flex justify-center flex-col mt-auto">
            <p className="text-center font-coolveltica text-2xl text-blue-gray-default">
              ¿Esta seguro que desea eliminar el equipo actual?
            </p>
            <div className="mt-4 flex justify-center">
              <button
                className="mr-6"
                onClick={() => setShowDeleteModal(false)}
              >
                No, no eliminar
              </button>
              <button
                onClick={() => {
                  const formData = new FormData();
                  formData.append("action", "delete_team");
                  formData.append("id", userSelected?.id);
                  submit(formData, { method: "post" });
                  setShowModal(false);
                }}
              >
                Si, eliminar equipo
              </button>
            </div>
          </div>
        </Modal2>
      )}
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

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("action");
  let id = form.get("id");

  switch (action) {
    case "delete_team": {
      if (id) {
        id = id as string;
        await deleteTeam({ id });
        return redirect("/");
      }

      // return json({ payload: "Error ID" });
    }
    default:
      break;
  }
};
