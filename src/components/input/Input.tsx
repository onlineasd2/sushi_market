import React from "react";
import styles from "./styles.module.scss";

interface Props {
    required?: boolean;
    title?: string;
    placeholder?: string;
    longText?: boolean;
    onChange?: (e: string) => void;
    value?: string;
}

export const Input = ({
    title,
    placeholder,
    required = false,
    longText = false,
    onChange,
    value,
}: Props) => {
    const handleChangeInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={styles.content}>
            {!longText ? (
                <>
                    <p className={styles.title}>
                        {title}
                        {required && " *"}
                    </p>

                    <input
                        onChange={handleChangeInput}
                        className={styles.input}
                        type="text"
                        placeholder={placeholder}
                        value={value}
                    />
                </>
            ) : (
                <textarea
                    onChange={handleChangeInput}
                    className={styles.textarea}
                    placeholder={placeholder}
                    value={value}
                />
            )}
        </div>
    );
};
