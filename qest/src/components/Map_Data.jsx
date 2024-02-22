import React from 'react';

export default function Map_Data({ e, checked, onChange }) {
    return (
        <tr>
            <td> 
                <input type='checkbox' checked={checked} onChange={onChange}></input>
            </td>  
            <td>{e.Ref}</td> 
            <td>{e.Customer}</td>  
            <td>{e.Products}</td> 
            <td>{e.Date}</td> 
            <td>{e.Distribution}</td> 
            <td>{e.Status}</td> 
            <td>{e.Price}</td> 
        </tr>
    );
}
