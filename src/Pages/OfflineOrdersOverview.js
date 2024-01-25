import React,{useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import OfflineBilling from './OfflineBilling';
import OfflineOrders from './OfflineOrders';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { fetchProducts } from '../AdminPages/Products/productSlice'
import { getTokenFromCookies } from '../AdminPages/cookieUtils';
function OfflineOrdersOverview() {
    const [value, setValue] = React.useState('1');
      
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [rows,setRows]=useState();
    const dispatch =useDispatch();
  
    const getRows=async()=>{
        const jwt = getTokenFromCookies();
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      const response = await axios('https://localhost:9000/api/offlineorders/');
      setRows(response.data);
    }
        useEffect(()=>{
            getRows();
            dispatch(fetchProducts());
  },[])
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Place Store Order" value="1" />
            <Tab label="Store Orders" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><OfflineBilling/></TabPanel>
        <TabPanel value="2"><OfflineOrders rows={rows}/></TabPanel>
      </TabContext>
    </Box>
  )
  }

export default OfflineOrdersOverview