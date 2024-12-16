import React from "react";
import "./styles.scss";

type WrappedButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
};

export const withButton = (
    WrappedButton: React.ComponentType<WrappedButtonProps>
) => {
    // eslint-disable-next-line react/display-name
    return ({ ...props }: WrappedButtonProps) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <WrappedButton {...props} />;
    };
};
