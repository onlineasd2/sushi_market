import React from 'react'
import './../styles/components/_sets.scss';
import Card from './Card';
import ICard from '../interfaces/ICard';


interface SetsProps {
  titleMain: string;
  cards: ICard[];
}


const Sets: React.FC<SetsProps> = ({ titleMain, cards }) => {
  return (
    <>
        <div className="section">
            <div className="wrapper">
                <div className="sets">
                  <h2 className='sets__title'><b>{titleMain}</b></h2>
                  <div className="sets__container">
                      {cards.map((card) => (
                          <Card key={card.id} card={card} />
                      ))}
                  </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Sets;
