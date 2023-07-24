import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";



export default function App() {
    return (
        <>
            <MainNavigation />
            <Outlet />
        </>
    );
}