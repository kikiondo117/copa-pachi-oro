import * as React from "react";
import type { TeamMemberInterface } from "~/types/types.user";
import classNames from 'classnames';

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
        'flex h-[3.75rem] w-full flex-row bg-white transition delay-150 ease-in-out', 
        props.className)
      }
    >
      <img
        src="/assets/PlayerExmapleImg.svg"
        alt=""
        className="mr-2 h-full w-auto"
      />

      <div className=" flex w-full flex-col justify-center">
        <div className="font-coolveltica text-special-orange">
          <p>{props.player.name}</p>
        </div>
        <div className="flex font-coolveltica">
          <img
            className="mr-1 h-[24px]"
            src="/assets/icons/Platino-IconRank-PrincipalWeb.svg"
            alt=""
          />

          <p className="text-base text-blue-gray-default">
            {props.player.rango} SR
          </p>
        </div>
      </div>
      <div className="mx-0 flex w-24 items-center justify-end">
        {props.player.capitan && (
          // <img src="/assets/icons/Icon Crown-leader.svg" alt="" />
          <img
            className="mr-2 h-[24px]"
            src="/assets/icons/IconCrown-leader-orange.svg"
            alt=""
          />
        )}
        <img className="h-[24px]" src="/assets/icons/RolTank.svg" alt="" />
      </div>
      <div className="ml-2  w-2 bg-special-orange"></div>
    </div >
  );
}
