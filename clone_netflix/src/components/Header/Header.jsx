import React from "react";
import './Header.css'

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="/img/logo.png" alt="Netflix" />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="/img/Netflix-avatar.png" alt="Usuário" />
                </a>
            </div>
        </header>
    )
}