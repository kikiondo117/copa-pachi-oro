import * as React from "react";

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
      className={`
      flex h-[3.75rem] w-full flex-col items-center justify-center 
      border-2 border-dashed border-gray-three bg-gray-two font-coolveltica text-gray-three
        ${props.className ? props.className : ""} `}
    >
      <p className=" text-lg">Agregar jugador</p>
      <p className=" text-xs">{props.label}</p>
    </button>
  );
}
