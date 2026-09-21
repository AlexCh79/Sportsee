import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Context from "../../context/Context";
import { useContext } from "react";

function Layout() {

    const {user} = useContext(Context)

    if(!user) {
        return (
            <>
                <Outlet />
            </>
        )
    }

    return (
        <>
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout