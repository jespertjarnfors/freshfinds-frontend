import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Products from '../pages/Products'
import ViewCart from '../pages/ViewCart'
import Account from '../pages/Account'
import Map from '../pages/Map'
import VerificationModal from '../components/Register/VerificationModal'
import ProtectedRoute from '../components/ProtectedRoute'

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/verification" element={<VerificationModal />} />
            <Route path='/login' element={<Login />} />
            <Route path='/account' element={<ProtectedRoute component={Account} />} />
            <Route path='/products' element={<ProtectedRoute component={Products} />} />
            <Route path="/cart" element={<ProtectedRoute component={ViewCart} />} />
            <Route path="/map" element={<ProtectedRoute component={Map} />} />

            <Route path='*' element={<Home />} />
        </Routes>
    );
}