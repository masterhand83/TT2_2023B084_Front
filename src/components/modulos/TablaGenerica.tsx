import { Paper, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
import { useState } from "react";

type ColumnData = {
  field: string;
  headerName: string;
}
type TablaGenericaProps = {
  tableColumns: ColumnData[];
  tableData: any[];
};
export default function TablaGenerica({tableColumns, tableData}: TablaGenericaProps) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const TableHeaders = () => (
    tableColumns.map((column) => (
      <TableCell>
        <span className="font-bold">{column.headerName}</span>
      </TableCell>
    ))
  )
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaders />
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {loadingContent ? (
            <LoadingContentRow colSpan={6} />
          ) : (
            <TableContent />
          )} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPage={rowsPerPage}
              count={tableData.length}
              page={page}
              onPageChange={handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
