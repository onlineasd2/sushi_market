import React from 'react'
import './styles.scss';
import Image from 'next/image';
import { ICard } from '@/components/sets/ICard';
import { Button } from '@/components/button/Button';

interface CardProps {
  card: ICard;
}

export const Card: React.FC<CardProps> = ({ card }) => {

    const [src, setSrc] = React.useState(card.image || '/productBlurIcon.png');

  return (
    <>
        <div key={card.id} className="card">
            <Image
                src={src}
                width={262}
                height={262}
                className='card__image'
                alt="Product Image"
                onError={() => setSrc('/productBlurIcon.png')}>
            </Image>
            <div className="card__content">
                <div className="card__option">
                    <h4 className='card__title'><b>{card.title}</b></h4>
                    <p className='card__weight'>{card.weight} г</p>
                </div>
                <p className='card__description'>{card.description}</p>
                <div className="card__option">
                    <h3 className='card__price'><b>{card.price} ₸</b></h3>
                    <Button style='button button__cart-alt'>В Корзину</Button>
                </div>
            </div>
        </div>
    </>
  )
}
