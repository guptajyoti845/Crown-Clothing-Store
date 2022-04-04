import React from "react";
import {Route, Routes} from "react-router";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/Navigation.component";
import Authentication from "./routes/authentication/authentication.component";

const Shop = () => {
    return (<h1>Shopping</h1>)
}
const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path='/shop' element={<Shop/>}/>
                <Route path='/auth' element={<Authentication/>}/>
            </Route>
        </Routes>
    );
}

export default App;
