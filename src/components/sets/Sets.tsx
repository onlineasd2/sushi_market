"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/card/Card";
import { sushiApi } from "@/services/sushiApi";
import { Section } from "@/components/section/Section";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ButtonLogin } from "@/components/buttons/button-login/ButtonLogin";
import { Order } from "@/services/db";
import styles from "./styles.module.scss";

interface SetsProps {
    titleMain: string;
}

export const Sets: React.FC<SetsProps> = ({ titleMain }) => {
    const [sets, setSets] = useState<Order[]>([]);
    const [errorSets, setErrorSets] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const PAGE_LIMIT = 5;

    const fetchSets = async () => {
        try {
            const data = await sushiApi.getSushiSets(currentPage, PAGE_LIMIT);
            setSets((prevSets) =>
                currentPage === 1 ? data : [...prevSets, ...data]
            );
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
            <div className={styles.sets}>
                {errorSets ? (
                    <div className={styles.sets__error}>
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
                        <h2 className={styles.sets__title}>
                            <b>{titleMain}</b>
                        </h2>
                        <div className={styles.sets__container}>
                            {isLoading
                                ? Array(5)
                                      .fill(null)
                                      .map((_, index) => (
                                          <div
                                              key={index}
                                              className={styles.skeleton__card}
                                          >
                                              <Skeleton
                                                  width={262}
                                                  height={262}
                                              />
                                              <div
                                                  className={
                                                      styles.skeleton__spaceBetween
                                                  }
                                              >
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
                                              <div
                                                  className={
                                                      styles.skeleton__spaceBetween
                                                  }
                                              >
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
                            <div className={styles.sets__more}>
                                <ButtonLogin onClick={nextPage}>
                                    Ещё
                                </ButtonLogin>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Section>
    );
};
