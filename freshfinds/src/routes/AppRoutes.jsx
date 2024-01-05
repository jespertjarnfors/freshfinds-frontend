import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Produce from '../pages/Produce'
import ViewCart from '../pages/ViewCart'

import Verification from '../components/Register/Verification'

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/verification" element={<Verification />} />
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/produce' element={<Produce></Produce>}></Route>
            <Route path="/cart" element={<ViewCart />} />

            <Route path='*' element={<Home></Home>}></Route>
        </Routes>
    )
}