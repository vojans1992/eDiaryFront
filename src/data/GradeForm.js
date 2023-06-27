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
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const GradeForm = () => {
  const [value, setValue] = useState(0);
  const [semester, setSemester] = useState("");
  const [segment, setSegment] = useState("");
  const [pupilId, setPupilId] = useState(0);
  const [subjectId, setSubjectId] = useState(0);
  const [defValue, setDefValue] = useState("0");
  const [defValueInt, setDefValueInt] = useState(0)
  let selectedPupil = null;
  const [globalError, setGlobalError] = useState(false);
  const errorMessageTemplate = "Please enter the ";
  const [valueError, setValueError] = useState(false);
  const [semesterError, setSemesterError] = useState("");
  const [segmentError, setSegmentError] = useState("");
  const [pupilIdError, setPupilIdError] = useState(false);
  const [subjectIdError, setSubjectIdError] = useState(false);
  const loader_data = useLoaderData(); // [departments, subjects, pupils]

  const departments = loader_data[0];
  const subjects = loader_data[1];
  const pupils = loader_data[2];
  const departmentSubjects = loader_data[3];
  const [pupilSubjects, setPupilSubjects] = useState([]);
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

  useEffect(() => {
    let pupil = pupils.find(x => x.id === pupilId)
    selectedPupil = pupil;
    console.log(pupil)
    if (pupil !== undefined) {
      let depId = pupil.department.id;
      setPupilSubjects(departmentSubjects[depId]);
      console.log(pupilSubjects)
    }

  }, [pupilId])

  const save = async () => {
    if (value == 0 || semester == "" || segment == "" || pupilId == 0 || subjectId == 0) {
      setGlobalError("Please fill all fields in the form");
      return;
    }

    const new_grade = {
      value: value,
      semester: semester,
      segment: segment,
      pupilId: pupilId,
      subjectId: subjectId
    };
    let response = await fetch("http://localhost:8080/api/v1/grades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
      body: JSON.stringify(new_grade),
    });
    if (response.ok) {
      let d = await response.json();
      alert("Success");
      navigate("/grades");
    } else {
      console.log("Adding new grade failed.");
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
        {/* <FormControl sx={{width:'100%'}}> */}

        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Semester"
          placeholder="Semester"
          helperText={semesterError}
          error={semesterError === "" ? false : true}
          onChange={(e) => {
            setSemester(e.target.value);
            if (e.target.value !== "" && (e.target.value === "FIRST_SEMESTER" || e.target.value === "SECOND_SEMESTER")) setSemesterError("");
            else setSemesterError(errorMessageTemplate + " semester of the grade. Can be either FIRST_SEMESTER or SECOND_SEMESTER");
          }}
        />
        <TextField
          sx={{ width: "100px" }}
          fullWidth
          required
          id="outlined-segment-input"
          label="Segment"
          placeholder="Segment"
          error={segmentError}
          helperText={segmentError}
          onChange={(e) => {
            setSegment(e.target.value);
            if (e.target.value === "")
              setSegmentError(
                errorMessageTemplate +
                "valid segment name."
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
          <Typography>Rating</Typography>
          <Rating
            required
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </FormControl>
        <FormControl
          sx={{ width: "100%", marginBottom: "15px" }}
          error={pupilIdError}
        >
          <InputLabel id="demo-select-small-label">Pupil</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="pupil-select"
            label="Pupil"
            required
            onChange={(e) => {
              setPupilId(e.target.value);
              if (e.target.value == 0) {
                setPupilIdError(true);
              } else {
                setPupilIdError(false);
              }
            }}
            value={pupilId}
          >
            <MenuItem value={defValueInt}>
              <em>None</em>
            </MenuItem>
            {pupils.map((p) => (
              <MenuItem value={p.id}> {p.email}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{pupilIdError}</FormHelperText>
        </FormControl>

        {pupilId !== 0 ? <FormControl
          sx={{ width: "100%", marginBottom: "15px" }}
          error={subjectIdError}
        >
          <InputLabel id="demo-select-small-label2">Subject</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="subject-select"
            label="Subject"
            required
            onChange={(e) => {
              setSubjectId(e.target.value);
              if (e.target.value == 0) {
                setSubjectIdError(true);
              } else {
                setSubjectIdError(false);
              }
            }}
            value={subjectId}
          >
            <MenuItem value={defValueInt}>
              <em>None</em>
            </MenuItem>
            {pupilSubjects.map((s) => (
              <MenuItem value={s.id}> {s.name} </MenuItem>
            ))}
          </Select>
          <FormHelperText>{subjectIdError}</FormHelperText>
        </FormControl> : <></>}


        <Button
          onClick={save}
          disabled={
            valueError || segmentError || semesterError || subjectIdError || pupilIdError
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

export default GradeForm;
