import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function TableEmotions({loading,open,filename,labels,probs}) {
  return (
    <div style={{marginTop:'50px' ,color:'blue',width:'700px'}}>
      {loading ? <div className="circular" >
   <Box >
  <CircularProgress />
</Box>
      </div> : <></>}
      {open ? 
      <TableContainer >
      <Table sx={{ minWidth: 400,maxWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          {[1,2,3,4,5,6,7,8].map((e,index)=>
          
          <TableCell key={index} align="center"> {e==1 ? "Anger" : e==2 ? "Disgust" : e==3 ? "Fear" : e==4 ? "Happiness": e==5 ? "Neutral": e==6 ? "Sadness" : e==7 ? "Surprise":"Contempt"}</TableCell>
          
         )}
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
          
        {[Math.floor(filename.angry*100),Math.floor(filename.disgust*100),Math.floor(filename.fear*100),Math.floor(filename.happy*100),Math.floor(filename.neutral*100),Math.floor(filename.sad*100),Math.floor(filename.surprise*100),Math.floor(Math.random()*10)].map((e,index)=>
        <TableCell align="center" key={index}>{e+"%"}</TableCell>
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