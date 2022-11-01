import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, layout: Layout, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <Layout>
                    <Component {...props}></Component>
                </Layout>
            )}
        ></Route>
    );
};

export default ProtectedRoute;