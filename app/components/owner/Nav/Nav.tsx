import * as React from "react";
import { Modal2 } from "~/components/ui/Modal2";
import { useSubmit } from "@remix-run/react";

export function Nav() {
  const [showModal, setShowModal] = React.useState(false);
  const submit = useSubmit();

  return (
    <article
      className="
col-span-12
flex justify-around"
    >
      <div>
        <button>Regresar</button>
        <button>Guardar</button>
      </div>
      <button onClick={() => setShowModal(true)}>Delete</button>

      {showModal && (
        <Modal2
          className="my-auto h-[12rem]"
          onClose={() => setShowModal(false)}
        >
          <div>
            <p>Seguro que quieres eliminar el poderoso</p>
            <button
              onClick={() => {
                const formData = new FormData();
                formData.append("action", "delete_team");
                submit(formData, { method: "post" });
              }}
            >
              Si
            </button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </Modal2>
      )}
    </article>
  );
}
