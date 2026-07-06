import Ex2 from "./Ex2"

function Ex2List({pList}) {
    
    return(
        <>
            {
                pList.map((info, idx) => {
                   return <Ex2 key={idx} lists={info}/>
                })
            }
        </>
    );
}

export default Ex2List;