import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const Login = () => {

    const handleSubmit = (e) => {
        // const navigate = useNavigate();
        const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
        windows.alert(error);
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);
        createUserWithEmailAndPassword(email, password);
        console.log(user);
    };
    // useEffect(()=>{
    //     if (user) {
    //         navigate("/");
    //     }
    // },[user, navigate]);

    return <Container maxWidth = "xs">
        <Box 
        sx={{
            marginTop: 8, 
            display: "flex",
            flexDirection: "column",  
            justifyContent: "center", 
            alignItems: "center"
            }}
            >
                 <Typography component="h1" variant="h5">
                    Registro
                 </Typography>

                 <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit}>
                    <TextField 
                    margin="normal" 
                    fullWidth 
                    name="email" 
                    label="Email Address"
                    autoComplete="email"
                    />
                    <TextField 
                    margin="normal" 
                    fullWidth 
                    name="password" 
                    label="Password"
                    autoComplete="Off"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>

                 </Box>
            </Box>
    </Container>;
};

export default Login;