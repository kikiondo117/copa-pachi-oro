import * as React from "react";
import { Modal2 } from "~/components/ui/Modal2";
import { useSubmit } from "@remix-run/react";
import { Button } from "~/components/ui/Button";

export function Nav() {
  const [showModal, setShowModal] = React.useState(false);
  const submit = useSubmit();

  return (
    <article className=" col-span-12 flex h-12 w-full items-center justify-between">
      <div className="flex w-full">
        <Button.Primary className=" flex h-full w-[3.1rem] justify-center border-2 border-white bg-transparent ">
          <img src="/assets/icons/IconBack-white.svg" className=" h-5" alt="" />
        </Button.Primary>

        <Button.Primary className="w-[4.6rem ml-4 h-full px-4">
          guardar
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
          <div className="mt-auto flex h-full flex-col justify-center">
            <p className="text-center font-coolveltica text-2xl text-blue-gray-default">
              ¿Esta seguro que desea eliminar el equipo actual?
            </p>
            <div className="mt-4 flex justify-center">
              <Button.Primary
                className=" text-gray-blue-default mx-3 border border-black bg-transparent px-4 text-black"
                onClick={() => setShowModal(false)}
              >
                NO, NO ELIMINAR
              </Button.Primary>

              <Button.Primary
                className="mx-3 bg-red-error px-4"
                onClick={() => {
                  const formData = new FormData();
                  formData.append("action", "delete_team");
                  submit(formData, { method: "post" });
                }}
              >
                SI, ELIMINAR EQUIPO
              </Button.Primary>
            </div>
          </div>
        </Modal2>
      )}
    </article>
  );
}
