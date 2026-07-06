
function Ex2({lists}) {

    return(
        <>
            {<h2> 상품명: {lists.name} </h2>}
            {<h2> 가격: {lists.price} </h2>}
            {<img src={lists.href}/>}
            {lists.inStock ? (<h2>재고 있음</h2>) : (<h2>품절</h2>)}
            <br />
        </>
    );
}

export default Ex2;