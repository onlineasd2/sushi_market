import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface CategoryProps {
    children: ReactNode;
}

export const Section: React.FC<CategoryProps> = ({ children }) => (
    <div className={styles.section}>
        <div className={styles.wrapper}>{children}</div>
    </div>
);
