import React from 'react'
import './../styles/components/_category.scss';

export default function Category() {
  return (
    <>
        <div className="category">
            <div className="category__content">
                <div className="category__list">
                    <ul>
                        <li>Наборы</li>
                        <li>Роллы и суши</li>
                        <li>Премиум</li>
                        <li>Темпура</li>
                        <li>Запеченные</li>
                        <li>Горячее и салаты</li>
                        <li>Напитки и десерты</li>
                        <li>Специи</li>
                        <li>Соусы</li>
                    </ul>
                </div>
                <div className="category__delivery">
                    <h4>Доставка и оплата</h4>
                </div>
                <div className="category__language">
                    <h4>RU/KZ</h4>
                </div>
            </div>
        </div>
    </>
  )
}
