import React from "react";
import { AddressSuggestions, DaDataAddress } from "react-dadata";
import styles from "./styles.module.scss";

interface Props {
    setValueStreet: (street: string) => void;
    propsValue: string;
    title?: string;
    required?: boolean;
}

const API_KEY_DADATA: string = process.env.NEXT_PUBLIC_API_KEY_DADATA!;

export const InputDaData = ({
    title,
    required,
    setValueStreet,
    propsValue,
}: Props) => {
    return (
        <div className={styles.content}>
            <p className={styles.title}>
                {title}
                {required && " *"}
            </p>
            <AddressSuggestions
                token={API_KEY_DADATA}
                inputProps={{ value: propsValue, className: styles.input }}
                highlightClassName={styles.transparent}
                containerClassName={styles.container}
                suggestionsClassName={styles.suggestions}
                suggestionClassName={styles.suggestionsText}
                currentSuggestionClassName={styles.suggestionsText}
                defaultQuery={propsValue}
                hintClassName={styles.transparent}
                onChange={(suggestion) => {
                    if (suggestion)
                        setValueStreet(suggestion.data.street_with_type ?? "");
                }}
                value={{
                    value: propsValue,
                    unrestricted_value: propsValue,
                    data: {} as DaDataAddress,
                }}
                filterFromBound="street"
                filterToBound="street"
                filterLocations={[{ region: "Москва" }]}
                filterRestrictValue
            />
        </div>
    );
};
