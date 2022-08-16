type CardEmptyPlayerProps = {
  className?: string;
};

export function CardEmptyPlayer(props: CardEmptyPlayerProps) {
  return (
    <div
      className={` flex h-[3.75rem] w-full flex-row bg-white transition delay-150 ease-in-out hover:bg-blue-gray-dark
      ${props.className ? props.className : ""} `}
    >
      <div className="">
        <img
          src="/assets/img/EmptyPlayerImg.svg"
          alt=""
          className="mr-4 h-full"
        />
      </div>
      <div className=" w-full"></div>
      <div className="w-2  bg-blue-gray-default"></div>
    </div>
  );
}
