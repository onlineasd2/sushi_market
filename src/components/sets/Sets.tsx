"use client";

import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Card } from "@/components/card/Card";
import { ICard } from "@/components/sets/ICard";
import { sushiApi } from "@/services/sushiApi";
import { Section } from "@/components/section/Section";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { withButton } from "@/components/buttons/HOC/withButton";
import { ButtonLogin } from "@/components/buttons/button-login/ButtonLogin";

interface SetsProps {
    titleMain: string;
}

export const Sets: React.FC<SetsProps> = ({ titleMain }) => {
    const [sets, setSets] = useState<ICard[]>([]);
    const [errorSets, setErrorSets] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const PAGE_LIMIT = 5;
    const ButtonLoginExtended = withButton(ButtonLogin);

    const fetchSets = async () => {
        try {
            const data = await sushiApi.getSushiSets(currentPage, PAGE_LIMIT);
            setSets((prevSets) => [...prevSets, ...data]);
            console.log(currentPage);
            setIsLoading(false);
        } catch (error) {
            setErrorSets(String(error));
        }
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        fetchSets();
    }, [currentPage]);

    return (
        <Section>
            <div className="sets">
                {errorSets ? (
                    <div className="sets__error">
                        <h2>Ошибка обращения к серверу {errorSets}</h2>
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
                                ? Array(5)
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
                                <ButtonLoginExtended onClick={nextPage}>
                                    Ещё
                                </ButtonLoginExtended>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Section>
    );
};
