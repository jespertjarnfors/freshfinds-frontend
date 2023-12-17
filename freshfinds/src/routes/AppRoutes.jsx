import {Routes, Route} from 'react-router-dom'
import Register from '../components/Register'
import Verification from '../components/Verification'

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/signup" element={<Register />} />
            <Route path="/verification" element={<Verification />} />

            <Route path='*' element={<Register></Register>}></Route>
        </Routes>
    )
}