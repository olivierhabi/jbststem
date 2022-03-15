import clsx from "clsx";
import { CSSTransition } from "react-transition-group";

export function ErrorMessage({ message }) {
  return (
    <CSSTransition
      in={Boolean(message)}
      timeout={200}
      classNames="errorDisplay"
    >
      <span className={clsx("block text-xs ml-1 text-red-500", "errorDisplay")}>
        {message}
      </span>
    </CSSTransition>
  );
}
