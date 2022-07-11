import { Header } from "~/components/Header";

export default function Index() {
  return (
    <div className="bg-hero-tracer min-h-screen">
      <Header />
      <main className="container mx-auto">
        <p className=" text-special-orange">Hello world</p>
      </main>
    </div>
  );
}
