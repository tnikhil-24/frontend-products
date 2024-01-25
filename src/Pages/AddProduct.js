import React,{useState} from 'react'
import Chip from '@mui/material/Chip';
import {TextField} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import WcIcon from '@mui/icons-material/Wc';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Autocomplete,{createFilterOptions} from '@mui/material/Autocomplete';
import axios from 'axios';
import options from '../Resources/Sizes.json'
import TypeItems from '../Resources/Types.json'
import BrandItems from '../Resources/Brands.json'
import SportItems from '../Resources/Sports.json'
import { indigo } from "@mui/material/colors";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getTokenFromCookies } from '../AdminPages/cookieUtils';
import './AddProduct.css'

function AddProduct(){
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const filter = createFilterOptions();

  const [prodTle,setProdTle]=useState("Product Title");
  const [price,setPrice]=useState(0);
  const [discount,setDiscount]=useState(0);
  const [img,setImg]=useState();
  const [about,setAbout]=useState("About Product");
  const [imgUrl,setImgUrl]=useState("");
  const [gender,setGender]=useState("Male");
  const [sport,setSport]=useState("");
  const [type,setType]=useState("");
  const [brand,setBrand]=useState("");
  const [size,setSize]=useState();
  const [quantity,setQuantity]=useState();
  const [sizeArray,setSizeArray]=useState(new Map());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const [response,setResponse]=useState();

  const handleSubmit=async(event)=>{
    event.preventDefault();
    try{
      let formData=new FormData();
      let product={"prodTle":prodTle,"cst":price,"desc":about,"qnty":Array.from(sizeArray),"gndr":gender,"discnt":discount,"brnd":brand,"prdCat1":sport,"prdCat2":type,"avalblty":"true"};
      formData.append("product",JSON.stringify(product))
      formData.append("file",img)
      const jwt = getTokenFromCookies();
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
        const request= await axios.post('https://localhost:9000/api/product/',formData,{
          headers: {
            "Content-Type": "multipart/form-data", 
          }
        });
        setOpenSnackbar(true);
        setSnackbarSeverity('success');
        setResponse(await request.data);
        window.location.reload();
    }catch(error){
      console.log(error)
      setOpenSnackbar(true);
      setSnackbarSeverity('error');
      setResponse(error.message);
    }
}

const handleCloseSnackbar = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpenSnackbar(false);
};


const handleDelete = (x) => () => {
  setSizeArray((prevSizeArray) => {
    const newSizeArray = new Map(prevSizeArray);
    newSizeArray.delete(x);
    return newSizeArray;
  });
};

