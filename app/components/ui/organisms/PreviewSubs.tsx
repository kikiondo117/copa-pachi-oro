import type { TeamMemberInterface } from "../../../types/types.user";
import * as React from "react";
import { TeamMember } from "./TeamMember";
import { CardEmptyPlayer } from "../molecules/CardEmptyPlayer";

interface TeamPLayersInterface {
  subs: TeamMemberInterface[] | [];
  className?: string;
}

export function PreviewSubs(props: TeamPLayersInterface) {
  const [subs, setSubs] = React.useState(() => new Array(4).fill(null));

  React.useEffect(() => {
    setSubs((prevState) =>
      prevState.map((value, index) => {
        if (props.subs[index] !== undefined) {
          return props.subs[index];
        }
        return null;
      })
    );
  }, [props.subs]);

  return (
    <section
      className={`font-coolveltica ${props.className ? props.className : ""}`}
    >
      <p className=" mb-4 text-2xl text-blue-gray-default">
        Jugadores suplentes <span className=" text-base ">(hasta 4)</span>
      </p>
      <ul>
        {subs.map((sub, index) => {
          return (
            <li key={index}>
              {sub !== null ? (
                <TeamMember
                  label="Opcional"
                  onClick={() => null}
                  member={sub}
                />
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
