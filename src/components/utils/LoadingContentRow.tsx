import { TableRow, TableCell, CircularProgress } from "@mui/material";

export default function LoadingContentRow(params: {
  colSpan: number;
}){
    return (
      <TableRow>
        <TableCell colSpan={params.colSpan} align="center">
          <CircularProgress />
        </TableCell>
      </TableRow>
    );
  }