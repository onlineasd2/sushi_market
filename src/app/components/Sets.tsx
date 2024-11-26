"use client"

import React, { useEffect, useState } from 'react';
import './../styles/components/_sets.scss';
import Card from './Card';
import ICard from '../interfaces/ICard';
import axios from 'axios'
import test from 'node:test';

interface SetsProps {
  titleMain: string;
  cards: ICard[];
}

const Sets: React.FC<SetsProps> = ({ titleMain }) => {

  const [sets, setSets] = useState<ICard[]>([]); // Карточки на одной странице
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<ICard[]>([]); // Все карточки
  const [fewPage, setFewPage] = useState<ICard[]>([]); // Все карточки
  const testPages:ICard[] = [];
  const limit:number = 3;

  const pageChangeHandler = async (currentPage:number) => {
    setCurrentPage(currentPage);
    console.log("currentPage = " + currentPage);        
  }

  useEffect(() => {  
    const fetchdata = async () => {
      try {
        // Фечим только определенную страницу с лимитом
        const response = await axios.get(`https://671796f7b910c6a6e0290314.mockapi.io/Sets`);
        setTotalPage(response.data);
        console.log("fewPage = " + fewPage);

        const testData = [
          {
            "title": "Куни Ли Лососёвый",
            "weight": 2010,
            "description": "Вот это улов! Добавили в «Куни Ли Легендарный» ещё два ролла с рыбой и получили идеальный морской сет для твоей встречи. Состав: Цезарь темпура, Лава темпура, Цезарь BIG, Филадельфия лайт, Краб терияки, Киото, Яркий лосось, Лосось с тобико",
            "price": 12990,
            "image": "/Sets/2un3vm66ce98fx8xb9edy08adgvp.webp",
            "id": 1
          },
          {
            "title": "Куни Ли NEW",
            "weight": 1535,
            "description": "Цезарь BIG, Дерзкий краб, Лава сяке темпура, Спейшл NEW, Кальмар с тобико и Наглый лосось, Веджи спайс и Краб с огурцом",
            "price": 9990,
            "image": "/Sets/64ndog79lg30yzou12kxpqtshoqk.webp",
            "id": 2
          }
        ]

        setFewPage(prevArray => [...prevArray, testData[0], testData[1]]);

        



        console.log("currentPages = " + fewPage);
        // for (let i = 0; i < totalPage.length; i++) {
        //   testPages.push(totalPage[i]);
        //   console.log(i);
        // }

      } catch (error) {
        console.log(error);
      }
    };
  
    fetchdata();
  }, []);
  


  useEffect(() => {  
    const fetchdata = async () => {
      try {
        // Фечим только определенную страницу с лимитом
        const response = await axios.get(`https://671796f7b910c6a6e0290314.mockapi.io/Sets?page=${currentPage}&limit=${limit}`);
        setSets(response.data);

        console.log(sets);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchdata();
  }, [currentPage]);
  
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
                  <div className="sets__pages">
                    {fewPage.map((page) => (
                      <button onClick={() => pageChangeHandler(page.id)} key={page.id}>{page.id}</button>
                    ))}
                  </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Sets;
