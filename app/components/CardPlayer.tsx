import * as React from "react";
import type { TeamMemberInterface } from "~/types/types.user";

type CardPlayerProps = {
  className?: string;
  onClick?: () => void;
  player: TeamMemberInterface;
};

export function CardPlayer(props: CardPlayerProps) {
  return (
    <div
      // onClick={props.onClick}
      className={` flex flex-row w-full h-[3.75rem] transition ease-in-out delay-150 bg-white hover:bg-blue-gray-dark
      ${props.className ? props.className : ""} `}
    >
      <img
        src="/assets/PlayerExmapleImg.svg"
        alt=""
        className="h-full w-auto mr-2"
      />

      <div className=" w-full flex flex-col justify-center">
        <div className="text-special-orange font-coolveltica">
          <p>{props.player.name}</p>
        </div>
        <div className="flex font-coolveltica">
          <img
            className="h-[24px] mr-1"
            src="/assets/icons/Platino-IconRank-PrincipalWeb.svg"
            alt=""
          />

          <p className="text-base text-blue-gray-default">
            {props.player.rango} SR
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end w-24 mx-0">
        {props.player.capitan && (
          // <img src="/assets/icons/Icon Crown-leader.svg" alt="" />
          <img
            className="h-[24px] mr-2"
            src="/assets/icons/IconCrown-leader-orange.svg"
            alt=""
          />
        )}
        <img className="h-[24px]" src="/assets/icons/RolTank.svg" alt="" />
      </div>
      <div className="bg-special-orange  w-2 ml-2"></div>
    </div>
  );
}
