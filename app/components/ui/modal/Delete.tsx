import { Button } from "../Button";

type Props = {
  cancel: () => void;
  confirm: () => void;
};

export function Delete(props: Props) {
  return (
    <div className="mt-auto flex h-full flex-col justify-center">
      <p className="text-center font-coolveltica text-2xl text-blue-gray-default">
        ¿Esta seguro que desea eliminar el equipo actual?
      </p>
      <div className="mt-4 flex justify-center">
        <Button.Primary
          className=" text-gray-blue-default mx-3 border border-black bg-transparent px-4 text-black"
          onClick={props.cancel}
        >
          NO, NO ELIMINAR
        </Button.Primary>

        <Button.Primary
          className="mx-3 bg-red-error px-4"
          onClick={props.confirm}
        >
          SI, ELIMINAR EQUIPO
        </Button.Primary>
      </div>
    </div>
  );
}
