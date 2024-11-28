"use client"

import React, { useEffect, useState } from 'react';
import './../styles/components/_sets.scss';
import Card from './Card';
import ICard from '../interfaces/ICard';
import sushiApi from './../services/sushiApi';

interface SetsProps {
  titleMain: string;
  cards: ICard[];
}

const Sets: React.FC<SetsProps> = ({ titleMain }) => {

  const [sets, setSets] = useState<ICard[]>([]); // Карточки на одной странице
  const [errorSets, setErrorSets] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchdata = async () => {
    try {
      const data = await sushiApi.getSushiSets(currentPage, 5);
      setSets((prev) => [...prev, ...data]);
    } catch (error) {
      setErrorSets(String(error));
      throw error;
    }
  };

  useEffect(() => {
    fetchdata();
  }, [currentPage]);
  
  return (
    <>
        <div className="section">
            <div className="wrapper">
                <div className="sets">
                    <h2 className='sets__title'><b>{titleMain}</b></h2>
                    {errorSets ? // Проверка на ошибки запроса fetchSets()
                    <h3>{errorSets.toString()}</h3>
                        :
                    <div className="sets__container">
                        {sets.map((set) => (
                            <Card key={set.id} card={set}/>
                        ))}
                    </div>
                    }
                </div>
            </div>
        </div>
    </>
  );
}

export default Sets;
