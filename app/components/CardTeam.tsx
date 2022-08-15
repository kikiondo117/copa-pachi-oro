import * as React from "react";
import { User } from "~/types/types.user";

type CardTeamProps = {
  className?: string;
  onClick?: () => void;
  team: User;
};

export function CardTeam(props: CardTeamProps) {
  return (
    <div
      onClick={props.onClick}
      className={`bg-blue-gray-default flex flex-row w-full h-[3.75rem]
      ${props.className ? props.className : ""} `}
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
          Los Come Pollas 3K{" "}
        </p>
      </div>
    </div>
  );
}
