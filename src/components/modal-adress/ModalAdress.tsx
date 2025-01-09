import React from "react";
import { Input } from "@/components/input/Input";
import { ButtonOrderCancel } from "@/components/buttons/button-order-cancel/ButtonOrderCancel";
import styles from "./styles.module.scss";

interface ModalAdressProps {
    onChange?: () => void;
}

export const ModalAdress = ({ onChange }: ModalAdressProps) => {
    return (
        <div className={styles.modal}>
            <ButtonOrderCancel onClick={onChange}>
                Укажите адрес доставки
            </ButtonOrderCancel>
            <div className={styles.city}>
                <h3>Ваш город</h3>
                <h3>Павлодар</h3>
            </div>
            <div className={styles.adressFirstLayer}>
                <Input title="Улица" required />
                <Input title="Дом" required />
            </div>
            <div className={styles.adressSecondLayer}>
                <Input title="Строение" />
                <Input title="Подъезд" />
            </div>
            <div className={styles.adressThirdLayer}>
                <Input title="Этаж" />
                <Input title="Квартира/Офис" />
            </div>
            <Input
                placeholder="Укажите код домофона и другую важную информацию для курьера"
                longText
            />
        </div>
    );
};
