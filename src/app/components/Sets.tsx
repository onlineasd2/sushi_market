import React from 'react'
import './../styles/components/_sets.scss';
import Card from './Card';

const cards: ICard[] = [
  {
    id: 1,
    image: "/sushi-card1.png",
    title: "Product 1",
    description: "This is the first product.",
    weight: 500,
    price: 1500,
  },
  {
    id: 2,
    image: "/sushi-card1.png",
    title: "Product 2",
    description: "This is the second product.",
    weight: 300,
    price: 1200,
  },
  {
    id: 2,
    image: "/sushi-card1.png",
    title: "Product 2",
    description: "This is the second product.",
    weight: 300,
    price: 1200,
  },
  {
    id: 2,
    image: "/sushi-card1.png",
    title: "Product 2",
    description: "This is the second product.",
    weight: 300,
    price: 1200,
  },
  {
    id: 2,
    image: "/sushi-card1.png",
    title: "Product 2",
    description: "This is the second product.",
    weight: 300,
    price: 1200,
  },
  {
    id: 2,
    image: "/sushi-card1.png",
    title: "Product 2",
    description: "This is the second product.",
    weight: 300,
    price: 1200,
  },
];



const Sets: React.FC = () => {
  return (
    <>
        <div className="section">
            <div className="wrapper">
                <div className="sets">
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
