const Prompt = ({
    isVisible,
}) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: `50%`,
                left: `50%`,
                transform: 'translate(-50%, -50%)',
                visibility: isVisible ? 'visible' : 'hidden',
            }}    
        >
            <p>Heavy Ornate Chest</p>
            <p>{")F( Open"}</p>
        </div>
    )
}

export default Prompt;