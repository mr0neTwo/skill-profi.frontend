import React from "react";
import {ILink} from "./i-link";
import {Link, useMatch} from "react-router-dom";

const AdminLink: React.FC<ILink> = ({to, text}) => {

    const match = useMatch({
        path: to,
        end: to.length < 8
    })

    return (
        <Link
            to={to}
            className={match ? ' admin-link-active' : ''}
        >
            {text}
        </Link>
    )
}

export { AdminLink }