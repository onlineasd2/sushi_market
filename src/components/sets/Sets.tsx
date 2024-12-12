"use client";

import React, { useCallback, useEffect, useState } from "react";
import "./styles.scss";
import { Card } from "@/components/card/Card";
import { ICard } from "@/components/sets/ICard";
import { sushiApi } from "@/services/sushiApi";
import { Button } from "@/components/button/Button";
import { Section } from "@/components/section/Section";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SetsProps {
    titleMain: string;
}

export const Sets: React.FC<SetsProps> = ({ titleMain }) => {
    const [sets, setSets] = useState<ICard[]>([]); // Карточки на одной странице
    const [errorSets, setErrorSets] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // Состояние для загрузки
    const PAGE_LIMIT = 5;

    // Подгружаем суши
    const fetchSets = useCallback(async () => {
        try {
            const data = await sushiApi.getSushiSets(currentPage, PAGE_LIMIT);
            setSets((prevSets) => [...prevSets, ...data]);
            setIsLoading(false);
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
                {errorSets ? ( // Проверка на ошибки запроса fetchSets()
                    <div className="sets__error">
                        <h2>Ошибка обращения к серверу</h2>
                        <Image
                            src="/error500.webp"
                            width={100}
                            height={100}
                            alt=""
                        />
                    </div>
                ) : (
                    <>
                        <h2 className="sets__title">
                            <b>{titleMain}</b>
                        </h2>
                        <div className="sets__container">
                            {isLoading
                                ? // Создаем массив с 5 элементами и выводим скелетоны
                                  Array(5)
                                      .fill(null)
                                      .map((_, index) => (
                                          <div
                                              key={index}
                                              className="skeleton__card"
                                          >
                                              <Skeleton
                                                  width={262}
                                                  height={262}
                                              />
                                              <div className="skeleton__space-between">
                                                  <Skeleton
                                                      width={170}
                                                      height={20}
                                                  />
                                                  <Skeleton
                                                      width={60}
                                                      height={20}
                                                  />
                                              </div>
                                              <Skeleton height={100} />
                                              <div className="skeleton__space-between">
                                                  <Skeleton
                                                      width={72}
                                                      height={40}
                                                  />
                                                  <Skeleton
                                                      width={140}
                                                      height={40}
                                                  />
                                              </div>
                                          </div>
                                      ))
                                : sets.map((set) => (
                                      <Card key={set.id} card={set} />
                                  ))}
                        </div>
                        {sets.length > 0 && (
                            <div className="sets__more">
                                <Button // Кнопка еще
                                    onClick={nextPage}
                                    className="button button__login"
                                >
                                    Ещё
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Section>
    );
};
