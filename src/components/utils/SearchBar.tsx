import { InputAdornment, TextField } from '@mui/material';
import { SearchTwoTone as SearchIcon } from '@mui/icons-material';
export default function SearchBar(props: {
  onProductoSearch: (result: string) => void;
  placeholder?: string;
  keepervalue?: string
}) {
  return (
    <TextField
      variant="outlined"
      placeholder='Codigo de barras, marca o nombre del producto'
      sx={{ width: '100%', backgroundColor: 'white' }}
      type="search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
      onChange={(event) => {
        props.onProductoSearch(event.currentTarget.value);
      }}
    />
  );
}
