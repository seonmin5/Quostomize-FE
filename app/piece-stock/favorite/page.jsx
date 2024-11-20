'use client'

import { useEffect, useState } from "react";

const FavoritePage = () => {
  const [wishInfo, setWishInfo] = useState([]) // 조회한 위쉬 정보를 저장
  const param = new URLSearchParams() // 조회시 엔드포인트에 첨부할 내용 추가

  // 처음 페이지 진입 시, 조회진행
  useEffect(() => {
    param.append("cardId", cardId)
    searchWishStocks();
  }, [])

  // 백엔드에서 GET 위시리스트 조회시, 위시리스트의 priority, stockName, stockPresentPrice, stockImage 를 갖고온다.
  const searchWishStocks = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/stocks/select?${param}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('값이 조회되지 않았습니다.');
      }
      const data = await response.json(); // 응답을 JSON으로 파싱
      setWishInfo(data.data);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  }


  return (
    <>
      <p>위시리스트 조회</p>
    </>
  )
}
export default FavoritePage;