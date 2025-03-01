'use client';

import React, { useState, useEffect } from 'react';

const SecondAuthModal = ({ isOpen, onClose, onComplete, isConfirm }) => {

    const [authCode, setAuthCode] = useState("");
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const MAX_LENGTH = 6;

    useEffect(() => {
        shuffleNumbers();

    }, []);

    useEffect(() => {
        if (isOpen) {
            setAuthCode("");
        }
    }, [isOpen]);

    useEffect(() => {
        if (authCode.length === MAX_LENGTH) {
            onComplete(authCode);
        }
    }, [authCode]);

    const shuffleNumbers = () => {
        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        setShuffledNumbers(numbers);
    };

    const handleKeyPress = (digit) => {
        if (authCode.length < MAX_LENGTH) {
            const updatedAuthCode = authCode + digit;
            setAuthCode(updatedAuthCode);
        }
    };

    const handleDelete = () => {
        setAuthCode(authCode.slice(0, -1));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 top-0 flex justify-center items-center z-50">
            <div className="bg-[#192436] w-full h-screen flex flex-col items-center">
                <button
                    onClick={onClose}
                    className="self-start text-white mt-4 ml-4"
                >
                    ←
                </button>

                <h3 className="text-white text-lg mt-16 mb-6">
                    {isConfirm}
                </h3>

                <div className="flex justify-center space-x-3 mb-14">
                    {Array(MAX_LENGTH)
                        .fill(0)
                        .map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full ${idx < authCode.length ? 'bg-gray-300' : 'bg-gray-600'
                                    }`}
                            />
                        ))}
                </div>

                <div className="grid grid-cols-3 text-center text-white w-full h-full">
                    {shuffledNumbers.slice(0, 9).map((number) => (
                        <button
                            key={`button-${number}`}
                            onClick={() => handleKeyPress(number)}
                            className="text-xl"
                        >
                            {number}
                        </button>
                    ))}
                    <div key="empty-space" />
                    <button
                        key={`button-${shuffledNumbers[9]}`}
                        onClick={() => handleKeyPress(shuffledNumbers[9])}
                        className="text-2xl"
                    >
                        {shuffledNumbers[9]}
                    </button>
                    <button
                        key="delete-button"
                        onClick={handleDelete}
                        className="text-2xl"
                    >
                        ←
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecondAuthModal;