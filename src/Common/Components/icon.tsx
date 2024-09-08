import React from "react";

interface IIcon {
    className?: string;
    size?: 16 | 24 | 32
    icon: string
}

const Icon: React.FC<IIcon> = ({size = 24, icon, className}) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 32 32"
        // fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d={icon}
            fill='currentColor '
        />
    </svg>
);

export { Icon }