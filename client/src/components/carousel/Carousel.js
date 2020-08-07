import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooks } from "../../queries/queries";
import BookDetails from "../BookDetails";
import "./carousel.scss";

const Carousel = () => {
  const res = useQuery(getBooks);
  const [x, setX] = useState(0);
  const [id, setId] = useState(null);
  const goLeft = () => {
    x === 0 ? setX(-100 * (arrElements.length - 1)) : setX(x + 100);
    const count=(x/(100)*-1)-1;
    if(x===0){
        Object.keys(arrElements[arrElements.length-1]).map(el=>{
            setId(arrElements[arrElements.length-1][el])
            return arrElements[arrElements.length-1][el]
        })
    }else{
        Object.keys(arrElements[count]).map(el=>{
            setId(arrElements[count][el])
            return arrElements[count][el]
        })
    }
  
  };
  const goRight = () => {
    x === -100 * (arrElements.length - 1) ? setX(0) : setX(x - 100);
    const count=x/(-100)+1;
    if(x===-100 * (arrElements.length - 1)){
        Object.keys(arrElements[0]).map(el=>{
            setId(arrElements[0][el])
            return arrElements[0][el]
        })
    }else{
        Object.keys(arrElements[count]).map(el=>{
            setId(arrElements[count][el])
            return arrElements[count][el]
        })
    }

  };
  if (res.loading) {
    return <h1>loading...</h1>;
  } else if (res.error) {
    return <h1>Oops something went wrong...</h1>;
  }
  const arrElements = res.data.books.map((book) => {
    return Object.assign({},{[book.name]:book.id})
  });

  return (
    <div className="container">
      <div className="slider">
        {arrElements.map((bookName, i) => {
          return (
            <div
              className="slide"
              key={i}
              style={{ transform: `translateX(${x}%)` }}
            >
              {Object.keys(bookName).map((el,i)=>{
                  return el
              })}
            </div>
          );
        })}
        <button id="goLeft" onClick={goLeft}>
          <i class="fas fa-chevron-left fa-5x"></i>
        </button>
        <button id="goRight" onClick={goRight}>
          <i class="fas fa-chevron-right fa-5x"></i>
        </button>
      </div>
      <div id="book-details-container">
        <BookDetails id={id}/>
      </div>
    </div>
  );
};
export default Carousel;
