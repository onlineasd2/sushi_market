import "./styles.scss";
import React, { ReactNode } from "react";

interface CategoryProps {
    children: ReactNode;
}

export const SectionFooter: React.FC<CategoryProps> = ({ children }) => (
    <div className="section section-footer">
        <div className="wrapper footer">{children}</div>
    </div>
);
