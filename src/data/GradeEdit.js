import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Rating, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const GradeEdit = () => {
  const grade = useLoaderData();
  console.log(grade)
  const navigate = useNavigate();

  const [value, setValue] = useState(grade.value);
  const [semester, setSemester] = useState(grade.semester);
  const [segment, setSegment] = useState(grade.segment);
  const [pupil, setPupil] = useState(grade.pupil);
  const [subject, setSubject] = useState(grade.subject)

  const [globalError, setGlobalError] = useState(false);
  const errorMessageTemplate = "Please enter the ";
  const [valueError, setValueError] = useState(0);
  const [semesterError, setSemesterError] = useState("");
  const [segmentError, setSegmentError] = useState("");

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
    if (value == 0 || semester == "" || segment == "") {
      setGlobalError("Please fill all fields in the form");
      return;
    }

    const new_grade = {
      value: value,
      semester: semester,
      segment: segment,
      pupilId: pupil.id,
      subjectId: subject.id
    };
    let response = await fetch(`http://localhost:8080/api/v1/grades/${grade.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
      body: JSON.stringify(new_grade),
    });
    console.log(response);
    if (response.ok) {
      let d = await response.json();
      console.log(JSON.stringify(d));
      alert("Successfully edited grade.");
      navigate("/grades");
    } else {
      console.log("Grade edit failed.");
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
          label="Semester"
          value={semester}
          helperText={semesterError}
          error={semesterError === "" ? false : true}
          onChange={(e) => {
            setSemester(e.target.value);
            if (e.target.value !== "") setSemesterError("");
            else setSemesterError(errorMessageTemplate + " semester. Possible values are FIRS_SEMESTER and SECOND_SEMESTER");
          }}
        />
        <TextField
          sx={{ width: "100px" }}
          fullWidth
          required
          id="outlined-segment-input"
          label="Segment"
          value={segment}
          error={segmentError}
          helperText={segmentError}
          onChange={(e) => {
            setSegment(e.target.value);
            if (e.target.value === "")
              setSegmentError(
                errorMessageTemplate +
                "valid segment."
              );
            else setSegmentError("");
          }}
        />

        <FormControl
          component="div"
          sx={{
            width: "100%",
            height: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "5px",
          }}
        >
          <Typography>Value</Typography>
          <Rating
            required
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </FormControl>

        <Button
          onClick={update}
          disabled={
            segmentError || semesterError || valueError
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

export default GradeEdit;
