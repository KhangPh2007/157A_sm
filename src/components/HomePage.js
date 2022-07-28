
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import Grow from "@mui/material/Grow";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

import FormControlLabel from "@mui/material/FormControlLabel";

import Checkbox from "@mui/material/Checkbox";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


import { useAuth } from "../App";



const axios = require("axios");

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function HomePage() {
    let auth = useAuth()

    console.log("auth homepage", auth)

const [open, setOpen] = React.useState(false);
// Set when onclick in placeholder
const [searchBy, setSearchBy] = React.useState("title");
const anchorRef = React.useRef(null);
//Store value for input var
const [searchText, setSearchText] = React.useState("");


const [foundBooks, setFoundBooks] = React.useState([]);

// For Publish Book
const [openPublishBook, setOpenPublishBook] = React.useState(false);
const handleOpenPublishBook = () => setOpenPublishBook(true);
const handleClosePublishBook = () => setOpenPublishBook(false);

// For add new Book
const [inputaID, setInputaID] = React.useState("");
const [inputTitle, setInputTitle] = React.useState("");
const [inputISBN, setInputISBN] = React.useState("");
const [inputPublishDate, setInputPublishDate] = React.useState("");
const [inputPublishName, setInputPublishName] = React.useState("");
const [inputAuthor, setInputAuthor] = React.useState("");


// for submit book handle date
const submitBook = () => {
  if (inputaID === "") alert("No value aID");
  if (inputTitle === "") alert("No value Title");
  if (inputISBN === "") alert("No value ISBN");
  if (inputPublishDate === "") alert("No value Publish Date");
  if (inputPublishName === "") alert("No value Publish Name");
  if (inputAuthor === "") alert("No value Author");
  return;
}

const handleToggle = () => {
  setOpen((prevOpen) => !prevOpen);
};
// fetch db backend
async function fetchBook() {
  try {
    // const response = await axios.get("http://localhost:8080/api/books/author/");

    const response = await axios.get(`http://localhost:8080/api/books/${searchBy}/${searchText}`);
    console.log("Response", response.data);
    setFoundBooks(response.data);
  } catch (error) {
    console.error(error);
    alert("No Book match")
  }
}

const handleClose = (searchBy) => {
  console.log(searchBy);
  setSearchBy(searchBy.toLowerCase());
  setOpen(false);
};
// Call to backend for function
const submitSearchBook = () => {
  // alert("Submit Find Book")
  if (searchText === "") {
    alert("No value input")
    return
  }
  console.log(searchBy);
  console.log(searchText);

  // make AIP call function fetchBook
  //  const result = fetchBook()
  fetchBook();
};

function handleListKeyDown(event) {
  if (event.key === "Tab") {
    event.preventDefault();
    setOpen(false);
  } else if (event.key === "Escape") {
    setOpen(false);
  }
}

// return focus to the button when we transitioned from !open -> open
const prevOpen = React.useRef(open);
React.useEffect(() => {
  if (prevOpen.current === true && open === false) {
    anchorRef.current.focus();
  }

  prevOpen.current = open;
}, [open]);

//Call everytime at the beginning
// React.useEffect(() => {
//   fetchBook()
// }, []);


const submitNewBookForm = () =>{
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Enter Book Information:
      </Typography>
      <Box
        // onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          onChange={(changeEvent) => {
            setInputaID(changeEvent.target.value);
          }}
          margin="normal"
          required
          fullWidth
          id="aID"
          label="aID"
          name="aID"
          value={inputaID}
        />
        <TextField
          onChange={(changeEvent) => {
            setInputTitle(changeEvent.target.value);
          }}
          margin="normal"
          required
          fullWidth
          name="Title"
          label="Title"
          type="Title"
          id="Title"
          value={inputTitle}
        />
        <TextField
          onChange={(changeEvent) => {
            setInputISBN(changeEvent.target.value);
          }}
          margin="normal"
          required
          fullWidth
          name="ISBN"
          label="ISBN"
          type="ISBN"
          id="ISBN"
          value={inputISBN}
        />
        <TextField
          onChange={(changeEvent) => {
            setInputPublishDate(changeEvent.target.value);
          }}
          margin="normal"
          required
          fullWidth
          name="Publish-Date"
          label="Publish-Date"
          type="Publish-Date"
          id="Publish-Date"
          value={inputPublishDate}
        />
        <TextField
          onChange={(changeEvent) => {
            setInputPublishName(changeEvent.target.value);
          }}
          margin="normal"
          required
          fullWidth
          name="Publish-Name"
          label="Publish-Name"
          type="Publish-Name"
          id="Publish-Name"
          value={inputPublishName}
        />
        <TextField
          onChange={(changeEvent) => {
            setInputAuthor(changeEvent.target.value);
          }}
          margin="normal"
          required
          fullWidth
          name="Author"
          label="Author"
          type="Author"
          id="Author"
          value={inputAuthor}
        />
        <Button
          // onClick={() => SubmitNewBookForm()}
          // type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit Book
        </Button>
        <Grid container>
          <Grid item></Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        author
      </Typography>
      <Typography variant="h5" component="div">
        Book name
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        ISBN
      </Typography>
    </CardContent>
  </React.Fragment>
);

  return (
    <div>
      <div align="center">
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          align="center"
        >
          <Item>Welcome to, username</Item>
          <Button onClick={handleOpenPublishBook} >Publish Book</Button>
          {/* <Item>Item 3</Item> */}
        </Stack>
      </div>

      <Modal
        open={openPublishBook}
        onClose={handleClosePublishBook}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new Book
          </Typography>
            {submitNewBookForm()}
        </Box>
      </Modal>

      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <Stack direction="row" spacing={2}>
          <div>
            <MenuIcon
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            />
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={() => handleClose("Title")}>
                          Title
                        </MenuItem>
                        <MenuItem onClick={() => handleClose("Author")}>
                          Author
                        </MenuItem>
                        <MenuItem onClick={() => handleClose("ISBN")}>
                          ISBN
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Stack>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={`Searching by ${searchBy}`}
          // onChange= {(changeEvent) => {console.log(changeEvent.target.value)}}
          onChange={(changeEvent) => {
            setSearchText(changeEvent.target.value);
          }}
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
        ></IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
        ></IconButton>

        {/* Find function */}
        <Button onClick={submitSearchBook} variant="contained">
          Find Book
        </Button>
      </Paper>

      <Divider></Divider>

      <Paper>
        {foundBooks.map((book) => (
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              {" "}
              <React.Fragment>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {book.Author}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {book.Title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    ISBN: {book.ISBN}
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
        ))}
      </Paper>

      {console.log(foundBooks)}
    </div>
  );
}
