import { NavLink, Outlet } from 'react-router-dom'
import './app-shell.css'

export default function RootLayout() {
    const navLinkClass = ({ isActive }) =>
        `app-shell__link${isActive ? ' active' : ''}`

    return (
        <div className="app-shell">
            <nav className="app-shell__nav">
                <p className="app-shell__brand">Stock Dashboard</p>

                <ul className="app-shell__links">
                    <li><NavLink to="/" className={navLinkClass} end>홈</NavLink></li>
                    <li><NavLink to="/test1" className={navLinkClass}>ETF 정보 조회</NavLink></li>
                    <li><NavLink to="/test2" className={navLinkClass}>주식 시세 정보</NavLink></li>
                    <li><NavLink to="/test3" className={navLinkClass}>회사 재무 정보</NavLink></li>
                </ul>
            </nav>

            <main className="app-shell__main">
                <Outlet />
            </main>
        </div>
    )
}