const handleAdd = (e) => {
  e.preventDefault();

  setSizeArray((prevSizeArray) => {
    const newSizeArray = new Map(prevSizeArray);
    newSizeArray.set(size, quantity);
    return newSizeArray;
  });

  setSize('');
  setQuantity('');
};

    return(
        <div className='flex sm:flex-row flex-col'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-4 lg:py-0 rounded-lg">
  <form onSubmit={handleSubmit}>
  <div class="space-y-12 mt-2">
    <div class="border-gray-950/10 pb-12">
      <h2 class="text-3xl text-center font-bold leading-7 text-indigo-950">Add a Product</h2>
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="username" class="block text-sm font-medium leading-6 text-indigo-950">Product Title</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-900 sm:max-w-md">
              <input onChange={(e)=>setProdTle(e.target.value)} type="text" name="username" id="username"  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-indigo-950 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required/>
            </div>
          </div>
        </div>

        <div class="col-span-full">
          <label for="about" class="block text-sm font-medium leading-6 text-indigo-950">About</label>
          <div class="mt-2">
            <textarea onChange={(e)=>setAbout(e.target.value)} id="about" name="about" rows="3" class="block w-full rounded-md border-0 py-1.5 text-indigo-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-950 sm:text-sm sm:leading-6" required></textarea>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">Write few sentences about product.</p>
        </div>
        <div class="col-span-full">
          <label for="cover-photo" class="block text-sm font-medium leading-6 text-indigo-950">Product photo</label>
          {
            imgUrl == "" ? 
            <div>
              <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-950/25 px-6 py-10">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-950 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-950 focus-within:ring-offset-2 hover:text-indigo-900">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only" onChange={(e)=>{setImgUrl(URL.createObjectURL(e.target.files[0]));setImg(e.target.files[0])}} required/>

                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 2MB</p>
            </div>
            </div>
          </div>
          :
            <div class="relative">
              <img class="w-full overflow-hidden max-h-72" src={imgUrl}/>
              <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent border-4 border-black shadow-black shadow-lg p-4" onClick={()=>{setImg();setImgUrl("");}}>
                <p className='underline font-bold ' onClick={()=>{setImg();setImgUrl("");}}>Cancel</p>
              </button>
            </div>

          }
        </div>
      </div>
    </div>
    </div>
    <label class="block text-sm font-medium leading-6 text-indigo-950">Gender</label>
          <div class="mt-2">
            <select onChange={(e)=>setGender(e.target.value)}  class="block w-full rounded-md border-0 py-1.5 text-indigo-950 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-950 sm:max-w-xs sm:text-sm sm:leading-6" required>
              <option>Male</option>
              <option>Female</option>
              <option>Unisex</option>
            </select>
          </div>
    <div class="mt-4 py-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-t">
      <div className="sm:col-span-3">
                <label for="size" class="block text-sm font-medium leading-6 text-indigo-950" >Size</label>
        <Autocomplete
      id="grouped-demo"
      options={options}
      groupBy={(option) => option.group}
      getOptionLabel={(option) => option.title}
      onChange={(e,v)=>setSize(v?v.title:"")}
      sx={{ width: 300 }}
      value={size}
      renderInput={(params) => <TextField {...params} />}
    />
      </div>
      <div class="sm:col-span-3">
          <label for="username" class="block text-sm font-medium leading-6 text-indigo-950">Quantity</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-950 sm:max-w-md">
              <input value={quantity} onChange={(e)=>setQuantity(e.target.value)} type="number" name="username" id="username"  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-indigo-950 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>
        </div>
        <div className='flex flex-col border-b pb-6 gap-y-4'>
          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button onClick={handleAdd} class="rounded-md bg-indigo-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-950">Add</button>
          </div>
          {
            Array.from(sizeArray).map(([key, value])=>
            (
            <Chip label={key + " - " + value} className='w-32 self-center' key={key} variant="outlined" onDelete={handleDelete(key)} />
            ))
          }
        </div>

            <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b pb-4">
      <div className="sm:col-span-3">
        <label for="price" class="block text-sm font-medium leading-6 text-indigo-950" >Price (M.R.P)</label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">₹</span>
          </div>
          <input type="text" name="price" onChange={(e)=>{if(e && e.stopPropagation){e.stopPropagation()};setPrice(e.target.value)}} id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-indigo-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-950 sm:text-sm sm:leading-6" placeholder="0.00" required/>
        </div>
      </div>
      <div className="sm:col-span-3">
        <label for="price" class="block text-sm font-medium leading-6 text-gray-950" >Discount (On M.R.P)</label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">%</span>
          </div>
          <input type="text" name="price" onChange={(e)=>setDiscount(e.target.value)} id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-950 sm:text-sm sm:leading-6" placeholder="0.00"/>
        </div>
      </div>
      
      <div className="sm:col-span-3">
                  <Autocomplete
                    disablePortal
                    onChange={(e,v)=>setSport(v)}
                    id="combo-box-demo"
                    options={SportItems.map((option)=>option.label)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Sport" required/>}
                  />
      </div>
        <div class="sm:col-span-3">
        <Autocomplete
                    disablePortal
                    options={TypeItems}
                    groupBy={(TypeItem)=>TypeItem.group}
                    getOptionLabel={(TypeItem)=>TypeItem.label}
                    sx={{ width: 300 }}
                    onChange={(e,v)=>setType(v?v.label:"")}
                    renderInput={(params) => <TextField {...params} label="Type" required/>}
                  />
        </div>

        <div class="sm:col-span-3">
      
        <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={BrandItems}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.label;
                    }}
                    freeSolo
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
            
                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          value: `Add "${params.inputValue}"`,
                        });
                      }
            
                      return filtered;
                    }}
                    required
                    renderOption={(props, option) => <li {...props}>{option.value}</li>}
                    onChange={(e,v)=>setBrand(v?v.label:"")}
                    renderInput={(params) => <TextField {...params} label="Brand" />}
                  />
        </div>
        </div>
  <div class="mt-6 flex items-center justify-end gap-x-6 mb-6">
    <button type="button" class="text-sm font-semibold leading-6 text-gray-950">Cancel</button>
    <button type="submit" class="rounded-md bg-indigo-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-950">Save</button>
  </div>
