import React from 'react';
import '../style/page_layout.css';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import StatusIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Importing location icon
import Box from '@mui/material/Box'; // Used for layout
import Showdata from './Showdata';
import { data } from '../Data.js';
import * as XLSX from 'xlsx';


export default function Page_Layout() {
    const [search, setSearch] = React.useState('')
    const [statusValue, setStatusValue] = React.useState('');
    const [locationValue, setLocationValue] = React.useState('');
    const [filteredData, setFilteredData] = React.useState();



    let newData;
    function handleSearch(e) {
        const searchvalue = e.target.value.toLowerCase();
        setSearch(searchvalue);
        const newData = data.filter((item) => {
            return Object.values(item).some(value =>
                String(value).toLowerCase().includes(searchvalue)
            );
        });

        setFilteredData(newData);
    }


    const handleStatusChange = (event) => {
        const newValue = event.target.value;
        setStatusValue(newValue);

        const newData = data.filter((item) => {
            return item.Status === newValue;
        });
        console.log(newData)
        setFilteredData(newData);
    };


    const handleLocationChange = (event) => {
        setLocationValue(event.target.value);
        const newData = data.filter((e) => { return e.Distribution === event.target.value })
        console.log(newData)
        setFilteredData(newData)
    };





    const exportToExcel = () => {
        const exportData = filteredData || data;

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);

        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        XLSX.writeFile(wb, "Orders.xlsx");
    };


    return (
        <div className='main-div'>
            <Box className='nav'
                sx={{
                    display: 'flex',
                    gap: 2,
                }}
            >
                <TextField
                    onChange={handleSearch}
                    sx={{
                        bgcolor: 'white',
                        height: '40px',
                        width: '30%',
                        border: '1px solid grey',
                        paddingBottom: '5px',
                        paddingTop: "-1px",
                        borderRadius: "10px",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                textAlign: 'center',
                                border: "none",
                                borderColor: 'grey',
                                display: 'flex',
                                textAlign: 'center',
                            },
                            "&:hover fieldset": {
                                borderColor: "grey",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#157AFE",
                            },
                        },
                    }}
                    placeholder="Search..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ mr: "auto", mt: -0.5 }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <FormControl variant="outlined" className='input-box'>
                    <TextField

                        sx={{
                            bgcolor: 'white',
                            height: '40px',
                            border: '1px solid grey',
                            borderRadius: "10px",
                            paddingBottom: '5px',

                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    border: "none",
                                    borderColor: 'grey',
                                },
                                "&:hover fieldset": {
                                    borderColor: "grey",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#157AFE",
                                },
                            },
                        }} variant="outlined"
                        select

                        onChange={handleStatusChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">

                                    <StatusIcon color="success" sx={{ mr: "auto", mt: -0.5, mr: 1 }} />Status
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="In Transit">In Transit</MenuItem>
                        <MenuItem value="Out for Delivery">Out for Delivery	</MenuItem>
                        <MenuItem value="Placed">Placed</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>

                    </TextField>
                </FormControl>

                <FormControl variant="outlined" className='input-box'>
                    <TextField
                        sx={{
                            bgcolor: 'white',
                            height: '40px',
                            border: '1px solid grey',
                            paddingBottom: '5px',
                            borderRadius: "10px",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    border: "none",
                                    borderColor: 'grey',
                                },
                                "&:hover fieldset": {
                                    borderColor: "grey",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#157AFE",
                                },
                            },
                        }} variant="outlined"
                        select
                        onChange={handleLocationChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationOnIcon sx={{ mr: "auto", mt: -0.5, mr: 1 }} />
                                    Distribution
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="Bangalore">Bangalore</MenuItem>
                        <MenuItem value="Patna">Patna</MenuItem>
                        <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                    </TextField>
                </FormControl>


                <Button
                    onClick={exportToExcel}

                    className='btn'
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    sx={{
                        backgroundColor: 'blue',
                        color: 'white',
                        borderRadius: '40px',
                        '&:hover': {
                            backgroundColor: '#157AFE',
                        },
                    }}
                >
                    Export orders
                </Button>

            </Box>


            <Showdata filteredData={filteredData} />
        </div>
    );
}
