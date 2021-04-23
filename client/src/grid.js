import { React } from 'react';


export const mapObject = (obj, f) =>
{
    Object.keys(obj).map(f);
}



export const Timer = ({time}) =>
{
    return (
        <div style={{borderRadius:"50%", background:"#fdf7e3", position:"absolute", top:"3%", right:"3%"}}>
            {
                time
            }            
        </div>
    )
}

export const Grid = ({columnas, children}) =>
{
    
    return (
        <div style={{display:"grid", gridTemplateColumns:"repeat("+columnas+", 1fr)", gridGap:"2em"}}>
            {
                children
            }            
        </div>
    )
}

export const Row = ({children}) =>
{    
    return (
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyItems:"center"}}>
            {
                children
            }            
        </div>
    )
}

export const Column = ({children}) =>
{    
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyItems:"center"}}>
            {
                children
            }            
        </div>
    )
}