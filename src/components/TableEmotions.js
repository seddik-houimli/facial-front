import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function TableEmotions({filename,labels,probs}) {
  return (
    <div style={{marginTop:'35px' ,color:'blue'}}>
      <TableContainer >
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          {[1,2,3,7].map((e,index)=>
          
          <TableCell key={index} align="center"> {e==1 ? "Happy" : e==2 ? "Sad" : e==3 ? "Surprise" : "Angry"}</TableCell>
          
         )}
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
          
        {[99,78,88,65].map((e,index)=>
        <TableCell align="center" key={index}>{e}</TableCell>
        )}
</TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default TableEmotions