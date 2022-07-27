import React,{useState} from "react";
import Button from "@material-ui/core/Button";
import { FormControl } from "@material-ui/core";
import { InputLabel, Input } from "@material-ui/core";
import './Header.css';

function Login(props) {

  const onFormSubmitted = (e) => {
    e.preventDefault();
    props.loginHandle({"clicked":true});
    
  };
  
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  
  return (
    <FormControl className="login-form">
    <FormControl onSubmit={onFormSubmitted}>
      <br />
      <InputLabel htmlFor="my-input">Username *</InputLabel>
      <Input id="username" value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        validators={["required"]}
        errorMessages={["required"]}/>
      </FormControl>
      <br />
      <FormControl onSubmit={onFormSubmitted}>
      <br />
      <InputLabel htmlFor="my-input">Password *</InputLabel>
      <Input id="password" 
        value={password}
        validators={["required"]}
        errorMessages={["required"]}  onChange={(e) => {
          setPass(e.target.value);
        }}/>
      </FormControl>
      <br />
      <br />
      <Button type="submit" variant="contained" color="primary" className="login">
        login
      </Button>
    </FormControl>
  );
}

export default Login;