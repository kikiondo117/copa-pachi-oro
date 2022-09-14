import type { TeamInterface } from "~/types/types.user";
import classNames from "classnames";

type CardTeamProps = {
  className?: string;
  onClick?: () => void;
  team: TeamInterface;
};

export function CardTeam(props: CardTeamProps) {
  return (
    <div
      onClick={props.onClick}
      className={classNames(
        "delay-50 flex h-[80px] w-full flex-row bg-blue-gray-default transition  hover:opacity-75",
        props.className
      )}
    >
      <div className="">
        <img
          src="/assets/team-example-image.svg"
          alt=""
          className="mr-4 h-full"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="font font-big-noodle-oblique text-team-name text-white ">
          {props.team.name.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
