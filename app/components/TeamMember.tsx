interface TeamMemberProps {
  onClick: () => void;
}

export function TeamMember(props: TeamMemberProps) {
  return (
    <button
      className=" w-full border border-dashed border-black"
      onClick={props.onClick}
    >
      Jugador 1
    </button>
  );
}
