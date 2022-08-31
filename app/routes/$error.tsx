import { Link, useLoaderData } from '@remix-run/react';
import { redirect } from "@remix-run/node";
// * Types
import type { LoaderFunction } from "@remix-run/node";
// * Utils
import { getUser } from '~/utils/auth.server';
// * Components
import { Header } from "~/components";

export default function Error() {
  const {user} = useLoaderData()

  return (
    <div className="relative h-screen">
      <Header user={user} />
      <div className="pt-14">
        {/* HACERLO CON UN BOTON */}
        <Link to="/">
          <img
            className="absolute  top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform"
            src="/assets/img/error.svg"
            alt=""
          />
        </Link>
        <img
          className="absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 transform"
          src="/assets/img/graffiti.svg"
          alt=""
        />
      </div>
    </div>
  );
}


export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/");
  }

  if (user.admin) {
    return redirect("/admin");
  }

  return { user };
};

