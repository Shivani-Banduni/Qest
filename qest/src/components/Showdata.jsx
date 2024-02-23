import React from 'react';
import { data } from '../Data.js';
import '../style/showdata.css';
import Map_Data from './Map_Data.jsx';

export default function Showdata({ filteredData }) {
    const [dataa, setdata] = React.useState([]);
    const [allChecked, setChecked] = React.useState(false);
    const [checkedItems, setCheckedItems] = React.useState({});

    React.useEffect(() => {
        if (filteredData) {
            setdata(filteredData);
        } else {
            setdata(data);
            const initialState = {};
            data.forEach((_, index) => {
                initialState[index] = allChecked;
            });
            setCheckedItems(initialState);
        }
    }, [allChecked, data, filteredData]);

    function handleChange() {
        const newState = !allChecked;
        setChecked(newState);
        setCheckedItems(Object.keys(checkedItems).reduce((acc, key) => {
            acc[key] = newState;
            return acc;
        }, {}));
    }

    const handleSingleChecked = (index) => {
        const newState = { ...checkedItems, [index]: !checkedItems[index] };
        setCheckedItems(newState);
        setChecked(Object.values(newState).every(Boolean));
    };

    const numberOfCheckedItems = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className='showData-Div'>
            <div className='allOrders'>
                <input type='checkbox' onChange={handleChange} checked={allChecked}></input>
                <h4>ALL ORDERS <span style={{ color: "#999999" }}>({numberOfCheckedItems} orders selected)</span></h4>
            </div>
            <table>
                <tr>
                    <th><input type='checkbox'></input></th>
                    <th>Ref.ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Date</th>
                    <th>Distribution</th>
                    <th>Status</th>
                    <th>Price(in Rs)</th>
                </tr>
                {dataa.map((e, index) => (
                    <Map_Data key={index} e={e} checked={checkedItems[index]} onChange={() => handleSingleChecked(index)} />
                ))}
            </table>
        </div>
    );
}
