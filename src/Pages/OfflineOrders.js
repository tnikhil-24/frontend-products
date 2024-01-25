import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import './AdminLogin.css'
import axios from 'axios';


function OfflineOrders(props){
  
    const columns = [
        { field: 'ordId',
          headerName: 'Order Id',
          width: 200,
          sortable:false
         },
        { field: 'dt',
          headerName: 'Date',
          width: 200 
        },
        { field: 'prdId',
          headerName: 'Product Id',
          width: 200,
          sortable:false,
          renderCell:(params)=>{
            return(
                <div>
                        {
                            params.row.prdId.map((id)=><p>{id}</p>)
                        }
                </div>
            )
          }
        },
        { field: 'size',
          headerName: 'Size',
          width: 100,
          sortable:false,
          renderCell:(params)=>{
            return(
                <div>
                        {
                            params.row.size.map((id)=><p>{id}</p>)

                        }
                </div>
            )
          }
        },
        { field: 'quantity',
          headerName: 'Quantity',
          width: 100,
          sortable:false,
          renderCell:(params)=>{
            return(
                <div>
                        {
                            params.row.quantity.map((id)=><p>{id}</p>)

                        }
                </div>
            )
          }
        },
        { field: 'price',
        headerName: 'Price/Unit',
        width: 100,
        sortable:false,
        renderCell:(params)=>{
          return(
              <div>
                      {
                          params.row.price.map((id)=><p>₹ {id}</p>)

                      }
              </div>
          )
        }
      },
        { field: 'subTotal',
          headerName: 'Subtotal',
          width: 100,
          sortable:false,
          renderCell:(params)=>{
            return(
                <div>
                        {
                            params.row.subTotal.map((id)=><p>₹ {id}</p>)

                        }
                </div>
            )
          }
        },
        {
          field: 'cst',
          headerName: 'Total Price',
          type: 'number',
          align:"center",
          valueGetter:(params)=>
          `₹ ${params.row.cst} `,
          width: 120,
        },
       
      ];
      
      
      const rows=props.rows
      const modifiedRows = rows.map((row) => {
          const prdFields = row.prds.split('|').map((pr) => pr.split('_'));
          return {
            ...row,
            prdId: prdFields.map((field) => field[0]),
            size: prdFields.map((field) => field[1]),
            quantity: prdFields.map((field) => field[2]),
            price: prdFields.map((field) => field[3]),
            subTotal: prdFields.map((feild)=>feild[2]*feild[3])
          };
        });
      const columnGroupingModel = [
  {
    groupId: 'Product Details',
    children:[{ field: 'prdId' }, { field: 'size' }]
  },
  {
    groupId:"Pricing Details",
   children:[ { field: 'quantity' }, { field: 'price' },{ field: 'subTotal' }]
 }
];
    return(
        <div className='mx-2 md:mx-16 my-8 shadow-xl rounded-xl'>
            <DataGrid
                rows={modifiedRows}
                getRowId={(row)=>row.ordId}
                experimentalFeatures={{ columnGrouping: true }}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                columnGroupingModel={columnGroupingModel}
                pageSizeOptions={[5,10,25,50,75,100]}
                
            />
    </div>
    )
}

export default OfflineOrders;