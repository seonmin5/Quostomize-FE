"use client"

import ChangeBenefitHeader from "../../../components/change-benefits/ChangeBenefitHeader";
import ChangeBenefitBody1 from "../../../components/change-benefits/ChangeBenefitBody1";
import ChangeBenefitBody2 from "../../../components/change-benefits/ChangeBenefitBody2";
import ChangeBenefitBody3 from "../../../components/change-benefits/ChangeBenefitBody3";
import ChangeBenefitFoot from "../../../components/change-benefits/ChangeBenefitFoot";
import { BenefitProvider } from "../../../components/create-card/select-benefit/BenefitContext";
import { useEffect, useState } from "react";

const ChangeBenefitsPage = () => {
  const [benefitData, setBenefitData] = useState(null);
  const [changeableData, setChangeableData] = useState(null);
  const [error, setError] = useState(null);
  const [cardSequenceId, setCardSequenceId] = useState(null);
  const [buttonText, setButtonText] = useState('');
  const [authSuccess, setAuthSuccess] = useState(null);

  const [benefitRate, setBenefitRate] = useState(null);
  const [lowerCategoryId, setLowerCategoryId] = useState(null);
  const [upperCategoryId, setUpperCategoryId] = useState(null);
  const [secondaryAuthCode, setSecondaryAuthCode] = useState("");

  const categoryMap = {
    1: '쇼핑',
    2: '생활',
    3: '푸드',
    4: '여행',
    5: '문화',
  };

  const lowerCategoryMap = {
    100: '백화점(더현대, 신세계, 롯데백화점)',
    101: '온라인쇼핑(무신사, 에이블리, 쿠팡)',
    102: '마트(이마트, 홈플러스)',
    200: '주유소(SK, GS칼텍스)',
    201: '통신(SKT, KT, LGU+)',
    202: '대중교통(버스, 지하철, 택시)',
    300: '편의점(CU, GS25)',
    301: '카페(스타벅스, 투썸플레이스)',
    302: '배달(배달의민족, 쿠팡이츠)',
    400: '항공(인터파크 투어, 네이버 항공)',
    401: '렌트(쏘카, 그린카)',
    402: '숙소(야놀자, 여기어때)',
    500: 'OTT(넷플릭스, 티빙)',
    501: '영화(CGV, 롯데시네마)',
    502: '도서(교보문고, 밀리의서재)',
  };

  const labels = Object.values(categoryMap);

  const getChangerabledate = async (cardSequenceId) => {
    try {
      const response = await fetch(`/api/benefit-change/changerable?cardSequenceId=${cardSequenceId}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-type": "application/json"
          },
          credentials: "include",
        });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responsedata = await response.json();
      setChangeableData(responsedata.data);
      if (responsedata.data && responsedata.data) {

        setButtonText(responsedata.data);
      }
      // console.log(responsedata.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchBenefitData = async () => {
    try {
      const response = await fetch('/api/benefit-change', {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const transformedData = transformBenefitData(data.data);
      setBenefitData(transformedData);
      console.log('Received benefitData:', data.data);
      setCardSequenceId(data.data[0].cardSequenceId);
    } catch (error) {
      setError(error.message);
    }
  };

  const transformBenefitData = (data) => {
    return data.map(item => ({
      ...item,
      benefitRate: item.benefitRate + 1,
    }));
  };

  const prepareBackendPayload = (benefitData) => {
    return benefitData.map(item => ({
      benefitRate: item.benefitRate - 1,  // benefitRate 값에서 1을 뺌
      cardSequenceId: item.cardSequenceId,
      lowerCategoryId: item.lowerCategoryId,
      upperCategoryId: item.upperCategoryId,
    }));
  };

  const prepareFilteredData = (benefitData) => {
    return benefitData.map(({ cardSequenceId, benefitRate, lowerCategoryId, upperCategoryId }) => ({
      cardSequenceId,
      benefitRate,
      lowerCategoryId,
      upperCategoryId,
    }));
  };

  const handleBenefitUpdate = async (actionType) => {
    const filteredData = prepareFilteredData(benefitData);

    const payload = filteredData.map(item => ({
      cardSequenceId: item.cardSequenceId,
      benefitRate: benefitRate !== null ? benefitRate : item.benefitRate,
      lowerCategoryId: lowerCategoryId !== null ? lowerCategoryId : item.lowerCategoryId,
      upperCategoryId: upperCategoryId !== null ? upperCategoryId : item.upperCategoryId,
      secondaryAuthCode,
    }));

    const backendPayload = prepareBackendPayload(payload);

    try {
      const response = await fetch(`/api/benefit-change/${actionType}`,
        {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(backendPayload)
        });



      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '서버 오류 발생');
      }

      const result = await response.json();
      setAuthSuccess(result.authSuccess);

    } catch (error) {
      console.error('Error updating stock status: ', error);
      setError(error.message);
    }
    console.log(filteredData);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBenefitData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (cardSequenceId) {
      getChangerabledate(cardSequenceId);
    }
  }, [cardSequenceId]);

  if (error) {
    return <div>문제가 발생했습니다. 다시 시도해 주세요: {error}</div>
  }

  if (!benefitData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>

      <ChangeBenefitHeader />

      <BenefitProvider benefitData={benefitData}>
        <ChangeBenefitBody1 labels={labels} />
        <ChangeBenefitBody2 labels={labels} categoryMap={categoryMap} lowerCategoryMap={lowerCategoryMap} />
        <ChangeBenefitBody3 labels={labels} lowerCategoryMap={lowerCategoryMap} />
      </BenefitProvider>

      <span className="flex justify-center"> 포인트 혜택은 30일 마다 변경이 가능하며 변경 수수료 1,000 원이 익월 청구됩니다.</span>


      <ChangeBenefitFoot modalTitle="혜택 변경" exitDirection="/my-card" buttonText={buttonText} onChangeBenefit={() => handleBenefitUpdate('change')}
        onReserveBenefit={() => handleBenefitUpdate('reserve')} authSuccess={authSuccess} />

    </div>
  );
}
export default ChangeBenefitsPage;