// export default function CommonContext() {
//     return (
//         <>
        
//         </>
//     )
// }

import { createContext, useState } from "react";

export const CommonContext = createContext(null);   // 공유 데이터 저장소 만들기

export default function CommonContextProvider({ children }) {

    const [appData, setAppData] = useState({
        count: 0,
        name: "Sam",
        work: "setDo"
    })

    return (
        <CommonContext.Provider value={ {appData, setAppData} }>
            {children}
        </CommonContext.Provider>
    )
}