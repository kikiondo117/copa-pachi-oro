import * as React from "react";
import invariant from "tiny-invariant";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// * Types
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { TeamMemberInterface } from "~/types/types.user";
import type { ActionDataLogin, ActionDataRegister } from "~/types/actions";
// * Utils and Controllers
import { login, getUser, register } from "~/utils/auth.server";
import { getTeamsApproved } from "~/models/team.server";
// * Components
import {
  Header,
  TeamForm,
  Footer,
  Container,
  TeamConfirmedRegister,
  CardTeam,
  PreviewTeamPlayes,
  Modal2,
} from "~/components";

interface LoaderData {
  user: User;
  teams: Teams;
}

type User = Awaited<ReturnType<typeof getUser>>;
type Teams = Awaited<ReturnType<typeof getTeamsApproved>>;

export default function Index() {
  const { user, teams } = useLoaderData() as LoaderData;
  const [teamSelected, setTeamSelected] = React.useState<User>();
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="min-h-screen">
      <Header user={user} />
      <div className="absolute z-10">
        <img src="/assets/img_graffiti_effect_1.svg" alt="" />
      </div>

      <main className="mx-auto flex min-h-screen items-center bg-blue-gray-dark bg-hero-tracer bg-cover bg-fixed pt-14">
        <Container className="m-auto py-6">
          <div className="col-start-1 col-end-7 h-full">
            <div className="flex h-full flex-col items-start justify-between">
              <img
                src={"/assets/main-landing-message.svg"}
                alt=""
                className="my-auto mx-0 h-[13.5rem]"
              />
              <div>
                <a
                  href="https://www.twitch.tv/juanyut"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img
                    src={"/assets/juanyut-logo-nombre.svg"}
                    className=" mb-2 h-10 w-[13.313rem] hover:animate-bounce"
                    alt=""
                  />
                </a>
                <p className=" font-coolveltica text-xs text-white">
                  Mi pequeño aporte con mucho cariño y esfuerzo a la comunidad
                  de Overwatch MX, JuanYut.
                </p>
              </div>
            </div>
          </div>
          <div className="col-start-9 col-end-13 w-full">
            <div className="h-[100px] w-auto bg-form-top bg-cover" />
            {user ? <TeamConfirmedRegister /> : <TeamForm />}
          </div>
        </Container>
      </main>

      <div className="absolute right-0 top-[80%]">
        <img src="/assets/img/graffiti2.svg" alt="" />
      </div>

      <section
        id="acerca"
        className=" mx-auto flex h-[30rem] items-center bg-special-blue bg-pachi-retas-sm  bg-cover bg-center"
      >
        <Container className="mx-auto">
          <div className="col-start-1 col-end-7 my-auto">
            <h4 className="mb-4 font-coolveltica text-2xl text-white">
              Acerca de
            </h4>
            <div className=" h-72">
              <iframe
                height="100%"
                width="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="col-start-8 col-end-13 flex flex-col justify-center">
            <h4 className="font-coolveltica text-[1.625rem] tracking-wider text-special-orange">
              ✌¿Qué es?
            </h4>
            <p className=" text-md w-full font-coolveltica font-normal leading-[19px] tracking-wider text-white">
              Es un torneo rápido, el cual reúne a jugadores apasionados de
              Overwatch. La finalidad de{" "}
              <span className="text-special-orange">Pachi Retas</span> es
              incentivar el juego competitivo, motivar a que los jugadores sean
              mejores, aportar un granito de arena a la comunidad de OWMX,
              generar entretenimiento, diversión, y conocer nuevos héroes de la
              comunidad.
            </p>
          </div>
        </Container>
      </section>

      <section
        id="equipos"
        className="relative mx-auto flex h-screen  flex-col items-center justify-center bg-teams-bg bg-cover"
      >
        <div className="h-screen">
          <h3 className="mt-28 h-fit font-coolveltica text-2xl leading-7 tracking-wider text-blue-gray-default">
            Equipos
          </h3>

          <Container className="mt-4">
            {teams.map((user) => (
              <CardTeam
                key={user.id}
                onClick={() => {
                  setShowModal(true);
                  setTeamSelected(user);
                }}
                team={user.team}
                className="col-span-4 cursor-pointer "
              />
            ))}
          </Container>

          {showModal && teamSelected ? (
            <Modal2
              className="h-[36.8rem] w-[52.5rem]"
              onClose={() => setShowModal(false)}
            >
              <PreviewTeamPlayes
                team={teamSelected.team}
                members={teamSelected.members}
                subs={teamSelected.subs}
              />
            </Modal2>
          ) : null}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (user && user.admin) {
    return redirect("/admin");
  }

  if (user) {
    return redirect("/team");
  }

  return json<LoaderData>({ user, teams: await getTeamsApproved() });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  let confirm_password = form.get("confirm_password");
  let team = form.get("team");
  let region = form.get("region");
  let plataforma = form.get("plataforma");
  let isApproved = false;
  let subs: TeamMemberInterface[] = [];
  let members: TeamMemberInterface[] = [];
  const action = form.get("action");

  invariant(typeof email === "string", "Email must be a string");
  invariant(typeof password === "string", "Password must be a string");

  switch (action) {
    case "login": {
      const errors: ActionDataLogin = {
        email: email ? null : "Email is required",
        password: password ? null : "Password is required",
      };

      const hasErros = Object.values(errors).some(
        (errorMessage) => errorMessage
      );

      if (hasErros) {
        return json<ActionDataLogin>(errors);
      }

      return await login({ email, password });
    }

    case "register": {
      const errors: ActionDataRegister = {
        email: email ? null : "Email is required",
        password: password ? null : "Password is requiered",
        confirm_password: confirm_password ? null : "confirm_password error",
        team: team ? null : "Team is required",
        region: region ? null : "Region is required",
        plataforma: plataforma ? null : "Plataforma is required",
      };

      const hasErros = Object.values(errors).some(
        (errorMessage) => errorMessage
      );

      if (hasErros) {
        return json<ActionDataRegister>(errors);
      }

      invariant(
        typeof confirm_password === "string",
        "confirm_password must be a string"
      );
      invariant(typeof team === "string", "Team must be a string");
      invariant(typeof region === "string", "Region must be a string");
      invariant(typeof plataforma === "string", "Plataforma must be a string");

      return await register({
        email,
        password,
        confirm_password,
        team,
        region,
        plataforma,
        members,
        subs,
        isApproved,
      });
    }
  }
};
