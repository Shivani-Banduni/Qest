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
import {data} from '../Data.js'

export default function Page_Layout() {
    const[search,setSearch]=React.useState('')
  const [statusValue, setStatusValue] = React.useState('');
  const [locationValue, setLocationValue] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(); // Using state to store filtered data



  let newData;
  function handleSearch(e) {
    const searchvalue = e.target.value.toLowerCase(); // Convert search term to lowercase for case-insensitive matching
    setSearch(searchvalue); // Update search state

    // Perform filtering
    const newData = data.filter((item) => {
        // Convert item values to lowercase and check if any value includes the search term
        // Assuming all values are strings. Adjust the logic if some values are not strings.
        return Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchvalue)
        );
    });

    setFilteredData(newData); // Update state with filtered data
}


// const handleSearchKeyDown=(e)=>{
//     if(e.key==='Enter'){
//         setFilteredData(newData)
// console.log(filteredData)
//     }
// }



  const handleStatusChange = (event) => {
    const newValue = event.target.value;
    setStatusValue(newValue);

    // Filter data based on the new value
    const newData = data.filter((item) => {
      return item.Status === newValue;
    });
    console.log(newData)
    setFilteredData(newData); // Update state with filtered data
  };


  const handleLocationChange = (event) => {
    setLocationValue(event.target.value);
    const newData=data.filter((e)=>{return e.Distribution===event.target.value})
    console.log(newData)
    setFilteredData(newData)
  };

  
  return (
    <div className='main-div'>
      <Box className='nav'
        sx={{
          display: 'flex',
          gap: 2, // Adjusts the space between the text fields
        }}
      >
        <TextField  
        onKeyDown={handleSearch}
        onChange={handleSearch}
                  sx={{bgcolor:'white', height:'40px'}}
          variant="outlined"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl variant="outlined"  >
          <TextField

                    sx={{bgcolor:'white',height:'40'}}
            variant="outlined"
            select
            value={statusValue}
            placeholder="Status"

            onChange={handleStatusChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StatusIcon color="success" />
                </InputAdornment>
              ),
            }}
          >

         
            <MenuItem  value="In Transit">In Transit</MenuItem>
            <MenuItem value="Out for Delivery">Out for Delivery	</MenuItem>
            <MenuItem value="Placed">Placed</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>

          </TextField>
        </FormControl>

        <FormControl variant="outlined" >
          <TextField
          sx={{bgcolor:'white'}}
            variant="outlined"
            select
            value={locationValue}
            onChange={handleLocationChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
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
        className='btn'
      variant="contained"
      startIcon={<DownloadIcon />}
      sx={{
        backgroundColor: 'blue', // Set the background color to blue
        color: 'white', // Set the text color to white
        '&:hover': {
          backgroundColor: 'darkblue', // Optional: change background on hover
        },
      }}
    >
      Download
    </Button>

      </Box>


      <Showdata filteredData={filteredData}/>
    </div>
  );
}
