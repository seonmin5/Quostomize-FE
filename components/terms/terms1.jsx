import React from 'react';
import RadioButton from '../button/radioButton';

const Terms1 = ({ setAccepted }) => {
  return (
    <>
      <section>
        <h2>제1조 (목적)</h2>
        <p>이 약관은 회사가 제공하는 서비스 이용에 관한 기본적인 사항을 규정함을 목적으로 합니다.</p>
      </section>
      <br />
      <section>
        <h2>제2조 (용어 정의)</h2>
        <p>이 약관에서 사용하는 주요 용어의 정의는 다음과 같습니다.</p>
        <ul>
          <li>서비스: 회사가 제공하는 모든 서비스</li>
          <li>회원: 회사의 서비스에 접속하여 이 약관에 따라 회사와 이용 계약을 체결한 개인 또는 법인</li>
          <li>아이디: 회원의 식별과 서비스 이용을 위해 회원이 설정하고 회사가 승인한 문자 또는 숫자의 조합</li>
          <li>비밀번호: 회원의 아이디와 일치하는 회원임을 확인하고 회원의 정보 보호를 위해 회원이 설정한 문자 또는 숫자의 조합</li>
        </ul>
      </section>
      <br />
      <section>
        <h2>제3조 (약관의 효력 및 변경)</h2>
        <ul>
          <li>이 약관은 회원이 동의한 후 회사가 제공하는 서비스 화면에 공지함으로써 효력이 발생합니다.</li>
          <li>회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 공지 후 효력이 발생합니다.</li>
          <li>회원은 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li>
        </ul>
      </section>
      <br />
      <section>
        <h2>제4조 (이용 계약의 체결)</h2>
        <ul>
          <li>이용 계약은 회원이 되고자 하는 자가 약관에 동의하고 이용 신청을 한 후 회사가 이를 승낙함으로써 성립합니다.</li>
          <li>회사는 다음 각 호에 해당하는 신청에 대해서는 승낙하지 않을 수 있습니다.
            <ul>
              <li>타인의 명의를 이용하거나 허위 정보를 제공한 경우</li>
              <li>법령 위반 또는 공공질서와 미풍양속에 반하는 경우</li>
            </ul>
          </li>
        </ul>
      </section>
      <RadioButton index={0} setAccepted={setAccepted} />
    </>
  )
}
export default Terms1;