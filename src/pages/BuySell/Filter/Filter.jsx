import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Stack } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Filter = ({ categories, setCategories, sortBy, setSortBy }) => {

  const handleCategoryChange = (event, value) => {
    setCategories(value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Box
      // flex={1}
      // minWidth={200}
      padding={2}
      borderTop={9}
      borderBottom={9}
      borderLeft={9}
      borderColor="lightgrey"
    >
      <Stack direction="column">
        <h2
          style={{ margin: 8 }}
        >Filters</h2>
        <Divider>{"Categories"}</Divider>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={categoriesList}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          onChange={handleCategoryChange}
          value={categories}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </li>
          )}
          style={{ marginBottom: 8 }}
          renderInput={(params) => (
            <TextField {...params} label="Categories" placeholder="Choose your category" />
          )}
        />
        <Divider>{"Sort By"}</Divider>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Sort By</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={sortBy}
            onChange={handleSortByChange}
            name="radio-buttons-group"
          >
            <FormControlLabel value="popularity" control={<Radio color="primary" />} label="Popularity" />
            <FormControlLabel value="pricelowtohigh" control={<Radio color="primary" />} label="Price-Low to High" />
            <FormControlLabel value="pricehightolow" control={<Radio color="primary" />} label="Price-High to Low" />
          </RadioGroup>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default Filter;

const categoriesList = [
  { title: 'Books' },
  { title: 'Cooler' },
  { title: 'Cycle' },
  { title: 'Electronics/Gadgets' },
  { title: 'Tools' },
  { title: 'Other' },
];
