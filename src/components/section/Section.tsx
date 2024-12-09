import "./styles.scss";
import React, { ReactNode } from "react";

interface CategoryProps {
    children: ReactNode; // Тип для children
}

export const Section: React.FC<CategoryProps> = ({ children }) => (
    <div className="section">
        <div className="wrapper">{children}</div>
    </div>
);
