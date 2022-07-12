import { Header } from "~/components/Header";
import { TeamForm } from "~/components/TeamForm";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-hero-tracer min-h-screen mx-auto flex items-center pt-14">
        <div className="container m-auto grid grid-cols-12">
          <h2 className="col-start-1 col-end-7 text-white text-7xl ">
            La comunidad te necesita, únete ahora y compite
          </h2>
          <div className="col-start-8 col-end-12 max-w-sm">
            <div className="bg-form-top h-24 w-auto" />
            <TeamForm />
          </div>
        </div>
      </main>
    </div>
  );
}
