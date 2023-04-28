import { useEffect, useState } from "react";
import LockPick from "../../../components/LockPick"
import ProgressPie from "../../../components/ProgressPie";

const { default: Image } = require("next/image")

const LP = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
  const handleKeyPress = (event) => {
    if (event.key === 'e') {
      setIsVisible(true);
    }
  };

  document.addEventListener('keypress', handleKeyPress);
  }, [])
  return(
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Image 
        key={Math.random()}
        src="/Heavy_Ornate_Chest.png"
        alt="Heavy Ornate Chest"
        width={500}
        height={500}
      />
      <LockPick 
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <ProgressPie progress={50} />  
    </div>
  )
}

export default LP