import React, { useEffect, useState } from 'react'

function Game() {

    const [keywordIndex, setKeywordIndex] = useState(-1);
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [gameOver, setGameOver] = useState(false);
    const [start, setStart] = useState(true);

    function Game(){

        setGameOver(false);
        setStart(false);
        setSecondsLeft(60);
        setScore(0);

        const interval = setInterval(() => {
            setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
        }, 60000)

        const intervalTwo = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * 9);
            setKeywordIndex(randomIndex);
        }, 1000);

        setTimeout(() => {
            clearInterval(intervalTwo);
        }, 60000)
    }

    useEffect(() => {
        if (secondsLeft === 0) {
            setGameOver(true);
        }
    }, [secondsLeft]);

    const handleClick = (index) => {
        if (index === keywordIndex) {
            setScore((prevScore) => prevScore + 5);
        } else {
            setMisses((prevMisses) => prevMisses + 1);
            setScore((prevScore) => prevScore - 2.5);
        }
    };

    const resetGame = ()=>{
        Game();
    }

    return (
        <div className='container' style={{ marginTop: "30px" }}>
            <div className='row'>
                <div className='col-md-4'>

                </div>
                <div className='col-md-4'>
                    <div class="card">
                        <div class="card-body">
                            <div className="scoreboard center">
                                <span> 00:{secondsLeft <= 9 ? <span style={{ color: "red" }}>{"0" + secondsLeft}</span> : <span>{secondsLeft}</span>}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col-md-2'>

                </div>
                <div className='col-md-2'>
                    <button className='btn btn-success' style={{ fontSize: "large" }}><i class="fa-regular fa-clipboard me-2"></i>SCORE : {score}</button><br />
                    <button className='btn btn-danger mt-3' style={{ fontSize: "large" }}><i class="fa-solid fa-circle-exclamation me-2"></i>MISSES : {misses}</button>
                </div>
                <div className='col-md-8'>
                    <div class="card">
                        <div class="card-body center">
                            {
                                start ?
                                    <button className='btn btn-primary' onClick={Game}><i class="fa-solid fa-play me-2"></i>START GAME</button>
                                :
                                gameOver ? <div className="game-over">
                                    <h2>Game Over</h2>
                                    <div className='btn btn-secondary mb-2'>Final Score : {score}</div><br/>
                                    <button className='btn btn-info' onClick={resetGame}><i class="fa-solid fa-rotate me-2"></i>RESET GAME</button>
                                </div>
                                    :
                                    <div className='row' style={{ height: "450px", width: "450px" }}>
                                        {[...Array(9)].map((_, index) => (
                                            <div className='col-md-4 innerSquares square center' style={{ backgroundColor: "grey" }} onClick={() => handleClick(index)}>
                                                <div style={{ display: `${keywordIndex === index ? "block" : "none"}`, cursor: "pointer", color: "white" }}
                                                >HIT</div>
                                            </div>
                                        ))}
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game