import type { TeamMemberInterface } from "../types/types.user";
import * as React from "react";
import { TeamMember } from "./TeamMember";
import { CardEmptyPlayer } from "./CardEmptyPlayer";

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
      className={` font-coolveltica ${props.className ? props.className : ""
        }`}
    >
      <p className=" mb-4 text-[22px] text-blue-gray-default">
        Jugadores principales
      </p>
      <div>
        <ul>
          {members.map((member, index) => {
            return (
              <li key={index}>
                {member !== null ? <TeamMember
                  member={member}
                  label="Obligatorio"
                  onClick={() => null}
                /> : <CardEmptyPlayer />}

              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
