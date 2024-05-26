export const handleLogin = () => {
    window.open(
        `${process.env.REACT_APP_SERVER_NAME}/auth/google/callback`,
        "_self"
    )
}

export const handleLogout = () => {
    window.open(
        `${process.env.REACT_APP_SERVER_NAME}/auth/logout`,
        "_self"
    )
}