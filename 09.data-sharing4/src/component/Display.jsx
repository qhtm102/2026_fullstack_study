import { useCommonStore } from "../store/CommonStore";

export default function Display() {

    const count = useCommonStore( (state) => state.count );
    const name = useCommonStore( (state) => state.name );
    const work = useCommonStore( (state) => state.work );

    return(
        <>
            <div>{ count }</div>
            <div>{ name }</div>
            <div>{ work }</div>
        </>
    )
}