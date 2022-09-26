import type { TeamMemberInterface } from "../../../types/types.user";
import * as React from "react";
import { TeamMember } from "./TeamMember";
import { CardEmptyPlayer } from "../molecules/CardEmptyPlayer";

interface TeamPLayersInterface {
  members: TeamMemberInterface[] | [];
  className?: string;
}

export function PreviewMembers(props: TeamPLayersInterface) {
  const [members, setMembers] = React.useState(() => new Array(5).fill(null));

  React.useEffect(() => {
    setMembers((prevState) =>
      prevState.map((value, index) => {
        if (props.members[index] !== undefined) {
          return props.members[index];
        }
        return null;
      })
    );
  }, [props.members]);

  return (
    <section
      className={`flex flex-col gap-y-4 font-coolveltica ${
        props.className ? props.className : ""
      }`}
    >
      <p className="text-[22px] text-blue-gray-default">
        Jugadores principales
      </p>
      <ul className="flex flex-col gap-y-4">
        {members.map((member, index) => {
          return (
            <li key={index}>
              {member !== null ? (
                <TeamMember member={member} label="Obligatorio" />
              ) : (
                <CardEmptyPlayer />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
