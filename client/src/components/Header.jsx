import React from 'react'

const Header = ({ title }) => {
    return (
        <div>
            <h1 className = "font-weight-light display-1 text-center" style={{marginLeft : "80px"}}>
                {title}
            </h1>
        </div>
    )
}

export default Header
