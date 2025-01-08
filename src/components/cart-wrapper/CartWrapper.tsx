import styles from "@/app/cart/styles.module.scss";

interface CartWrapperProps {
    children: React.ReactNode;
}

export const CartWrapper: React.FC<CartWrapperProps> = ({ children }) => {
    return (
        <div className={styles.cart}>
            <div className={styles.cart__content}>{children}</div>
        </div>
    );
};
