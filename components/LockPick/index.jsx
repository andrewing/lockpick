import Image from 'next/image';
import { useState, useEffect } from 'react';

const LockPick = ({
    setIsVisible,
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
        const handleKeyPress = (event) => {
            if (event.key === 'e' && !isAnimationStarted) {
                // random number between 180 and 360
                const randomDegreeYellow = Math.floor(Math.random() * (360 - 180 + 1) + 180);
                setDegYellow(randomDegreeYellow);
                let startYellow = randomDegreeYellow - 33.3;
                let endYellow = randomDegreeYellow + 33.3;
                let lowerLimitRed = startYellow + 6;
                let higherLimitRed = endYellow - 6;
                const randomDegreeRed = Math.floor(Math.random() * (higherLimitRed - lowerLimitRed + 1) + lowerLimitRed);
                setDegRed(randomDegreeRed);


                setIsAnimationStarted(true);
            }

            if (event.key === ' ' && isAnimationStarted) {
                setIsAnimationStarted(false);
                setAnimationDegree(0);
                setIsVisible(false);
            }
        };

        document.addEventListener('keypress', handleKeyPress);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [isAnimationStarted]);

    useEffect(() => {
        if (isAnimationStarted) {
            const interval = setInterval(() => {
                setAnimationDegree((prevDegree) => {
                    if (prevDegree <= -360) {
                        setIsVisible(false)
                        setIsAnimationStarted(false);
                        setAnimationDegree(0);
                        clearInterval(interval);
                    }
                    return prevDegree % 360 - 4
                });
            }, 10);

            return () => clearInterval(interval);
        }
    }, [isAnimationStarted]);


    if (!isVisible) {
        return null;
    }

    return (

        <div style={{
            position: 'absolute',
            width: `${width}px`,
            height: `${height}px`,
            top: `${top}%`,
            left: `${left}%`,
            transform: 'translate(-50%, -50%)',

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