import React from 'react'
import {data} from '../Data.js'
import '../style/showdata.css'
import Map_Data from './Map_Data.jsx'

export default function Showdata({filteredData}) {
    const [dataa,setdata] =React.useState([])
    const [allChecked,setChecked] = React.useState(false)
    const [checkedItems, setCheckedItems] =React.useState({});


React.useEffect(()=>{
    if (filteredData){
        setdata(filteredData)
    }else{
        setdata(data)
        // Initialize checked state for each item based on 'allChecked'
        let initialState = {};
        data.forEach((item, index) => {
            initialState[index] = allChecked;
        });
        setCheckedItems(initialState);
    }
   

},[allChecked, data,filteredData])

    // console.log(dataa,'data')


    function handleChange(){
            setChecked(!allChecked)

              // Update all items to match the new 'allChecked' state
        let newState = {};
        Object.keys(checkedItems).forEach(key => {
            newState[key] = !allChecked;
        });
        setCheckedItems(newState);
        
    }

    const handleSingleChecked = (index) => {
        const newState = { ...checkedItems, [index]: !checkedItems[index] };
        setCheckedItems(newState);
        // Check if all items are now checked
        setChecked(Object.values(newState).every(Boolean));
    };

    return (
        <div className='showData-Div'>
        <div className='allOrders'>   <input type='checkbox' onChange={handleChange} checked={allChecked} ></input> <h4>ALL ORDERS</h4></div>
            <table>
                <tr>
               <th> <input type='checkbox'  ></input> </th>
                    <th>Ref.ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Date</th>
                    <th>Distribution</th>
                    <th>Status</th>
                    <th>Price(in Rs)</th>

                </tr>

                {dataa.map((e,index)=>{return <Map_Data key={index} e={e}   value={allChecked}   checked={checkedItems[index]} onChange={(()=>handleSingleChecked(index))}/> })}
                
{/* {dataa.map((e)=>{return    <tr> <td> <input type='checkbox'></input></td>  <td>{e.Ref}</td> <td>{e.Customer}</td>  <td>{e.Products}</td> <td>{e.Date}</td> <td>{e.Distribution}</td> <td>{e.Status}</td> <td>{e.Price}</td> </tr>})} */}
                
            </table>


        </div>
    )
}
