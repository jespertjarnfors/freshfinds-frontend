import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'

import Verification from '../components/Register/Verification'

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/verification" element={<Verification />} />
            <Route path='/login' element={<Login></Login>}></Route>

            <Route path='*' element={<Home></Home>}></Route>
        </Routes>
    )
}