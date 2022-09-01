interface ContainerProps {
  className?: string;
  children: any;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={` 
      md:max-tablet-full
      sm:max-w-mobile 
      mx-auto 
      w-full 
      max-w-laptop-full 
    ${className ? className : ""}`}
    >
      <div
        className="
          sm:grid-cols-custom-mobile mx-auto grid h-full w-laptop
          grid-cols-custom-laptop
          content-start gap-4 px-0
          md:w-tablet md:grid-cols-custom-laptop sm:w-mobile
        "
      >
        {children}
      </div>
    </div>
  );
}
