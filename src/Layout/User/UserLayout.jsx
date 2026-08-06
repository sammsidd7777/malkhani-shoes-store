import React from 'react'
import Header from '../../component/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../component/footer/Footer'

const UserLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default UserLayout
