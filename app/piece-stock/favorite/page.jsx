const FavoritePage = () => {


  // delete 요청
  const deleteStocks = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/stocks/select?${param}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('값이 조회되지 않았습니다.');
      }
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  }

  return (
    <div>
      선택종목 페이지
    </div>
  );
}

export default FavoritePage;