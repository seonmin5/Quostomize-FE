'use client'

import Image from "Next/image"
import { useEffect, useState } from "react";

const FavoritePage = () => {
  const [wishInfo, setWishInfo] = useState([]); // 조회한 위쉬 정보를 저장
  const [dragging, setDragging] = useState(null); // 드래깅 상태여부 값
  const [dragOverIndex, setDragOverIndex] = useState(null); // 드래깅 된 위치확인 값

  const params = new URLSearchParams();
  const params2 = new URLSearchParams();

  useEffect(() => {
    searchWishStocks();
  }, [])

  // 백엔드에서 GET 위시리스트 조회시, 위시리스트의 priority, stockName, stockPresentPrice, stockImage 를 갖고온다.
  const searchWishStocks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/stocks/select", {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('값이 조회되지 않았습니다.');
      }
      const data = await response.json(); // 응답을 JSON으로 파싱
      setWishInfo(data);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  }

  // editwish - 위시리스트의 우선순위를 변경합니다.
  const editWishStocks = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/stocks/select/change-rank?
        ${params.toString()}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('값이 조회되지 않았습니다.');
      }
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
    location.reload();
  }


  // deleteWish - 위시리스트를 삭제합니다.
  const deleteWish = async (e, index) => {
    e.preventDefault();
    params2.append('order', index);
    try {
      const response = await fetch(`http://localhost:8080/api/stocks/select?
        ${params2.toString()}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('값이 조회되지 않았습니다.');
      }
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
    location.reload();
  }

  // 마우스를 클릭에서 끌어 옮기기 시작
  const handleDragStart = (e, index) => {
    setDragging(index); // 내가 드래깅하려고 처음 누른 위치의 인덱스
    e.dataTransfer.effectAllowed = "move"; // 드래깅한 컨테이너를 움직일 수 있게함
  };

  // 이동 컨테이너(가까이 커서를 두면 색깔이 변하는 컨테이너)에 입장.
  const handleDragEnter = (e, index) => {
    e.preventDefault();
    if (dragging === null || dragging === index) return; // 드래그 된 위치의 index가 기존 index값과 같거나, 드래그 값이 null 인 경우 해당 함수는 여기서 끝
    setDragOverIndex(index); // 드래깅하려는 위치에 값을 등록함
  };

  // 마우스 클릭을 끝냈을 떄,
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverIndex(null); // 마우스 클릭이 끝나면 위치값을 초기화
  };

  // 최종적으로 마우스 클릭이 끝났을 경우,
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const draggedItemIndex = dragging; // 드래깅 시작한 인덱스값을 draggedItemIndex에 넣는다
    if (draggedItemIndex === null) return; // 만약 드래깅 시작값이 없으면 그대로 끝;

    const wishList = wishInfo; // 데이터베이스에서 갖고온 데이터를 wishList에 넣는다
    const draggedItem = wishList[draggedItemIndex]; // wishList에서 드래깅을 시작한 인덱스의 값을 draggedItem으로 값을 넣는다

    // Remove the dragged item
    wishList.splice(draggedItemIndex, 1); // 드래깅을 시작한 인덱스에 해당하는 wishList 순번에 값 1개를 삭제한다

    // Calculate the new drop index
    let newDropIndex = dropIndex; // 드랍하려는 인덱스값을 넣는다.
    if (draggedItemIndex < dropIndex) { // 드래깅을 시작한 인덱스가 버리려는 인덱스보다 작다면?
      // Dragging from front to back
      newDropIndex -= 1; // 드랍하려는 인덱스값을 +1 한다 예를 들어 내가 드랍하려는 인데스가 2라면 ->3번쨰 (index:2)를 삭제해야하므로, +1을 한다
    }

    // Insert the dragged item at the new position
    wishList.splice(newDropIndex, 1, draggedItem); // 드랍하려는 인덱스 위치에 1개의 값을 삭제하고 draggedItem 인덱스에 위치한 값을 넣는다.

    params.append('order', draggedItemIndex);
    editWishStocks();
    setDragging(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragOverIndex(null);
  };

  return (
    <>
      <ul className="my-7">
        {wishInfo.map((wishStock, index) => (
          <div
            key={wishStock.priority}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            draggable
            className={dragging === index ? "opacity-100" : ""}
          >
            <div>
              <div className="flex cursor-grab">
                <Image src={wishStock.stockImage} width={50} height={30} alt="주식이미지"></Image>
                <p className="priority">{wishStock.priority}위 .</p>
                <p className="price"> 이름: {wishStock.stockName}</p>
                <p className="name">. {wishStock.stockPresentPrice}원 </p>
                <button onClick={(e) => deleteWish(e, index)}>버튼</button>
              </div>
              <div
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, index + 1)}
                className={`h-2 my-3 ${dragOverIndex === index ? "bg-slate-800" : "transparent"
                  }`} />
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}
export default FavoritePage;