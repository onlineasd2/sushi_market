import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface CategoryProps {
    children: ReactNode;
}

export const SectionFooter: React.FC<CategoryProps> = ({ children }) => (
    <div className={`${styles.section} ${styles.sectionFooter}`}>
        <div className={`${styles.wrapper} ${styles.footer}`}>{children}</div>
    </div>
);
