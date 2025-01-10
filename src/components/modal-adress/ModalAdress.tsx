"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/input/Input";
import { ButtonOrderCancel } from "@/components/buttons/button-order-cancel/ButtonOrderCancel";
import { db, Address } from "@/services/db";
import { InputDaData } from "@/components/input-dadata/Input";
import styles from "./styles.module.scss";

interface ModalAddressProps {
    onChange?: () => void;
}

export const ModalAddress = ({ onChange }: ModalAddressProps) => {
    const [addressState, setAddressState] = useState<Address[]>([]);
    const [street, setStreet] = useState<string>("");

    const isAddressLoaded = async (): Promise<boolean> => {
        return (await db.sticks.get(0)) !== undefined;
    };

    const addAddressDB = async (): Promise<void> => {
        try {
            if (await isAddressLoaded)
                await db.address.add({
                    id: 0,
                    street: "",
                    house: "",
                    structure: "",
                    entrance: "",
                    floor: "",
                    apartment: "",
                    description: "",
                });
        } catch (error) {
            console.error(error);
        }
    };

    const getAddressFromDB = async () => {
        try {
            const res = await db.address.toArray();
            if (res.length === 0) await addAddressDB();
            if (await isAddressLoaded()) setAddressState(res);
        } catch (error) {
            console.error(`Error ${error}`);
        }
    };

    const editAddressToDB = async (address: Address): Promise<void> => {
        try {
            const addressCount = await db.address.count();
            if (addressCount === 0) await addAddressDB();
            if (await isAddressLoaded())
                await db.address.update(address.id, {
                    street: address.street,
                    house: address.house,
                    structure: address.structure,
                    entrance: address.entrance,
                    floor: address.floor,
                    apartment: address.apartment,
                    description: address.description,
                });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeInput = (name: string, value: string): void => {
        setAddressState((prevData) =>
            prevData.map((item, i) =>
                i === 0 ? { ...item, [name]: value } : item
            )
        );
    };

    useEffect(() => {
        addressState.forEach((item) => {
            editAddressToDB(item);
        });
    }, [addressState, street]);

    useEffect(() => {
        getAddressFromDB();
    }, []);

    const handleStreetChange = (street: string) => {
        setStreet(street);
        handleChangeInput("street", street);
    };
    console.log(street);

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
                    propsValue={addressState[0]?.street}
                    setValueStreet={handleStreetChange}
                />
                <Input
                    onChange={(value) => handleChangeInput("house", value)}
                    title="Дом"
                    required
                    value={addressState[0]?.house || ""}
                />
            </div>
            <div className={styles.adressSecondLayer}>
                <Input
                    onChange={(value) => handleChangeInput("structure", value)}
                    title="Строение"
                    value={addressState[0]?.structure || ""}
                />
                <Input
                    onChange={(value) => handleChangeInput("entrance", value)}
                    title="Подъезд"
                    value={addressState[0]?.entrance || ""}
                />
            </div>
            <div className={styles.adressThirdLayer}>
                <Input
                    onChange={(value) => handleChangeInput("floor", value)}
                    title="Этаж"
                    value={addressState[0]?.floor || ""}
                />
                <Input
                    onChange={(value) => handleChangeInput("apartment", value)}
                    title="Квартира/Офис"
                    value={addressState[0]?.apartment || ""}
                />
            </div>
            <Input
                onChange={(value) => handleChangeInput("description", value)}
                placeholder="Укажите код домофона и другую важную информацию для курьера"
                longText
                value={addressState[0]?.description || ""}
            />
        </div>
    );
};
