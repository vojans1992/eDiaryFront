import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Rating, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const SubjectEdit = () => {
    const subject = useLoaderData();
    const navigate = useNavigate();

    const [name, setName] = useState(subject.name);
    const [classLoad, setClassLoad] = useState(subject.classLoad);
    const [year, setYear] = useState(subject.year);

    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter the ";
    const [titleError, setTitleError] = useState("");
    const [nameError, setNameError] = useState("");
    const [yearError, setYearError] = useState("");
    const [classLoadError, setClassLoadError] = useState(0);

    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);


    useEffect(() => {
        const u = localStorage.getItem("user");
        if (u) {
            setUser(JSON.parse(u));
            setIsLogin(true);
        }
    }, [isLogin])

    const update = async () => {
        if (name == "" || year == "" || classLoad == 0) {
            setGlobalError("Please fill all fields in the form");
            return;
        }

        const new_subject = {
            name: name,
            classLoad: classLoad,
            year: year
        };
        let response = await fetch(`http://localhost:8080/api/v1/subjects/${subject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": user.token
            },
            body: JSON.stringify(new_subject),
        });
        if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d));
            alert("Success.");
            navigate("/subjects");
        } else {
            console.log("Subject update failed.");
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

    // forma
    // u svakom input polju smo definisali onChange dogadjaj kako bismo pokupili podatke koje je korisnik uneo

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
                    value={name}
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
                    label="Class Load"
                    type="number"
                    value={classLoad}
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
                    value={year}
                    required
                    error={yearError}
                    helperText={yearError ? yearError + "Example: FIRST_YEAR, SECOND_YEAR, ..., EIGTH_YEAR" : ' '}
                    onChange={(e) => {
                        setYear(e.target.value);
                        checkYear(e.target.value);
                    }}
                />

                <Button
                    onClick={update}
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

export default SubjectEdit;
