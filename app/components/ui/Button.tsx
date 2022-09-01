interface PrimaryInterface {
  children: any;
  className?: string;
  onClick?: () => null;
  disabled?: boolean;
}

export function Primary({
  children,
  className,
  onClick,
  ...props
}: PrimaryInterface) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={` mb-3 
                  w-fit cursor-pointer rounded-md
                  bg-special-blue-light 
                  p-2 font-big-noodle-oblique text-white ${
                    className ? className : "mx-auto"
                  }`}
    >
      {children}
    </button>
  );
}

export function Button({ children, className, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`btn-orange-default mx-auto w-fit rounded-md text-white ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
}

Button.Primary = Primary;
