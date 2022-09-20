interface PrimaryInterface {
  children: any;
  className?: string;
  onClick?: () => void;
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
      className={`
                  w-fit cursor-pointer rounded-[4px]
                  bg-special-blue-light 
                  py-2 font-big-noodle-oblique text-white ${
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
      className={`btn-orange-default mx-auto w-fit rounded-[4px] text-white ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
}

Button.Primary = Primary;
