import * as React from "react";
import { Switch } from "~/components/ui/Switch";

type CardTournamentProps = {
  className?: string;
};

export function CardTournament(props: CardTournamentProps) {
  return (
    <div
      className={` flex flex-col w-full h-[12.8rem] col-span-4 dashed bg-blue-gray-default p-6
      ${props.className ? props.className : ""} `}
    >
      <div className=" flex flex-row justify-between w-full h-[50vh]">
        <div className="flex flex-col">
          <h3 className=" font-big-noodle-oblique text-special-orange text-2xl">
            Copa Pachi Oro 2022 Edición #01
          </h3>
          <div className=" flex flex-row justify-center items-center bg-white w-fit rounded-full my-1">
            {/* <span className=" h-3 w-3 mr-1 rounded-full bg-special-blue-light"></span> */}

            <span className="flex h-3 w-3 ml-1">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-special-blue-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-special-blue-light"></span>
            </span>
            <span className=" mx-2 font-coolveltica text-blue-gray-default">
              En curso
            </span>
          </div>
          <span className=" font-coolveltica tracking-wider text-white">
            01/01/2022
          </span>
        </div>
        <div className="">
          <img
            className=" h-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-50"
            src="/assets/icons/IconTournament-white.svg"
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-between items-end font-coolveltica text-white w-full h-[50vh]">
        <div className="flex flex-col">
          <span className=" text-base">Primer Lugar</span>
          <div className="flex flex-row">
            <img
              className=" h-10 mr-2"
              src="/assets/team-example-image.svg"
              alt=""
            />
            <img
              className=" h-10"
              src="/assets/Pachimari_Gold_Logo.svg"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className=" text-base">Segundo Lugar</span>
          <div className="flex flex-row">
            <img
              className=" h-10 mr-2"
              src="/assets/team-example-image.svg"
              alt=""
            />
            <img
              className=" h-10"
              src="/assets/Pachimari_Gold_Logo.svg"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className=" text-base">Tercer Lugar</span>
          <div className="flex flex-row">
            <img
              className=" h-10 mr-2"
              src="/assets/team-example-image.svg"
              alt=""
            />
            <img
              className=" h-10"
              src="/assets/Pachimari_Gold_Logo.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
