import {Outlet} from "react-router";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";

import './navigation.styles.scss';

const Navigation = () => {
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrownLogo className='logo'>logo</CrownLogo>
                </Link>
                <div className="links-container">
                    <Link className='nav-link' to='/shop'>
                        Shop
                    </Link>
                </div>
            </div>
            <Outlet/>
        </Fragment>)
}

export default Navigation;
