import React, { useEffect, useState } from 'react'

function Square() {

    const [keywordIndex, setKeywordIndex] = useState(-1);
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(10);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
        }, 10000)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (secondsLeft === 0) {
            setGameOver(true);
        }
    }, [secondsLeft]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * 9);
            setKeywordIndex(randomIndex);
            if (keywordIndex === randomIndex) {
                setMisses((prevMisses) => prevMisses + 1);
                setKeywordIndex(-1);
            }
        }, 2000);

        setTimeout(() => {
            clearInterval(interval);
        }, 10000)

    }, []);

    const handleClick = (index) => {
        if (index === keywordIndex) {
            setScore((prevScore) => prevScore + 5);
        } else {
            setMisses((prevMisses) => prevMisses + 1);
            setScore((prevScore) => prevScore - 2.5);
        }
    };

    return (
        <div className='container '>
            <div className='row' >
                <div className='col-md-3'>
                    <div className="scoreboard">
                        <div>Score: {score}</div>
                        <div>Misses: {misses}</div>
                        <div>Time Left: {secondsLeft} seconds</div>
                    </div>

                </div>
                <div className='col-md-6 square' style={{ height: "600px", width: "600px" }}>
                    <div className='row'>
                        {[...Array(9)].map((_, index) => (
                            <div className='col-md-4 innerSquares square center' onClick={() => handleClick(index)}>
                                <div style={{ display: `${keywordIndex === index ? "block" : "none"}`, cursor: "pointer" }}
                                >HIT</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {gameOver && (
                <div className="game-over">
                    <h2>Game Over</h2>
                    <div>Final Score: {score}</div>
                </div>
            )}
        </div>
    )
}

export default Square