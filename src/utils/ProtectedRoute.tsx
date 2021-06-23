import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import * as H from 'history'
import { Route, Redirect, RouteComponentProps, RouteChildrenProps } from 'react-router-dom'

interface RouteProp {
    location?: H.Location
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    render?: ((props: RouteComponentProps<any>) => React.ReactNode);
    children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
    path?: string | string[];
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
  }


const ProtectedRoute = ({ component: Component, ...rest }: RouteProp) => {

    // Context
    const { authState: { isAuthenticated }} = useContext(AuthContext)

    if (!Component) return null
    return (
        <Route {...rest} render={props => 
            isAuthenticated ? (<>
                <Component {...props} {...rest} />
            </>) : (<Redirect to='/login' />)}
        />
    )
}

export default ProtectedRoute
