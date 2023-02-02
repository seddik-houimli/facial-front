import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function TableEmotions({open,filename,labels,probs}) {
  return (
    <div style={{marginTop:'35px' ,color:'blue'}}>
      {open ? 
      <TableContainer >
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          {[1,2,3,4,5,6,7].map((e,index)=>
          
          <TableCell key={index} align="center"> {e==1 ? "Neutral" : e==2 ? "Happiness" : e==3 ? "Sadness" : e==4 ? "Surprise": e==5 ? "Disgust": e==6 ? "Fear" : e==7 ? "Anger":"Contempt"}</TableCell>
          
         )}
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
          
        {[Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100)].map((e,index)=>
        <TableCell align="center" key={index}>{e}</TableCell>
        )}
</TableRow>
          
        </TableBody>
      </Table>
    </TableContainer> 
    :<>
    </>}
    </div>
  )
}

export default TableEmotions