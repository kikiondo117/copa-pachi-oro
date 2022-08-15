import * as React from "react";

type CardAddPlayerProps = {
  className?: string;
  onClick?: () => void;
  label: string;
};

export function CardAddPlayer(props: CardAddPlayerProps) {
  return (
    <div
      onClick={props.onClick}
      aria-label="Add Player"
      className={` flex flex-col items-center justify-center w-full h-[3.75rem] bg-gray-two border-dashed border-2 border-gray-three font-coolveltica text-gray-three
      ${props.className ? props.className : ""} `}
    >
      <p className=" text-lg">Agregar jugador</p>
      <p className=" text-xs">{props.label}</p>
    </div>
  );
}
