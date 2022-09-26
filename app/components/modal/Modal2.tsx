import type { ReactNode } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
  onClose: () => void;
};

export function Modal2({ children, className, onClose }: Props) {
  if (typeof window === "undefined") return null;

  const container = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <section className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center ">
      <div
        onClick={onClose}
        className="absolute inset-0 z-20 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div
        className={classNames(
          "relative z-20  rounded-lg bg-special-gray",
          { " w-[52rem]": !className },
          className
        )}
      >
        <button onClick={onClose} className=" absolute right-3 top-3">
          <img
            src="/assets/icons/Icon Close.svg"
            className="h-[16px] w-[16px]"
            alt=""
          />
        </button>

        {children}
      </div>
    </section>,
    container
  );
}
