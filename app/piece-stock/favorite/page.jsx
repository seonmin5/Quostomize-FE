'use client'

const FavoritePage = () => {

  // 순서 변경 값
  const orderInfo = [{
    currentOrder: 1, // 현재 위치값
    editOrder: 2 // 변경 위치값
  }]

  const switchStock = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/stocks/select/change-rank", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
        },
        body: JSON.stringify(orderInfo),
      });
      console.log(orderInfo)
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  }
  return (
    <>
      <p>저장 요청</p>
    </>
  );
}
export default FavoritePage;