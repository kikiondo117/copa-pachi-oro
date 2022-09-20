import * as React from "react";
import type { TeamMemberInterface } from "~/types/types.user";
import classNames from "classnames";
import { betweenRange } from "~/utils/functions";
import { getRange } from "~/utils/functions";

type CardPlayerProps = {
  className?: string;
  onClick?: () => void;
  player: TeamMemberInterface;
};

export function CardPlayer(props: CardPlayerProps) {
  return (
    <div
      onClick={props.onClick}
      className={classNames(
        " flex h-[3.75rem] w-full flex-row bg-white ",
        props.className,
        {
          "transition duration-100 ease-in-out hover:scale-105 cursor-pointer":
            props.onClick,
        }
      )}
    >
      <img
        src="/assets/PlayerExmapleImg.svg"
        alt=""
        className="mr-2 h-full w-auto"
      />

      <div className=" flex w-full flex-col justify-center">
        <div className="font-big-noodle-oblique text-special-orange">
          <p>{props.player.name}</p>
        </div>
        <div className="flex font-coolveltica">
          <img
            className="mr-1 h-[24px]"
            src={`/assets/icons/${getRange(props.player.rango)}`}
            alt=""
          />
          <p className="text-base text-blue-gray-default">
            {props.player.rango} SR
          </p>
        </div>
      </div>
      <div className="mx-0 flex w-24 items-center justify-end">
        {props.player.capitan && (
          <img
            className="mr-2 h-[24px]"
            src="/assets/icons/IconCrown-leader-orange.svg"
            alt=""
          />
        )}
        {props.player.rol === "Tank" && (
          <img className="h-[24px]" src="/assets/icons/RolTank.svg" alt="" />
        )}
        {props.player.rol === "Damage" && (
          <img className="h-[24px]" src="/assets/icons/RolDPS.svg" alt="" />
        )}
        {props.player.rol === "Support" && (
          <img className="h-[24px]" src="/assets/icons/RolSupport.svg" alt="" />
        )}
      </div>
      <div className="ml-2  w-2 bg-special-orange"></div>
    </div>
  );
}
