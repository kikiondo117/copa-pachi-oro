import * as React from "react";
import classNames from "classnames";

type CardAddPlayerProps = {
  className?: string;
  onClick?: () => void;
  label: string;
};

export function CardAddPlayer(props: CardAddPlayerProps) {
  return (
    <button
      onClick={props.onClick}
      aria-label="Add Player"
      className={classNames(
        "flex h-[3.75rem] w-full flex-col items-center justify-center border-2 border-dashed border-gray-three bg-gray-two font-coolveltica text-gray-three transition  duration-100 ease-in-out hover:scale-105",
        props.className
      )}
    >
      <p className=" text-lg">Agregar jugador</p>
      <p className=" text-xs">{props.label}</p>
    </button>
  );
}
