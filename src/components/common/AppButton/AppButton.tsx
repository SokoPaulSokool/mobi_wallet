import React from "react";
import "./AppButton.scss";

interface AppButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick?: Function;
  className?: String;
}

export const AppButton: React.FC<AppButtonProps> = ({
  text,
  onClick,
  className,
  type,
}: AppButtonProps) => {
  return (
    <button
      className={"app-button " + className}
      type={type ? type : "button"}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {text}
    </button>
  );
};

export default AppButton;
