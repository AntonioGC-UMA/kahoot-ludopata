import { React, useEffect, useState } from 'react';


export const mapObject = (obj, f) => {
    Object.keys(obj).map(f);
}

export const useSized = () => {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const onResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    })

    return size;
}

export const Timer = ({ time }) => {
    return (
        <div style={{ background: "#fdf7e3", position: "sticky", top: "0", right: "0", width: "10%", height: "10%" }}>
            {
                time
            }
        </div>
    )
}

export const Grid = ({ columnas, children }) => {

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(" + columnas + ", 1fr)", gridGap: "20px" }}>
            {
                children
            }
        </div>
    )
}

export const Row = ({ children }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyItems: "center" }}>
            {
                children
            }
        </div>
    )
}

export const Column = ({ children }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" }}>
            {
                children
            }
        </div>
    )
}