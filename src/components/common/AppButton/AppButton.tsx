import React from "react";
import "./AppButton.scss";

interface AppButtonProps {
  text: String;
  onClick: Function;
  className?: String;
}

export const AppButton: React.FC<AppButtonProps> = ({
  text,
  onClick,
  className,
}: AppButtonProps) => {
  return (
    <button
      className={"app-button " + className}
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </button>
  );
};

export default AppButton;
