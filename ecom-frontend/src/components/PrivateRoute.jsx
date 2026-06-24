// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, Outlet, useLocation } from 'react-router-dom';

// const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
//     const { user } = useSelector((state) => state.auth);
//     const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
//     const isSeller = user && user?.roles.includes("ROLE_SELLER");
//     const location = useLocation();

//     if (publicPage) {
//         return user ? <Navigate to="/" /> : <Outlet />
//     }

//     if (adminOnly) {
//         if (isSeller && !isAdmin) {
//             const sellerAllowedPaths = ["/admin/orders", "/admin/products"];
//             const sellerAllowed = sellerAllowedPaths.some(path => 
//                 location.pathname.startsWith(path)
//             );
//             if (!sellerAllowed) {
//                 return <Navigate to="/" replace />
//             }
//         }
//     }

//     if (!isAdmin && !isSeller) {
//         return <Navigate to="/"/>
//     }
    
//     return user ? <Outlet /> : <Navigate to="/login" />;
// }

// export default PrivateRoute




import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
    const { user } = useSelector((state) => state.auth)

    const isAdmin = user?.roles?.includes("ROLE_ADMIN")
    const isSeller = user?.roles?.includes("ROLE_SELLER")

    const location = useLocation()

    // Public pages (login/register)
    if (publicPage) {
        return user ? <Navigate to="/" /> : <Outlet />
    }

    // Any protected route requires login
    if (!user) {
        return <Navigate to="/login" />
    }

    // Only admin/seller routes
    if (adminOnly) {
        if (!isAdmin && !isSeller) {
            return <Navigate to="/" replace />
        }

        if (isSeller && !isAdmin) {
            const sellerAllowedPaths = [
                "/admin/orders",
                "/admin/products"
            ]

            const sellerAllowed = sellerAllowedPaths.some(path =>
                location.pathname.startsWith(path)
            )

            if (!sellerAllowed) {
                return <Navigate to="/" replace />
            }
        }
    }

    return <Outlet />
}

export default PrivateRoute

// Pasted the just above lines of code not most above LOCs because it was not doing checkout for normal users.