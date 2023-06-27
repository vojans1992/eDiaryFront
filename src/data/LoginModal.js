import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, TextField } from "@mui/material"
import { useState } from "react";


// roditelj -> dete => props -> atribut=vrednost
// roditelj <- dete => funkcije

const LoginModal = ({ show, handleCloseModal }) => {
    const [open, setOpen] = useState(show);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();


    const closeModal = () => {
        setOpen(false);
        handleCloseModal(); //f-ja koja se nalazi u roditelju odnosno u APP komponenti, promenicemo stanje da se modal ne prikazuje
    }



    const login = async () => {
        try {
            let result = await fetch(`http://localhost:8080/api/v1/users/login?user=${email}&password=${password}`, {
                method: 'POST'
            })
            if (!result.ok) {
                setErrorMessage('Wrong credentials.');
            } else {
                let resultJson = await result.json()
                localStorage.setItem("user", JSON.stringify({
                    email: resultJson.user,
                    token: resultJson.token,
                    name: resultJson.name,
                    role: resultJson.role
                }));
                closeModal();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return <Dialog open={open}>
        <DialogTitle> Login </DialogTitle>
        <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", margin: "10px" }}>
                <TextField
                    required placeholder="Username" label='Username'
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ width: '100%' }} />

                <TextField
                    required placeholder="Password" label='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ width: '100%' }} type='password' />

                <FormHelperText error={errorMessage}> {errorMessage}</FormHelperText>
            </Box>

        </DialogContent>
        <DialogActions>
            <Button onClick={login}> Login </Button>
            <Button onClick={closeModal}> Cancel </Button>
        </DialogActions>
    </Dialog>

}

export default LoginModal;