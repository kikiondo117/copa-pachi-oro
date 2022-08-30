import type { ReactNode } from "react";
import ReactDOM from "react-dom";

type Props = {
  children: ReactNode;
  modalClassName?: string;
  className?: string;
  onClose: () => void;
};

export function Modal2({
  children,
  modalClassName,
  className,
  onClose,
}: Props) {
  if (typeof window === "undefined") return null;

  const container = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <section className="fixed top-0 z-50 h-screen w-screen ">
      <div
        onClick={onClose}
        className="absolute inset-0 z-20 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div
        className={`relative z-20 m-auto mt-24 ${
          modalClassName ? modalClassName : "h-[32rem] w-[35rem]"
        }`}
      >
        <div
          className={`h-full  rounded-lg bg-special-gray  ${
            className ? className : ""
          }`}
        >
          {children}
        </div>
      </div>
    </section>,
    container
  );
}
