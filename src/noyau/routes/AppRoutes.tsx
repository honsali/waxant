import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { selectRole } from '../auth/MdlAuth';
import PageNotFound from './PageNotFound';
import PrivateRoute from './PrivateRoute';

const AppRoutes = ({ config, children }) => {
    const role = useSelector(selectRole);

    const [routes, setRoutes] = useState(null);
    useEffect(() => {
        if (role) {
            const a = config.mapDomaine[role].routes;
            setRoutes(a);
        }
    }, [role]);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<PrivateRoute>{children}</PrivateRoute>}>
                    {routes?.map((r) => r)}
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default AppRoutes;
