import * as React from "react";

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
          <div className=" flex flex-row justify-center items-center bg-white w-20 rounded-full">
            <span className=" h-3 w-3 mr-1 rounded-full bg-special-blue-light"></span>
            <span className=" font-coolveltica text-blue-gray-default">
              En curso
            </span>
          </div>
          <span className=" font-coolveltica text-white">Fundillos</span>
        </div>
        <div className="bg-white">
          <img src="/assets/icons/IconTournament.svg" alt="" />
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
          <span className=" text-base">Sgundo Lugar</span>
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
