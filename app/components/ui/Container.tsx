interface ContainerProps {
  className?: string;
  children: any;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={` w-laptop-full max-w-laptop-full  md:bg-amber-400 md:max-w-tablet-full sm:bg-lime-700 sm:max-w-mobile-full sm:overflow-hidden  ${
        className ? className : ""
      }`}
    >
      <div className=" h-full mx-auto px-0 grid grid-cols-12 gap-8 w-laptop md:w-tablet sm:w-mobile">
        {children}
      </div>
    </div>
  );
}
