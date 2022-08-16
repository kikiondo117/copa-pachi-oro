import type { LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// * Utils
import { getUser } from "~/utils/auth.server";
// * Components
import { Header } from "~/components";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user || !user.admin) {
    return redirect("/");
  }

  return json({ user });
};

export default function Torneo() {
  const { user } = useLoaderData();

  return (
    <div>
      <Header user={user} />
      Hola
    </div>
  );
}
