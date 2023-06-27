import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import ShowGrade from './ShowGrade'


const ShowGrades = () => {
    const grades = useLoaderData();
    const [showGrades, setShowGrades] = useState(grades);
    const [subjects, setSubjects] = useState([]);
    const [pupils, setPupils] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
      setIsLogin(true);
    }
  }, [isLogin])

    const navigate = useNavigate();

    useEffect(() => {
        const getSubjects = () => {
            let result = grades.filter((a, i) => grades.findIndex((s) => a.subject.id === s.subject.id) === i)
            let subjects = [];
            result.forEach(e => {
                subjects.push(e.subject)
            });
            setSubjects(subjects);
        };
        getSubjects()
    }, []);

    useEffect(() => {
        const getPupils = () => {
            let result = grades.filter((a, i) => grades.findIndex((s) => a.pupil.id === s.pupil.id) === i)
            let pupils = [];
            result.forEach(e => {
                pupils.push(e.pupil)
            });
            setPupils(pupils);
        };
        getPupils()
    }, []);

    useEffect(() => {
        const getTeachers = () => {
            let result = grades.filter((a, i) => grades.findIndex((s) => a.teacher.id === s.teacher.id) === i)
            let teachers = [];
            result.forEach(e => {
                teachers.push(e.teacher)
            });
            setTeachers(teachers);
        };
        getTeachers()
    }, []);

    const filterBySubject = (e) => {
        if (e.target.value == 0) {
            setShowGrades(grades);
        } else {
            const selectSubject = subjects.find((s) => s.id == e.target.value);
            const filterGrades = grades.filter((g) => g.subject.name === selectSubject.name);
            setShowGrades(filterGrades);
        }
    };

    const filterByPupil = (e) => {
        if (e.target.value == 0) {
            setShowGrades(grades);
        } else {
            const selectPupil = pupils.find((p) => p.id == e.target.value);
            const filterGrades = grades.filter((g) => g.pupil.email === selectPupil.email);
            setShowGrades(filterGrades);
        }
    };

    const filterByTeacher = (e) => {
        if (e.target.value == 0) {
            setShowGrades(grades);
        } else {
            const selectTeacher = teachers.find((t) => t.id == e.target.value);
            const filterGrades = grades.filter((g) => g.teacher.email === selectTeacher.email);
            setShowGrades(filterGrades);
        }
    };

    const handleDelete = (gradeId) => {
        console.log(gradeId)
        const fb = showGrades.filter((g) => g.id != gradeId);
        setShowGrades(fb);
    };

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 3,
                }}
            >

                <FormControl sx={{ width: '30%' }}>
                    <InputLabel id="demo-select-small-label">Subject</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="subject-select"
                        label="Subject"
                        onChange={filterBySubject}

                    >
                        <MenuItem value="0">
                            <em>None</em>
                        </MenuItem>
                        {subjects.map((s) => (
                            <MenuItem value={s.id}> {s.name} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '30%' }}>
                    <InputLabel id="demo-select-small-label">Pupil</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="pupil-select"
                        label="Pupil"
                        onChange={filterByPupil}

                    >
                        <MenuItem value="0">
                            <em>None</em>
                        </MenuItem>
                        {pupils.map((p) => (
                            <MenuItem value={p.id}> {p.email} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {isLogin && user.role !== "ROLE_TEACHER" ? <FormControl sx={{ width: '30%' }}>
                    <InputLabel id="demo-select-small-label">Teacher</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="teacher-select"
                        label="Teacher"
                        onChange={filterByTeacher}

                    >
                        <MenuItem value="0">
                            <em>None</em>
                        </MenuItem>
                        {teachers.map((t) => (
                            <MenuItem key={t.id} value={t.id}> {t.email} </MenuItem>
                        ))}
                    </Select>
                </FormControl> : <></>}
                {isLogin && user.role === "ROLE_TEACHER" ? <Button variant="outlined" onClick={() => navigate("new_grade", { state: { grades: grades } })}>
                    {" "}
                    Add new grade{" "}
                </Button> : <></>}
            </Box>
            <Grid container spacing={3}>
                {showGrades.map((g) => (
                    <ShowGrade grade={g} onDelete={handleDelete} />
                ))}
            </Grid>
            {/* </div> */}
        </Container>
    );
};

export default ShowGrades;
