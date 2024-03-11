import { Link, routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import { Form, Submit, TextAreaField } from '@redwoodjs/forms'

// Accordion is for the FAQ section displays
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

// These are for the search bar feature of the FAQ section
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import { useTheme } from '@mui/material/styles'
import { TextareaAutosize, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles'

// puts data to standard lowercase and compares to data passed
const filterData = (query, data) => {
  if (!query) {
    return data;
  } else {
    return data.filter((d) => d.toLowerCase().includes(query));
  }
};

const data = [
  "Paris",
  "London",
  "New York",
  "Tokyo",
  "Berlin",
  "Buenos Aires",
  "Cairo",
  "Canberra",
  "Rio de Janeiro",
  "Dublin"
];

const DocumentationPage = () => {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, data);

  return (
    <>
      <Metadata title="Documentation" description="Documentation page" />
      <Typography variant='h2' component='h2' align='center' style={{color: theme.palette.text.secondary, fontSize: '52px', fontStyle: 'normal', fontWeight: '600'}}>Documentation</Typography>
      {
        <div
        style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 20
        }}
      >
        <Form>
          <TextField
            sx={{ input: { color: theme.palette.text.secondary }, '&:active fieldset': {borderColor: theme.palette.text.secondary} }}
            id="search-bar"
            className="text"
            onInput={(e) => {
              setSearchQuery(e.target.value);
            }}
            label="What are you looking for?"
            variant="outlined"
            placeholder="Search..."
            size="small"
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: theme.palette.text.secondary, size:"xl" }} />
          </IconButton>
        </Form>
        <div style={{ padding: 3 }}>
          {dataFiltered.map((d) => (
            <div
              className="text"
              style={{
                padding: 5,
                justifyContent: "normal",
                fontSize: 20,
                color: theme.palette.text.secondary,
                margin: 1,
                width: "250px",
                BorderColor: "green",
                borderWidth: "10px"
              }}
              key={d.id}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
      }
    </>
  )
}

export default DocumentationPage
