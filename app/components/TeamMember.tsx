import type { TeamMember as TeamMemberInterface } from "~/types/types.user";

interface TeamMemberProps {
  onClick: () => void;
  label?: string;
  member?: TeamMemberInterface;
}

export function TeamMember(props: TeamMemberProps) {
  if (!props.member) {
    return (
      <button
        className=" w-full border border-dashed border-black"
        onClick={props.onClick}
        aria-label="Add Player"
      >
        {props.label ? props.label : "Agregar Jugador"}
      </button>
    );
  }

  return (
    <button
      className=" w-full border border-dashed border-black"
      onClick={props.onClick}
      aria-label="Player"
    >
      <p>Name:{props.member.name}</p>
      <p>Rango:{props.member.rango}</p>
    </button>
  );
}
