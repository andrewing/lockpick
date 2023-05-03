import { use, useEffect, useState } from "react";
import LockPick from "../../../components/LockPick"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { Text } from "@nextui-org/react";
import Prompt from "../../../components/Prompt";

const { default: Image } = require("next/image")

const LP = () => {
  const [isLockPickVisible, setIsLockPickVisible] = useState(false)
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(false)
  const [percent, setPercent] = useState(0)
  const [isPromptVisible, setIsPromptVisible] = useState(true)
  const [isCancelled, setIsCancelled] = useState(false)


  let i = 0
  const handleKeyPress = (event, lockPickResult) => {
    console.log(event.key)
    if (event.key === 'f') {

      document.removeEventListener('keypress', handleKeyPress);

      if (lockPickResult === "YELLOW") {
        i = percent
      } else if (lockPickResult === "RED") {
        i = 100
      } else if (lockPickResult === "FAIL") {
        i = 100
      }
      setIsProgressBarVisible(true)

      let randomNum = Math.floor(Math.random() * (80 - 50 + 1) + 50)

      if (i > 50) {
        randomNum = -999
      }

      const interval = setInterval(() => {
        if (i === randomNum && lockPickResult !== "YELLOW") {
          setIsLockPickVisible(true)
          clearInterval(interval)
        } else {
          i++
          setPercent(i)
        }
        if (i >= 100) {
          i = 0
          setPercent(0)
          clearInterval(interval)
          setIsProgressBarVisible(false)
          document.addEventListener('keypress', handleKeyPress);
        }
      }, 25)
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    }
  }, [])

  useEffect(() => {
    if (isLockPickVisible || isProgressBarVisible) {
      setIsPromptVisible(false)
    } else {
      setIsPromptVisible(true)
    }
  }, [isLockPickVisible, isProgressBarVisible])

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Prompt
        isVisible={isPromptVisible}
      />
      <Image
        key={Math.random()}
        src="/Heavy_Ornate_Chest.png"
        alt="Heavy Ornate Chest"
        width={500}
        height={500}
      />
      <LockPick
        isVisible={isLockPickVisible}
        setIsVisible={setIsLockPickVisible}
        handleKeyPress={handleKeyPress}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50px',
          height: '50px',
          visibility: isProgressBarVisible ? 'visible' : 'hidden',
        }}
      >
        <CircularProgressbar
          value={percent}
          text={`${percent}%`}
          counterClockwise={true}
          strokeWidth={10}
          background={true}
          styles={{

            root: {},
            path: {
              stroke: `rgb(203, 184, 146)`,
              strokeLinecap: "butt",
              transition: 'stroke-dasharray 0.1s',
            },
            trail: {
              stroke: "#111111",
              strokeLinecap: "butt",
            },
            text: {
              fill: "#fff",
              fontSize: "20 px",
            },
            background: {
              fill: "#222222",
            },

          }}
        />
      </div>
    </div>
  )
}

export default LP