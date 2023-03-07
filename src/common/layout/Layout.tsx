import React, { PropsWithChildren } from 'react'

const Layout = ({children}: PropsWithChildren ) => {

    return (
        <div className="auth-page">
            <h1>Layout</h1>
            {children}
        </div>
    )

}

export default Layout
