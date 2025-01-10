import React from "react";
import { AddressSuggestions, DaDataAddress } from "react-dadata";
import styles from "./styles.module.scss";

interface Props {
    setValueStreet: (street: string) => void;
    propsValue: string;
}

export const InputDaData = ({ setValueStreet, propsValue }: Props) => {
    return (
        <div className={styles.content}>
            <AddressSuggestions
                token="8a19ab7de6ee11d4ef01e0cf68e25b24d2d64775"
                inputProps={{ value: propsValue, className: styles.input }}
                highlightClassName={styles.highlights}
                containerClassName={styles.container}
                suggestionsClassName={styles.suggestions}
                suggestionClassName={styles.suggestionsText}
                currentSuggestionClassName={styles.suggestionsText}
                defaultQuery={propsValue}
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
