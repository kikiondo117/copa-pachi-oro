import * as React from "react";
import { Link, useSubmit, useTransition } from "@remix-run/react";
import { Button, Delete, Modal2 } from "~/components";
import classNames from "classnames";

export function NavAdminTeam({ save }: { save: () => void }) {
  const [showModal, setShowModal] = React.useState(false);
  const transition = useTransition();
  const submit = useSubmit();

  const action = transition.submission?.formData.get("action");

  return (
    <article className=" col-span-12 flex h-12 w-full items-center justify-between">
      <div className="flex gap-x-4 w-full">
        <Link to="/admin">
          <Button.Primary className=" flex h-full w-[3.1rem] justify-center border-2 border-white bg-transparent ">
            <img
              src="/assets/icons/IconBack-white.svg"
              className=" h-5"
              alt=""
            />
          </Button.Primary>
        </Link>

        <Button.Primary
          onClick={save}
          className={classNames("w-[4.6rem h-full px-4 bg-special-blue-light", {
            "bg-red-500": action === "saveTeam",
          })}
          disabled={action === "saveTeam"}
        >
          {action === "saveTeam" ? "guardando..." : "guardar"}
        </Button.Primary>
      </div>

      <Button.Primary
        className=" flex h-full w-[3.1rem] items-center justify-center bg-red-error"
        onClick={() => setShowModal(true)}
      >
        <img
          src="/assets/icons/Icon Delete-white.svg"
          className=" h-5"
          alt=""
        />
      </Button.Primary>

      {showModal && (
        <Modal2
          className="h-[12.25rem] w-[35rem] p-4"
          onClose={() => setShowModal(false)}
        >
          <Delete
            cancel={() => setShowModal(false)}
            confirm={() => {
              const formData = new FormData();
              formData.append("action", "delete_team");
              submit(formData, { method: "post" });
            }}
          />
        </Modal2>
      )}
    </article>
  );
}
