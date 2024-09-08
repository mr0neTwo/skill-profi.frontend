import React from "react";

interface ISkeleton {
    className?: string;
    color?: 'green' | 'pink' | 'orange'  | 'blue' | 'lightgrey';
    width?: number;
    height?: number;
}

const Skeleton: React.FC<ISkeleton> = ({className, color = 'green', width=30, height=100}) => {

    return <div
        className={`${className || ''} bg-${color} rounded animate-pulse`}
        style={{ width: `${width}px`, height: `${height}px` }}
    />
}

export { Skeleton };