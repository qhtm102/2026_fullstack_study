export default function DecreaseBtn ({setCount}) {
    return (
        <>
            <button onClick={() => {
                // setCount((v) => v - 1)
                setCount((prevStateValue) => prevStateValue - 1)
            }}
            >감소</button>
        </>
    )
}