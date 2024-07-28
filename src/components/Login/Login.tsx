import { Button, TextField } from "@mui/material";
import './Login.css'

export const Login = () =>{
    return (
        <div className="login-style">
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <Button variant="contained">Contained</Button>
        </div>
    )
}

export default Login;