export function Footer() {
  return (
    <div className="h-28 flex justify-between bg-special-blue w-full ">
      <div className="mx-auto w-laptop flex justify-between items-center text-white ">
        <div className="flex h-16 items-center ">
          <img src="/assets/juanyut.svg" alt="" />
          <p className=" ml-4 w-56 text-gray-500">
            pachiretas.com © 2021, 2022 JuanYut
          </p>
        </div>

        <ul className="flex items-center">
          <li className="ml-7">
            <img src="/assets/social/gb.svg" alt="Github" />
          </li>
          <li className="ml-7">
            <img src="/assets/social/tw.svg" alt="Tiwtch" />
          </li>
          <li className="ml-7">
            <img src="/assets/social/in.svg" alt="Instagram" />
          </li>
          <li className="ml-7">
            <img src="/assets/social/fb.svg" alt="Facebook" />
          </li>
          <li className="ml-7">
            <img src="/assets/social/yt.svg" alt="YouTube" />
          </li>
        </ul>
      </div>
    </div>
  );
}
