import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {

    return(
        <>
            <NavLink to="/" >HOME</NavLink>
            &nbsp;&nbsp; || &nbsp;&nbsp;
            <NavLink to="/testpage"> TEST </NavLink>
            &nbsp;&nbsp; || &nbsp;&nbsp;


            <Outlet />
        </>
    )
}