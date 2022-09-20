import type {
  TeamMemberInterface,
  TeamInterface,
} from "../../../types/types.user";
import { PreviewMembers } from "../organisms/PreviewMembers";
import { PreviewSubs } from "../organisms/PreviewSubs";
import classNames from "classnames";
import { CardTeam } from "../molecules/CardTeam";

interface TeamPLayersInterface {
  members: TeamMemberInterface[] | [];
  subs: TeamMemberInterface[] | [];
  team: TeamInterface;
  classNameMembers?: string;
  classNameSubs?: string;
  className?: string;
}

export function PreviewTeamPlayes(props: TeamPLayersInterface) {
  return (
    <div className={classNames("grid grid-cols-2 gap-4 p-11", classNames)}>
      <CardTeam className="col-span-2 h-20" team={props.team} />

      <PreviewMembers members={props.members} />
      <PreviewSubs subs={props.subs} />
    </div>
  );
}
