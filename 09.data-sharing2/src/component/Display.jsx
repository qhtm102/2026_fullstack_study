import { useContext } from "react"
import {CommonContext}  from "./CommonContext"

export default function Display() {

    // const context = useContext(CommonContext);
    // const appData = context.appData;
    const {appData} = useContext(CommonContext); // commonContext로 관리되는 공유 저장소에 대한 연결을 변수에 저장

    return(
        <>
            <div>{ appData.count }</div>
            <div>{ appData.name }</div>
            <div>{ appData.work }</div>
        </>
    )
}