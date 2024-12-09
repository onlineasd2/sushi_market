"use client";

import React, { useCallback, useEffect, useState } from "react";
import "./styles.scss";
import { Card } from "@/components/card/Card";
import { ICard } from "@/components/sets/ICard";
import { sushiApi } from "@/services/sushiApi";
import { Button } from "@/components/button/Button";
import { Section } from "@/components/section/Section";

interface SetsProps {
    titleMain: string;
}

export const Sets: React.FC<SetsProps> = ({ titleMain }) => {
    const [sets, setSets] = useState<ICard[]>([]); // Карточки на одной странице
    const [errorSets, setErrorSets] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_LIMIT = 5;

    // Подгружаем суши
    const fetchSets = useCallback(async () => {
        try {
            const data = await sushiApi.getSushiSets(currentPage, PAGE_LIMIT);
            setSets((prevSets) => [...prevSets, ...data]);
        } catch (error) {
            setErrorSets(String(error));
        }
    }, [currentPage, PAGE_LIMIT]);

    // Функция следущей страницы
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        fetchSets();
    }, [currentPage]);

    return (
        <Section>
            <div className="sets">
                <h2 className="sets__title">
                    <b>{titleMain}</b>
                </h2>
                {errorSets ? ( // Проверка на ошибки запроса fetchSets()
                    <h3>{errorSets.toString()}</h3>
                ) : (
                    <>
                        <div className="sets__container">
                            {sets.map((set) => (
                                <Card key={set.id} card={set} /> // Вывод карточек суш
                            ))}
                        </div>
                        <div className="sets__more">
                            <Button // Кнопка еще
                                onClick={nextPage}
                                className="button button__login"
                            >
                                Ещё
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Section>
    );
};
