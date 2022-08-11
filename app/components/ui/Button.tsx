export function Primary({ children, className, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={` bg-special-blue-light 
                  text-white w-fit mx-auto p-2
                  font-big-noodle-oblique 
                  rounded-md mb-3 cursor-pointer ${className ? className : ""}`}
    >
      {children}
    </button>
  );
}

export function Button({ children, className, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`mx-auto rounded-md w-fit text-white btn-orange-default ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
}

Button.Primary = Primary;
