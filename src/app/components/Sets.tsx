"use client"

import React, { useEffect, useState } from 'react';
import './../styles/components/_sets.scss';
import Card from './Card';
import ICard from '../interfaces/ICard';
import sushiApi from './../services/sushiApi';

interface SetsProps {
  titleMain: string;
}

const Sets: React.FC<SetsProps> = ({ titleMain }) => {

  const [sets, setSets] = useState<ICard[]>([]); // Карточки на одной странице
  const [errorSets, setErrorSets] = useState('');
  const limit = 5;

  useEffect(() => {  
    const fetchdata = async () => {
      try {
        const data = await sushiApi.getSushiSets(1, limit);
        setSets(data); 
      } catch (error) {
        setErrorSets(String(error));
      }
    };
  
    fetchdata();
  }, []);
  
  return (
    <>
        <div className="section">
            <div className="wrapper">
                <div className="sets">
                  <h2 className='sets__title'><b>{titleMain}</b></h2>
                  <div className="sets__container">
                      {sets.map((set) => (
                        <Card key={set.id} card={set} />
                      ))}
                  </div>
                  <h3>{errorSets ? errorSets.toString() : null}</h3>
                </div>
            </div>
        </div>
    </>
  );
}

export default Sets;
