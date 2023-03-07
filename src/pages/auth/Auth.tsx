import React from 'react'

interface OwnProps {
    login?: boolean; // determines whether to show the login page or the sign up page
}

const AuthPage= ({ login }: OwnProps ) => {
    return (
        <div className="auth-page">
            <h1>{login ? 'Log in' : "Sign up"}</h1>
        </div>
    )

}

export default AuthPage
