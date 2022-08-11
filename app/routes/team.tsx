import * as React from "react";
import { useLoaderData, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
// * Utils and Types
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { User } from "~/types/types.user";
import { getUser } from "~/utils/auth.server";
import { addTeamMember } from "../utils/user.server";
// * Components
import { Header } from "~/components/Header";
import { TeamMember } from "~/components/TeamMember";
import { Container } from "~/components/ui/Container";
import { CardTeam } from "../components/ui/CardTeam";
import { Modal } from "~/components/ui/Modal";
import { AddPlayer } from "~/components/AddPlayer";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json(user);
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  const form = await request.formData();
  const name = form.get("name");
  const rango = form.get("rango");
  const rol = "test";
  const img = "test";
  const capitan = false;

  console.log("test", name, rango, capitan, img);

  if (
    typeof name !== "string" ||
    typeof rango !== "string" ||
    typeof capitan !== "boolean" ||
    typeof img !== "string"
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  if (user)
    return await addTeamMember(user?.email, { name, rango, rol, capitan, img });

  return null;
};

export default function Team() {
  const [isModal, setIsModal] = React.useState(false);
  const response = useActionData();
  const user = useLoaderData<User>();
  console.log("USER", user);

  React.useEffect(() => {
    setIsModal(false);
  }, [response]);

  return (
    <div>
      <Header user={user} />

      <main className=" pt-28">
        <Container className="mx-auto">
          <div className=" col-start-3 col-end-12">
            <CardTeam />
          </div>
          <div className="col-start-3 col-end-7">
            <p className=" text-2xl">Jugadores principales</p>
            <div>
              <ul>
                {/* TODO logic to show the card */}
                {user?.members.map((member, index) => {
                  return (
                    <li key={member.name}>
                      <TeamMember
                        member={member}
                        onClick={() => setIsModal(true)}
                      />
                    </li>
                  );
                })}
                <li>
                  <TeamMember onClick={() => setIsModal(true)} />
                </li>
              </ul>
            </div>
          </div>

          <div className="col-start-7 col-end-12">
            <p className=" text-2xl">Jugadores suplentes (hasta 4)</p>
            <ul>
              <li>
                <TeamMember onClick={() => setIsModal(true)} />
              </li>
            </ul>
          </div>
        </Container>
      </main>

      {isModal && (
        <Modal onClose={() => setIsModal(false)} className="grid grid-cols-6">
          <div className=" col-start-2 col-end-6">
            <AddPlayer />
          </div>
        </Modal>
      )}
    </div>
  );
}
