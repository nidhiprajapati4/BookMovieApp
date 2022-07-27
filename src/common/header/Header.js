import React from "react";
import './Header.css';
import { Link } from "react-router-dom";
import Logo  from "../../assets/logo.svg";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Login from './Login.js';
import Register from './Register.js';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          
            <div>{children}</div>
          
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const Header = (props) => {

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [isLogin, setIslogin] = React.useState(false);
    const [value, setValue] = React.useState(0);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleisLogin = (e) => {
      if(e.clicked){
        setIslogin(!isLogin);
      }
    };
  
    const body = (
      <div style={modalStyle} className="modalContainer">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
  
        <TabPanel value={value} index={0}>
          <Login {...props} loginHandle={handleisLogin} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register {...props} />
        </TabPanel>
      </div>
    );

    return (
        <div className="header">
        <Link to="/">
        <div className="logo">
                <img src = {Logo} alt="logo"/>
            </div>
        </Link>  

        {props.bookShow? <Link to={"/bookshow/"+props.bookShow}>
              <Button variant="contained" color="primary">
                  Book Show
              </Button>
              </Link>:""
        }
            
        <Button variant="contained" className= "login" onClick={(!isLogin)?handleOpen:()=>handleisLogin({"clicked":true})}>
          {(!isLogin)?"Login":"logout"}
        </Button>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    );
  };
  
  export default Header;