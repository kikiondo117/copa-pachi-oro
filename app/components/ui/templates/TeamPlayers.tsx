import type { TeamMemberInterface } from "../../../types/types.user";
import * as React from "react";
import { TeamMember } from "../organisms/TeamMember";

interface TeamPLayersInterface {
  members: TeamMemberInterface[] | [];
  subs: TeamMemberInterface[] | [];
  classNameMembers?: string;
  classNameSubs?: string;
  className?: string;
  onClick: (isSub: boolean, player: TeamMemberInterface) => void;
}

export function TeamPlayers(props: TeamPLayersInterface) {
  const [members, setMembers] = React.useState(() => new Array(5).fill(null));
  const [subs, setSubs] = React.useState(() => new Array(4).fill(null));

  React.useEffect(() => {
    setMembers((prevState) =>
      prevState.map((value, index) => {
        if (props.members[index] !== undefined) {
          return props.members[index];
        }
        return null;
      })
    );

    setSubs((prevState) =>
      prevState.map((value, index) => {
        if (props.subs[index] !== undefined) {
          return props.subs[index];
        }
        return null;
      })
    );
  }, [props.members, props.subs]);

  const children = (
    <>
      <section
        className={` font-coolveltica ${
          props.classNameMembers ? props.classNameMembers : ""
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
                  <TeamMember
                    label="Obligatorio"
                    member={member ? member : null}
                    onClick={() => props.onClick(false, member)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        className={`font-coolveltica ${
          props.classNameSubs ? props.classNameSubs : ""
        }`}
      >
        <p className=" mb-4 text-2xl text-blue-gray-default">
          Jugadores suplentes <span className=" text-base ">(hasta 4)</span>
        </p>
        <ul>
          {subs.map((sub, index) => {
            return (
              <li key={index}>
                <TeamMember
                  label="Opcional"
                  member={sub ? sub : null}
                  onClick={() => props.onClick(true, sub)}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );

  if (props.className === undefined) {
    return <>{children}</>;
  }

  return (
    <div className={`${props.className ? props.className : ""}`}>
      {children}
    </div>
  );
}
