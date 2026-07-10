import {NavLink, Outlet} from 'react-router-dom'

export default function RootLayout() {

    return(
        <>
            <nav>
                <NavLink to="/">홈</NavLink>
                &nbsp;&nbsp; || &nbsp;&nbsp;
                
                <NavLink to="/test1">Test1</NavLink>
                &nbsp;&nbsp; || &nbsp;&nbsp;
                
                <NavLink to="/test2">Test2</NavLink>
                &nbsp;&nbsp; || &nbsp;&nbsp;
                
                <NavLink to="/test3">Test3</NavLink>
                &nbsp;&nbsp; || &nbsp;&nbsp;
                    
                

            </nav>

            <Outlet />
        </>
    )
}