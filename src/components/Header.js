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
        <div className="app-header">
            <a href="http://localhost:1234/">
                <img src={LOGO_URL} width={50} height={50} />
            </a>
            
            <div>
                <ul className="nav-items">
                    <li>
                        <Link className="route-link" to="/">Products</Link>
                    </li>
                    <li>
                        <Link className="route-link" to="/grocery">Grocery</Link>
                    </li>
                    <li>
                        <Link className="route-link" to="/about">About</Link>
                    </li>
                    <li>
                        <Link className="route-link" to="/cart">Cart ({cartItems.length})</Link>
                    </li>
                    <li>
                        <button className="btn-small" onClick={() => {
                            authBtn === 'Login' ? setAuthBtn('Logout') : setAuthBtn('Login')
                        }}>{authBtn}</button>
                    </li>
                    <li>
                        Hello, {loggedInUser}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;