import type { TeamMemberInterface } from "~/types/types.user";
import { CardAddPlayer, CardPlayer } from "~/components/";

interface TeamMemberProps {
  onClick: () => void;
  label: string;
  member?: TeamMemberInterface | null;
}

export function TeamMember(props: TeamMemberProps) {
  if (!props.member) {
    return (
      <CardAddPlayer
        label={props.label}
        onClick={props.onClick}
        className=" mb-4"
      ></CardAddPlayer>
    );
  }

  return (
    <CardPlayer
      className="mb-4"
      player={props.member}
      onClick={props.onClick}
    />
  );
}
