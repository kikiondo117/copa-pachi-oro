import * as React from "react";

type CardEmptyPlayerProps = {
  className?: string;
};

export function CardEmptyPlayer(props: CardEmptyPlayerProps) {
  return (
    <div
      className={` flex flex-row w-full h-[3.75rem] transition ease-in-out delay-150 bg-white hover:bg-blue-gray-dark
      ${props.className ? props.className : ""} `}
    >
      <div className="">
        <img
          src="/assets/img/EmptyPlayerImg.svg"
          alt=""
          className="h-full mr-4"
        />
      </div>
      <div className=" w-full"></div>
      <div className="bg-blue-gray-default  w-2"></div>
    </div>
  );
}
