import * as React from "react";
import { useLoaderData, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
// * Utils and Types
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { User, TeamMemberInterface } from "~/types/types.user";
import { getUser } from "~/utils/auth.server";
import { addTeamMember, addSub } from "../utils/user.server";
// * Components
import {
  Modal,
  AddPlayer,
  Container,
  CardTeam,
  TeamMember,
  Header,
} from "~/components";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json(user);
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  const form = await request.formData();
  const name = form.get("name");
  const rango = form.get("rango");
  const action = form.get("action");
  const rol = "test";
  const img = "test";
  const capitan = false;

  if (
    typeof name !== "string" ||
    typeof rango !== "string" ||
    typeof capitan !== "boolean" ||
    typeof img !== "string"
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  if (user) {
    if (action === "addPlayer") {
      return await addTeamMember(user?.email, {
        name,
        rango,
        rol,
        capitan,
        img,
      });
    } else {
      return await addSub(user.email, {
        name,
        rango,
        rol,
        capitan,
        img,
      });
    }
  }

  return json({ error: `Invalid User`, form: action }, { status: 400 });
};

export default function Team() {
  const [isModal, setIsModal] = React.useState({ status: false });
  const [isSub, setIsSub] = React.useState(false);
  const [members, setMembers] = React.useState(() => new Array(5).fill(null));
  const [subs, setSubs] = React.useState(() => new Array(4).fill(null));
  const [playerSelected, setPlayerSelected] =
    React.useState<null | TeamMemberInterface>(null);

  const response = useActionData();
  const user = useLoaderData<User>();

  React.useEffect(() => {
    setIsModal({ status: false });
  }, [response]);

  React.useEffect(() => {
    if (user && user.members.length) {
      const membersFormat = members.map((value, index) => {
        if (user.members[index] !== undefined) {
          return user.members[index];
        }
        return null;
      });
      setMembers(membersFormat);
    }

    if (user && user.subs.length) {
      const subsFormat = subs.map((value, index) => {
        if (user.subs[index] !== undefined) {
          return user.subs[index];
        }
        return null;
      });
      setSubs(subsFormat);
    }
  }, [user]);

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
                {members.length &&
                  members.map((member, index) => {
                    return (
                      <li key={index}>
                        <TeamMember
                          member={member ? member : null}
                          onClick={() => {
                            setIsModal({ status: true });
                            setIsSub(false);
                            setPlayerSelected(member);
                          }}
                        />
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className="col-start-7 col-end-12">
            <p className=" text-2xl">Jugadores suplentes (hasta 4)</p>
            <ul>
              {subs.length &&
                subs.map((sub, index) => {
                  return (
                    <li key={index}>
                      <TeamMember
                        member={sub ? sub : null}
                        onClick={() => {
                          setIsModal({ status: true });
                          setIsSub(true);
                          setPlayerSelected(sub);
                        }}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        </Container>
      </main>

      {isModal.status && (
        <Modal
          onClose={() => setIsModal({ status: false })}
          className="grid grid-cols-6"
        >
          <div className=" col-start-2 col-end-6">
            <AddPlayer isSub={isSub} playerSelected={playerSelected} />
          </div>
        </Modal>
      )}
    </div>
  );
}
// {...(playerSelected
//   ? { playerSelected: playerSelected }
//   : { playerSelected: null })}
