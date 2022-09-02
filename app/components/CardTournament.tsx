type CardTournamentProps = {
  className?: string;
};

export function CardTournament(props: CardTournamentProps) {
  return (
    <div
      className={` dashed col-span-4 flex h-[12.8rem] w-full flex-col bg-blue-gray-default p-6
      ${props.className ? props.className : ""} `}
    >
      <div className=" flex h-[50vh] w-full flex-row justify-between">
        <div className="flex flex-col">
          <h3 className=" font-big-noodle-oblique text-2xl text-special-orange">
            Copa Pachi Oro 2022 Edición #01
          </h3>
          <div className=" my-1 flex w-fit flex-row items-center justify-center rounded-full bg-white">
            {/* <span className=" h-3 w-3 mr-1 rounded-full bg-special-blue-light"></span> */}

            <span className="ml-1 flex h-3 w-3">
              <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-special-blue-light opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-special-blue-light"></span>
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
            className=" duration-50 h-5 transition delay-150 ease-in-out hover:scale-110"
            src="/assets/icons/IconTournament-white.svg"
            alt=""
          />
        </div>
      </div>

      <div className="flex h-[50vh] w-full items-end justify-between font-coolveltica text-white">
        <div className="flex flex-col">
          <span className=" text-base">Primer Lugar</span>
          <div className="flex flex-row">
            <img
              className=" mr-2 h-10"
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
              className=" mr-2 h-10"
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
              className=" mr-2 h-10"
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
