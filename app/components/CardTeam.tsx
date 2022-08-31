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
          className="h-full mr-4"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-white font-coolveltica font text-team-name">
          {props.team.name}
        </p>
      </div>
    </div>
  );
}
