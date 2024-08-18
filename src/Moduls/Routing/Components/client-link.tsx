import React from "react";
import {Link, useMatch} from "react-router-dom";

import {ILink} from "./i-link";

const ClientLink: React.FC<ILink> = ({to, text}) => {

    const match = useMatch({
        path: to,
        end: to.length === 1
    })

    return (
        <Link
            to={to}
            className={match ? 'client-link-active' : ''}
        >
            {text}
        </Link>
    )
}

export { ClientLink }