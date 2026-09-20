import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";
import { UserContext } from "../utils/ContextUser";
import { useSelector } from "react-redux";

const Header = () => {
    const [authBtn, setAuthBtn] = useState('Login');
    const { loggedInUser } = useContext(UserContext);

    //subscribe to the store using selector
    const cartItems = useSelector(store => store.cartSlice.cartItems);

    return (
        <div className="flex justify-between align-center">
            <a href="http://localhost:1234/">
                <img src={LOGO_URL} width={50} height={50} />
            </a>
            
            <div>
                <ul className="flex align-center pt-3">
                    <li className="pl-3">
                        <Link className="text-fuchsia-800 hover:text-fuchsia-600" to="/">Products</Link>
                    </li>
                    <li className="pl-3">
                        <Link className="text-fuchsia-800 hover:text-fuchsia-600" to="/grocery">Grocery</Link>
                    </li>
                    <li className="pl-3">
                        <Link className="text-fuchsia-800 hover:text-fuchsia-600" to="/about">About</Link>
                    </li>
                    <li className="pl-3">
                        <Link className="text-fuchsia-800 hover:text-fuchsia-600" to="/cart">Cart ({cartItems.length})</Link>
                    </li>
                    <li className="pl-3">
                        <button className="text-fuchsia-800 hover:text-fuchsia-600 cursor-pointer" onClick={() => {
                            authBtn === 'Login' ? setAuthBtn('Logout') : setAuthBtn('Login')
                        }}>{authBtn}</button>
                    </li>
                    <li className="pl-3">
                        <span className="text-fuchsia-800">Hello, {loggedInUser}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;