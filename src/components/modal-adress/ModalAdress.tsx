"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/input/Input";
import { ButtonOrderCancel } from "@/components/buttons/button-order-cancel/ButtonOrderCancel";
import { Address } from "@/services/db";
import { InputDaData } from "@/components/input-dadata/Input";
import { useDatabase } from "@/hooks/useDatabase";
import styles from "./styles.module.scss";

interface ModalAddressProps {
    onChange?: () => void;
}

export const ModalAddress = ({ onChange }: ModalAddressProps) => {
    const [street, setStreet] = useState<string>("");
    const { address, setAddress, getAddressFromDB, editAddressToDB } =
        useDatabase();
    const inputValue: Address = address[0];

    useEffect(() => {
        address.forEach((item) => {
            editAddressToDB(item);
        });
    }, [address, street]);

    useEffect(() => {
        getAddressFromDB();
    }, []);

    const handleChangeInput =
        (name: string) =>
        (value: string): void => {
            setAddress((prevData) =>
                prevData.map((item, i) =>
                    i === 0 ? { ...item, [name]: value } : item
                )
            );
        };

    const handleSuggestionInput = (street: string) => {
        setStreet(street);
        handleChangeInput("street");
    };

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
                <InputDaData
                    title="Улица"
                    propsValue={inputValue?.street || ""}
                    setValueStreet={handleSuggestionInput}
                />
                <Input
                    onChange={handleChangeInput("house")}
                    title="Дом"
                    required
                    value={inputValue?.house || ""}
                />
            </div>
            <div className={styles.adressSecondLayer}>
                <Input
                    onChange={handleChangeInput("structure")}
                    title="Строение"
                    value={inputValue?.structure || ""}
                />
                <Input
                    onChange={handleChangeInput("entrance")}
                    title="Подъезд"
                    value={inputValue?.entrance || ""}
                />
            </div>
            <div className={styles.adressThirdLayer}>
                <Input
                    onChange={handleChangeInput("floor")}
                    title="Этаж"
                    value={inputValue?.floor || ""}
                />
                <Input
                    onChange={handleChangeInput("apartment")}
                    title="Квартира/Офис"
                    value={inputValue?.apartment || ""}
                />
            </div>
            <Input
                onChange={handleChangeInput("description")}
                placeholder="Укажите код домофона и другую важную информацию для курьера"
                longText
                value={inputValue?.description || ""}
            />
        </div>
    );
};
