function Ex1(props) {
    
    const name = props.name;
    const age = props.age;
    const job = props.job
    const isAdmin = props.isAdmin;

    return(
        <>
            
            {<h2>이름: {name}</h2>}
            {<h2>나이: {age}</h2>}
            {<h2>직업: {job}</h2>}
            {isAdmin?  (<h2> 관리자 </h2>) : (<h2> </h2>)} 

        </>
    );
}

export default Ex1;