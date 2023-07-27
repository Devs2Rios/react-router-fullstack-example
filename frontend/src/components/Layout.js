import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

export default function App() {
    const navigation = useNavigation();

    return (
        <>
            <MainNavigation />
            <main className={classes.main}>
                {navigation.state === 'loading' && <p>Loading...</p>}
                <Outlet />
            </main>
        </>
    );
}