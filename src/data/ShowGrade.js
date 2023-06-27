import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { useEffect, useState } from "react";


const ShowGrade = ({ grade, onDelete }) => {
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


  const logout = () => {
    localStorage.removeItem('user');
    setIsLogin(false);
    navigate('/')
  }

  const deleteGrade = async () => {
    let response = await fetch(`http://localhost:8080/api/v1/grades/${grade.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
    });
    if (response.ok) {
      let d = response;
      console.log("Success.");
      onDelete(grade.id);
    } else {
      console.log("Deleting grade failed.");
    }
  };

  return (
    <Grid item xs={4}>
      <Card sx={{ marginBottom: 3 }} variant="outlined">
        <CardHeader
          sx={{ display: "flex", textAlign: "center", backgroundColor: '#85adad' }}
          title={grade.subject.name}
        />
        <CardMedia
          sx={{ height: 140 }}
          image="https://www.lcsnc.org/cms/lib/NC01911169/Centricity/Domain/47/Grades.jpg"
          title={grade.id}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography fontSize={25}>{grade.pupil.name}</Typography>

          <Grid container spacing={3} alignItems='center' justifyContent='space-between' sx={{ padding: '5px' }}>

            <Grid item xs={6} >
              Teacher
            </Grid>
            <Grid item xs={6}>
              {grade.teacher.name}
            </Grid>

            <Grid item xs={6} >
              Subject
            </Grid>
            <Grid item xs={6}>
              {grade.subject.name}
            </Grid>

            {/* <Grid item xs={6} >
                Semester
            </Grid>
            <Grid item xs={6}>
                {grade.semester}
            </Grid>
            <Grid item xs={6} >
                Segment
            </Grid>
            <Grid item xs={6}>
                {grade.segment}
            </Grid>
            <Grid item xs={6} >
                Date
            </Grid>
            <Grid item xs={6}>
                {grade.date}
            </Grid> */}
            <Grid item xs={6} >
              Rating
            </Grid>
            <Grid item xs={6}>
              <Rating value={grade.value} readOnly />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Info">
            <IconButton
              aria-label="info"
              onClick={() => navigate(`grade/${grade.id}`, { state: { grade: grade } })}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>

          {isLogin && user.role === "ROLE_TEACHER" ? <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={() => navigate(`edit_grade/${grade.id}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip> : <></>}

          {isLogin && user.role === "ROLE_TEACHER" ? <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteGrade}>
              <DeleteIcon />
            </IconButton>
          </Tooltip> : <></>}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ShowGrade;
