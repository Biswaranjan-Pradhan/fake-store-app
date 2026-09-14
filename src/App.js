import {React, Suspense, lazy} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import Productdetail from "./components/Productdetail";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "./utils/ContextUser";
import Cart from "./components/Cart";
import {Provider} from "react-redux";
import appStore from "./redux/appStore";

const App = () => {
    const { loggedInUser } = useContext(UserContext);
    console.log(loggedInUser);
    return (
        <div className="container">
            <Provider store={appStore}>
            <UserContext.Provider value={ {loggedInUser: "Biswaranjan"} }>
                <Header />
                <div className="router-outlet">
                    <Outlet />
                </div>
            </UserContext.Provider>
            </Provider>
        </div>
    )
}



const Grocery = lazy(() => import('./components/Grocery'));

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/',
                Component: Body
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/product/:prodId',
                Component: Productdetail
            },
            {
                path: '/cart',
                Component: Cart
            },
            {
                path: '/grocery',
                element: <Suspense fallback={(<h1>Loading...</h1>)}><Grocery/></Suspense>
            }
        ],
        errorElement: <Error />
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} /> );