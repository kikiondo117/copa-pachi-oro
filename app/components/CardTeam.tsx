import * as React from "react";
import type { TeamInterface } from "~/types/types.user";
import classNames from 'classnames';

type CardTeamProps = {
  className?: string;
  onClick?: () => void;
  team: TeamInterface;
};

export function CardTeam(props: CardTeamProps) {

  return (
    <div
      onClick={props.onClick}
      className={classNames('bg-blue-gray-default flex flex-row w-full h-[3.75rem]', props.className)}
    >
      <div className="">
        <img
          src="/assets/team-example-image.svg"
          alt=""
          className="mr-4 h-full"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="font font-coolveltica text-team-name text-white">
          {props.team.name.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
