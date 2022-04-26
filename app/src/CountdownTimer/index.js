import React, {useEffect, useState } from "react";
import "./CountdownTimer.css";

const CountdownTimer = ({ dropDate }) => {
    const [timerString, setTimerString] = useState("");

    useEffect(() =>{
        console.log("Setting interval...");

        // setIntervalを使用しコードの一部を１秒ごとに実行
        const interval = setInterval(() =>{
            const currentDate = new Date().getTime();
            const distance = dropDate - currentDate;

            // 時間を計算し、プロパティを得る
            const days = Math.floor(distance / (1000 * 60 *60 *24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 *60 * 60)
            );
            const minutes = Math.floor((distance % (1000 *60 *60)) / (1000 *60));
            const seconds = Math.floor((distance % (1000 *60)) / 1000);
            //出力結果を設定
            setTimerString(`${days}d ${hours}h ${minutes}m ${seconds}s`);

            //distanceが０になったらドロップタイムが着たことを示す。
            if(distance < 0){
                console.log("Cleaning interval...");
                clearInterval(interval);
            }
        },1000);

        // コンポーネントが取り外された場合はintervalを初期化
        return() =>{
            if(interval){
                clearInterval(interval);
            }
        };
    },[]);


    return(
        <div class="timer-container">
            <p className="timer-header">Candy Drop Starting In</p>
            {timerString && <p className="timer-value">{`${timerString}`}</p>}
        </div>
    )
}

export default CountdownTimer;