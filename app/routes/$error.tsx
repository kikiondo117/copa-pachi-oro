import { Header } from "~/components";

export default function Error() {
  return (
    <div className="relative h-screen">
      <Header />
      <div className="pt-14">
        <img
          className="absolute  top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform"
          src="/assets/img/error.svg"
          alt=""
        />
        <img className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40" src="/assets/img/graffiti.svg" alt="" />
      </div>
    </div>
  );
}
