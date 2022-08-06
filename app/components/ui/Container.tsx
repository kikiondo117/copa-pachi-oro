interface ContainerProps {
  className?: string;
  children: any;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={` 
      w-full 
      max-w-laptop-full 
      md:max-tablet-full 
      sm:max-w-mobile 
    ${className ? className : ""}`}
    >
      <div
        className="
        
      w-laptop h-full mx-auto px-0 grid
      grid-cols-custom-laptop
      md:grid-cols-custom-laptop md:w-tablet
      sm:grid-cols-custom-mobile gap-4 sm:w-mobile
      "
      >
        {children}
      </div>
    </div>
  );
}
