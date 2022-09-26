import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import type { UserInterface } from "~/types/types.user";
import { redirect, json } from "@remix-run/node";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";
import * as React from "react";
// *  3 party libraries
import { useScreenshot, createFileName } from "use-react-screenshot";
// * UTILS && CONTROLLER
import { getUser } from "~/utils/auth.server";
import { getTeams, deleteTeam } from "~/models/team.server";
// * Components
import {
  Header,
  Container,
  CardTeam,
  Button,
  Modal2,
  PreviewTeamPlayes,
  Delete,
} from "~/components/";

export default function AdminTeam() {
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [userSelected, setUserSelected] = React.useState<UserInterface>();
  const { user, teams } = useLoaderData();
  const submit = useSubmit();
  // SCREENSHOT
  const ref = useScreenshot();
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (
    image: string,
    { name = "img", extension = "jpg" } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <div className="bg-gray-1 bg-cover">
      <Header user={user} />

      <Container className="flex h-screen flex-row overflow-y-scroll pt-20">
        <header className="col-start-3 col-end-11 h-fit">
          <Link to="/admin/team">
            <Button.Primary className="flex h-10 w-[7.6rem] items-center justify-around bg-special-blue-light">
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
                      className="mb-4 h-6 transition duration-100 ease-in-out hover:scale-110 cursor-pointer"
                      src="/assets/icons/iconEdit.svg"
                      alt=""
                    />
                  </Link>
                  <button
                    onClick={() => {
                      setShowDeleteModal(true);
                      setUserSelected(user);
                    }}
                  >
                    <img
                      className="mb-4 ml-6 h-6 transition duration-100 ease-in-out hover:scale-110 cursor-pointer"
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
          <div ref={ref}>
            <PreviewTeamPlayes
              team={userSelected.team}
              members={userSelected.members}
              subs={userSelected.subs}
            />
          </div>

          <button
            className="fixed bottom-0 right-0 mr-6 mb-16 duration-100 ease-in-out hover:scale-110"
            onClick={downloadScreenshot}
          >
            <img src="/assets/icons/camera.svg" alt="camera button" />
          </button>
        </Modal2>
      )}

      {showDeleteModal && userSelected && (
        <Modal2
          className="w-[35rem] h-[12.25rem] p-4"
          onClose={() => setShowDeleteModal(false)}
        >
          <Delete
            cancel={() => setShowDeleteModal(false)}
            confirm={() => {
              const formData = new FormData();
              formData.append("action", "delete_team");
              formData.append("id", userSelected?.id);
              submit(formData, { method: "post" });
              setShowModal(false);
            }}
          />
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
