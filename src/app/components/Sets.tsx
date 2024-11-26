"use client"

import React, { useEffect, useState } from 'react';
import './../styles/components/_sets.scss';
import Card from './Card';
import ICard from '../interfaces/ICard';
import axios from 'axios'

interface SetsProps {
  titleMain: string;
  cards: ICard[];
}

const Sets: React.FC<SetsProps> = ({ titleMain }) => {

  const [sets, setSets] = useState([]);

  useEffect(() => {
  
    const fetchdata = async () => {
      const response = await axios.get('https://671796f7b910c6a6e0290314.mockapi.io/Sets');
      setSets(response.data);
      console.log(sets);
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
                </div>
            </div>
        </div>
    </>
  );
}

export default Sets;
