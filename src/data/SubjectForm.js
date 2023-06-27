import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Button,
    Rating,
    Select,
    TextField,
    Typography,
    Container,
    FormHelperText,
    Stack,
    Chip,
    Autocomplete
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubjectForm = () => {
    const [name, setName] = useState("");
    const [classLoad, setClassLoad] = useState(0);
    const [year, setYear] = useState("");

    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter the ";
    const [nameError, setNameError] = useState("");
    const [classLoadError, setClassLoadError] = useState("");
    const [yearError, setYearError] = useState("");
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);


  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
      setIsLogin(true);
    }
  }, [isLogin])

    const save = async () => {
        if (name == "" || classLoad == 0 || year == "") {
            setGlobalError("Please fill all fields in the form");
            return;
        }

        const new_subject = {
            name: name,
            classLoad: classLoad,
            year: year
        };
        let response = await fetch("http://localhost:8080/api/v1/subjects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": user.token
            },
            body: JSON.stringify(new_subject),
        });
        if (response.ok) {
            let d = await response.json();
            alert("Successfully added a new subject.");
            navigate("/subjects");
        } else {
            console.log("Subject adding failed.");
        }
    };

    const checkYear = (year) => {
        let schoolYears = ['FIRST_YEAR', 'SECOND_YEAR', 'THIRD_YEAR', 'FOURTH_YEAR', 'FIFTH_YEAR', 'SIXTH_YEAR', 'SEVENTH_YEAR', 'EIGHT_YEAR']
        if (schoolYears.includes(year)) {
            setYearError("");
        } else {
            setYearError(
                `${errorMessageTemplate} valid year.`
            );
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                sx={{
                    display: "flex",
                    gap: "10px",
                    "flex-direction": "column",
                    "align-items": "center",
                    "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="Subject name"
                    placeholder="Subject name"
                    helperText={nameError}
                    error={nameError === "" ? false : true}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (e.target.value !== "") setNameError("");
                        else setNameError(errorMessageTemplate + " name of the subject.");
                    }}
                />
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-class-load-input"
                    label="Class load"
                    placeholder="Class load"
                    type="number"
                    error={classLoadError}
                    helperText={classLoadError}
                    onChange={(e) => {
                        setClassLoad(e.target.value);
                        if (e.target.value < 1 || e.target.value > 5)
                            setClassLoadError(
                                errorMessageTemplate +
                                "valid Class Load."
                            );
                        else setClassLoadError("");
                    }}
                />
                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    id="outlined-year-input"
                    label="Year"
                    placeholder="Year"
                    required
                    error={yearError}
                    helperText={yearError ? yearError + "Example: FIRST_YEAR, SECOND_YEAR, ..., EIGTH_YEAR" : " "}
                    onChange={(e) => {
                        setYear(e.target.value);
                        checkYear(e.target.value);
                    }}
                />
                <Button
                    onClick={save}
                    disabled={
                        nameError || yearError || classLoadError
                    }
                >
                    {" "}
                    Save{" "}
                </Button>
                <FormHelperText error={globalError}>{globalError}</FormHelperText>
            </Box>
        </Container>
    );
};

export default SubjectForm;
