import ProtectedRoute from "./ProtectedRoute";
import { Switch } from 'react-router-dom';
import Home from "../components/Home";
import DefaultLayout from "../components/layouts/DefaultLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import Signup from "../components/Signup/Signup";
import Signin from "../components/Signin/Signin";
import Welcome from "../components/Welcome";
import SignOut from "../components/Signout/Signout";

const AllRoutes = () => {
    return (
        <Switch>
            <ProtectedRoute
                exact path='/'
                layout={DefaultLayout}
                component={Home} />
            <ProtectedRoute
                exact path="/auth/signup"
                layout={AuthLayout}
                component={Signup} />
            <ProtectedRoute
                exact path="/auth/signin"
                layout={AuthLayout}
                component={Signin} />
            <ProtectedRoute
                exact path="/auth/signout"
                layout={AuthLayout}
                component={SignOut} />
            <ProtectedRoute
                exact path="/welcome"
                layout={DefaultLayout}
                component={Welcome} />
        </Switch>
    )
}

export default AllRoutes;