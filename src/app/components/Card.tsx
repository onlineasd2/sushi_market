import React from 'react'
import './../styles/components/_card.scss';
import Button from './Button'
import Image from 'next/image';

export default function Card() {
  return (
    <>
        <div className="card">
            <Image
                src="/sushi-card1.png"
                width={262}
                height={262}
                className='card__image'
                alt="">
            </Image>
            <div className="card__content">
                <div className="card__option">
                    <h4 className='card__title'>Куни Ли Лососёвый</h4>
                    <p className='card__year'>2010 г</p>
                </div>
                <p className='card__description'>Вот это улов! Добавили в «Куни Ли Легендарный» ещё два ролла с рыбой и получили идеальный морской сет для твоей встречи. Состав: Цезарь темпура, Лава темпура, Цезарь BIG, Филадельфия лайт, Краб терияки, Киото, Яркий лосось, Лосось с тобико</p>
                <div className="card__option">
                    <h3 className='card__price'><b>12 990 ₸</b></h3>
                    <Button style='button button__cart-alt'>В Корзину</Button>                
                </div>
            </div>
        </div>
    </>
  )
}
