'use client'

import { useEffect, useState } from "react";

const FavoritePage = () => {



  return (
    <>
      <ul className="my-7 flex flex-col h-full">
        <div className="flex justify-center">
          <h1>
            Stock Invest
          </h1>
        </div>
        <div>
          <button className="flex justify-between w-full">
            <h2>WatchList</h2>
            <span className="material-icons">search</span>
          </button>
        </div>

        <div>
          {wishInfo.map((wishStock, index) => (
            <div className={"flex relative cursor-grab"}
              key={wishStock.stockName}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onClick={(e) => test(index)}>
              <div className={`flex justify-between w-full transform  transition-all duration-500 ease-in-out ${hoveredIndex[index].order === 1 ? '-translate-x-12 opacity-100' : '-translate-x-0 opacity-100'}`}>
                <div className="flex">
                  <div className="flex flex-col h-18 ml-2">
                    <p>{wishStock.priority}</p>
                    <Image src={wishStock.stockImage} width={50} height={50} alt="주식이미지"></Image>
                  </div>
                  <div className="flex h-full items-center ml-5">
                    <p>{wishStock.stockName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p>{wishStock.stockPresentPrice}원</p>
                </div>
              </div>
              <div className="flex items-center ">
                <button
                  className={`absolute right-0 transform  transition-all duration-500 ease-in-out ${hoveredIndex[index].order === 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
                  onClick={() => handleDeleteClick(index)}
                >
                  삭제
                </button>
              </div>
            </div>

          ))}
        </div>
        <div className="flex justify-between">
          <button className="border-2 border-black">종목자동추천</button>
          <button className="border-2 border-black" onClick={switchStock} >저장</button>
        </div>
      </ul>
    </>
  )
}
export default FavoritePage;