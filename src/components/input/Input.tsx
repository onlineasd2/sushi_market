import React from "react";
import styles from "./styles.module.scss";

interface Props {
    required?: boolean;
    title?: string;
    placeholder?: string;
    longText?: boolean;
}

export const Input = ({
    title,
    placeholder,
    required = false,
    longText = false,
}: Props) => {
    return (
        <div className={styles.content}>
            {!longText ? (
                <>
                    <p className={styles.title}>
                        {title}
                        {required && " *"}
                    </p>

                    <input
                        className={styles.input}
                        type="text"
                        placeholder={placeholder}
                    />
                </>
            ) : (
                <textarea
                    className={styles.textarea}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};
