import styles from "./styles.module.scss";

interface CartWrapperProps {
    children: React.ReactNode;
}

export const CartWrapper: React.FC<CartWrapperProps> = ({ children }) => {
    return (
        <div className={styles.cart}>
            <div className={styles.content}>{children}</div>
        </div>
    );
};
