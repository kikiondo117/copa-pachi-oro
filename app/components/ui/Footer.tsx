export function Footer() {
  return (
    <div className="flex h-28 w-full justify-between bg-special-blue ">
      <div className="mx-auto flex w-laptop items-center justify-between text-white ">
        <div className="flex h-16 items-center ">
          <img src="/assets/juanyut.svg" alt="" />
          <p className=" ml-4 w-56 font-coolveltica text-[1.375rem] text-gray-500">
            pachiretas.com © 2021, 2022 JuanYut
          </p>
        </div>

        <ul className="flex items-center">
          <li className="ml-7 ">
            <a
              href="https://github.com/JuanYut"
              rel="noreferrer"
              target="_blank"
            >
              <img src="/assets/social/gb.svg" alt="Github" />
              {/* hover:bg-slate-700 */}
            </a>
          </li>
          <li className="ml-7">
            <a
              href="https://www.twitch.tv/juanyut"
              rel="noreferrer"
              target="_blank"
            >
              <img src="/assets/social/tw.svg" alt="Tiwtch" />
            </a>{" "}
            {/* hover:bg-violet-700 */}
          </li>
          <li className="ml-7 ">
            <a
              href="https://www.instagram.com/juanyut.gg/"
              rel="noreferrer"
              target="_blank"
            >
              <img src="/assets/social/in.svg" alt="Instagram" />
            </a>
            {/* hover:bg-red-300 */}
          </li>
          <li className="ml-7 ">
            {/* hover:bg-sky-500 */}
            <a
              href="https://www.facebook.com/juanyut.ow"
              rel="noreferrer"
              target="_blank"
            >
              <img src="/assets/social/fb.svg" alt="Facebook" />
            </a>
          </li>
          <li className="ml-7 ">
            {/* hover:bg-red-600 */}
            <a
              href="https://www.youtube.com/channel/UC-vIB7U6ngwL4Oewmrq9MCA/featured"
              rel="noreferrer"
              target="_blank"
            >
              <img src="/assets/social/yt.svg" alt="YouTube" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
