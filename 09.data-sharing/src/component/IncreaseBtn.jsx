export default function IncreaseBtn ({setCount}) {
    return (
        <>
            <button onClick={
                ( ) => {
                    setCount((v) => v + 1)
                }
        }>증가</button>
        </>
    )
}