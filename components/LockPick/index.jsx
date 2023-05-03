import Image from 'next/image';
import { useState, useEffect } from 'react';

const LockPick = ({
    setIsVisible,
    handleKeyPress,
    setPercent,
    isVisible = true,
    top = 70,
    left = 50,
    height = 175,
    width = 175
}) => {

    const [isAnimationStarted, setIsAnimationStarted] = useState(false);
    const [animationDegree, setAnimationDegree] = useState(0);

    const [degYellow, setDegYellow] = useState(180);
    const [degRed, setDegRed] = useState(180);


    useEffect(() => {
        const lockPickFailAudio = new Audio("lockpick_fail.wav")
        const lockPickSuccessAudio = new Audio("lockpick_success.wav")
        const lockPickStartAudio = new Audio("lockpick_start.wav")
        const lockPickInProgressAudio = new Audio("lockpick_inprogress.wav")

        lockPickFailAudio.preload = 'auto'
        lockPickSuccessAudio.preload = 'auto'
        lockPickStartAudio.preload = 'auto'
        lockPickInProgressAudio.preload = 'auto'

        if (isVisible && !isAnimationStarted) {
            // random number between 180 and 360
            const LOWER_LIMIT = 120
            const HIGHER_LIMIT = 240

            const randomDegreeYellow = Math.floor(Math.random() * (HIGHER_LIMIT - LOWER_LIMIT + 1) + LOWER_LIMIT);
            setDegYellow(randomDegreeYellow);
            let startYellow = randomDegreeYellow - 33.3;
            let endYellow = randomDegreeYellow + 33.3;
            let lowerLimitRed = startYellow + 6;
            let higherLimitRed = endYellow - 6;
            const randomDegreeRed = Math.floor(Math.random() * (higherLimitRed - lowerLimitRed + 1) + lowerLimitRed);
            setDegRed(randomDegreeRed);
            setIsAnimationStarted(true);
            lockPickStartAudio.play()
        }
        const handlePress = (event) => {
            if (event.key === ' ' && isAnimationStarted) {

                let startYellow = degYellow - 33.3;
                let endYellow = degYellow + 33.3;
                let startRed = degRed - 7.5;
                let endRed = degRed + 7.5;

                if (-1 * animationDegree >= startRed && -1 * animationDegree <= endRed) {
                    lockPickSuccessAudio.play()
                    handleKeyPress({ key: 'f' }, "RED")
                } else if (-1 * animationDegree >= startYellow && -1 * animationDegree <= endYellow) {
                    lockPickSuccessAudio.play()
                    handleKeyPress({ key: 'f' }, "YELLOW")
                } else {
                    lockPickFailAudio.play()
                    handleKeyPress({ key: 'f' }, "FAIL")
                }
                setAnimationDegree(0);
                setIsAnimationStarted(false);
                setIsVisible(false);
            }

        }

        window.addEventListener('keypress', handlePress);
        return () => {
            window.removeEventListener('keypress', handlePress);
        }

    }, [isVisible, isAnimationStarted, animationDegree, degYellow, degRed]);


    useEffect(() => {
        const lockPickFailAudio = new Audio("lockpick_fail.wav")

        if (isAnimationStarted) {
            let i = 0
            const interval = setInterval(() => {
                if (i <= -360) {
                    lockPickFailAudio.play()

                    clearInterval(interval);
                    setIsVisible(false)
                    setIsAnimationStarted(false);
                    setAnimationDegree(0);
                    handleKeyPress({ key: 'f' }, "FAIL")
                } else {
                    i = i % 360 - 4
                    setAnimationDegree(i);
                }
            }, 10);
            return () => clearInterval(interval);
        }
    }, [isAnimationStarted]);


    // if (!isVisible) {
    //     return null;
    // }

    return (

        <div style={{
            position: 'absolute',
            width: `${width}px`,
            height: `${height}px`,
            top: `${top}%`,
            left: `${left}%`,
            transform: 'translate(-50%, -50%)',
            visibility: isVisible ? 'visible' : 'hidden',
        }}>
            <Image
                key={Math.random()}
                src={"/circle.png"}
                alt="Circle"
                width={width}
                height={height}
                style={{
                    position: 'absolute',
                    top: `${top}%`,
                    left: `${left}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            />
            <Image
                key={Math.random()}
                src={"/line.png"}
                alt="Line"
                width={width}
                height={height}
                style={{
                    position: 'absolute',
                    top: `${top}%`,
                    left: `${left}%`,
                    transform: `translate(-50%, -50%) rotate(${animationDegree}deg)`,
                    animationPlayState: isAnimationStarted ? "running" : "paused",
                    zIndex: 9999,
                }}
            />
            {/* 66.6 degress */}
            <Image
                key={Math.random()}
                src={"/yellowzone.png"}
                alt="Yellow Zone"
                width={width}
                height={height}
                style={{
                    position: 'absolute',
                    top: `${top}%`,
                    left: `${left}%`,
                    transform: `translate(-50%, -50%) rotate(-${degYellow}deg)`,
                }}

            />

            {/* 15 degrees */}
            <Image
                key={"redzone"}
                src={"/redzone.png"}
                alt="Red Zone"
                width={width + 5}
                height={height + 5}
                style={{
                    position: 'absolute',
                    top: `${top}%`,
                    left: `${left}%`,
                    transform: `translate(-50%, -50%) rotate(-${degRed}deg)`,
                }}
            />

        </div>
    );
}

export default LockPick;    