import React from "react";
import {Outlet} from "react-router";
import {Fragment, useContext} from "react";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import './navigation.styles.scss';
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import {Link} from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../contexts/cart.context";

const Navigation = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const signOutHandler = async () => {
        const response = await signOutUser();
        setCurrentUser(response)
    }
    const {isCartOpen} = useContext(CartContext);
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrownLogo className='logo'>logo</CrownLogo>
                </Link>
                <div className="nav-links-container">
                    <Link className='nav-link' to='/shop'>
                        Shop
                    </Link>
                    {
                        currentUser ?
                            <span className='nav-link' onClick={signOutHandler}>Sign Out</span> :
                            (<Link className='nav-link' to='/auth'>
                                Sign In
                            </Link>)
                    }
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <Outlet/>
        </Fragment>)
}

export default Navigation;
