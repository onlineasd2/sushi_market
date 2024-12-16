import React from "react";
import "./styles.scss";

type WrappedButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
};

export const withButton = (
    WrappedButton: React.ComponentType<WrappedButtonProps>
) => {
    return ({ ...props }: WrappedButtonProps) => {
        return <WrappedButton {...props} />;
    };
};
