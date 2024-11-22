import React from 'react'
import Header from "../../header/prev-name-exit";

function TermsAgreementHeader({ onClick }) {

    return (

        <div>
            <Header
                showArrowButton={true}
                onArrowClick={onClick}
                exitDirection="/home"
            >
                약관 동의
            </Header>
        </div>
    )
}
export default TermsAgreementHeader