</form>


          
  </div>
  <div class="relative flex flex-wrap mx-auto border-gray-800  bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
    <div class="w-[148px] h-[12px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
    <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
    <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
    <div class="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
    <div class="rounded-[2rem] overflow-scroll overflow-x-hidden w-[272px] h-[572px] bg-white">
    <div class="container mx-auto px-4"> 
            <div class="max-w-xl overflow-hidden rounded-lg pt-4 pb-1">
              <img class="h-40 overflow-hidden rounded-xl" src={imgUrl} alt="Product Image" />
            </div> 
      <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
        <h1 class="sm:text-2xl text-ellipsis font-bold text-gray-950">{prodTle}</h1>
        <div class="flex items-end">
        <span class="text-xl font-bold text-slate-950">₹{parseInt(price*(1-(discount/100)))}</span>
        {
          discount != 0 && 
          <div>
            <span class="text-sm text-slate-950 line-through"> ₹{ price}</span>
            <span class="m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{discount}% OFF</span>
          </div>
        }
        </div>
        <p class="sm: text-md font-semibold text-gray-950 sm:text-md py-4 border-t">Size</p>
        <div className='flex flex-row space-x-2 flex-wrap '>
          {
            Array.from(sizeArray).map(([key, value])=>
            (
              <button type="button" key={key} class="text-gray-950 focus:bg-indigo-950 bg-white border border-gray-300 focus:outline-none hover:bg-purple-100 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">{key}</button>
            )

            )
          }
        </div>
        <div class="flex flex-col items-center justify-center space-y-4 border-b py-2 sm:flex-row sm:space-y-0">
          <button type="button" class="inline-flex  justify-evenly rounded-md border-2 border-transparent bg-indigo-950 bg-none px-4 py-1 text-sm font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
            <AddShoppingCartIcon/>
            <p>Add To Cart</p>
          </button>
        </div>
        <ul class="mt-4 pb-4 space-y-2 border-b">
          <li class="flex items-center text-left text-sm font-medium text-gray-600">
            { gender == "Male" ?
            <MaleIcon sx={{ color: indigo[900] }}/> :
            gender == "Female" ?
            <FemaleIcon sx={{ color: indigo[900] }}/> :
            <WcIcon sx={{ color: indigo[900] }}/>
            }
            <p className='pl-4'>{gender}</p>
          </li>
        </ul>
      </div>
      <div class="lg:col-span-3">
        <div class="mt-2 flow-root sm:mt-4">
          <h1 class="text-xl font-bold whitespace-normal text-indigo-950">Description</h1>
          <p class="mt-4">{about}</p>
        </div>
      </div>
      <ul class="mt-4 pt-4 pb-4 space-y-2 border-t">
          <li class="flex items-center text-left text-sm font-medium text-gray-600">
            <LocalShippingIcon sx={{ color: indigo[900] }}/>
            <p className='pl-4'>Shipping in India</p>
          </li>
        </ul>
    </div>
    </div>
</div>
<Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
      <div>
      <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                {response}
              </Alert>
      </div>
        </Snackbar>
  </div>
    )
}

export default AddProduct;