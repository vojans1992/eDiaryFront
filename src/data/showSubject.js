import { useNavigate } from "react-router-dom";
import './subject_card.css'
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



const ShowSubject = ({ subject, onDelete }) => {
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

  const deleteSubject = async () => {
    let response = await fetch(`http://localhost:8080/api/v1/subjects/${subject.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
    });
    if (response.ok) {
      let d = await response;
      onDelete(subject.id);
    } else {
    }
  };

  return (
    <Grid item xs={4}>
      <Card sx={{ marginBottom: 3 }} variant="outlined">
        <CardHeader
          sx={{ display: "flex", textAlign: "center", backgroundColor: "#85adad" }}
          title={subject.name}
        />
        <CardMedia
          sx={{ height: 140 }}
          image="https://i.pinimg.com/736x/2b/3c/df/2b3cdfc311a8874e1a70b9a1eee6f89a.jpg"
          title={subject.name}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        
          <Grid container spacing={3} alignItems='center' justifyContent='space-between' sx={{padding: '5px'}}> 
            <Grid item xs={6} >
                Year
            </Grid>
            <Grid item xs={6}>
                {subject.year}
            </Grid>

            <Grid item xs={6} >
                Class Load
            </Grid>
            <Grid item xs={6}>
                {subject.classLoad}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Info">
            <IconButton
              aria-label="info"
              onClick={() => navigate(`subject/${subject.id}`)}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={() => navigate(`edit_subject/${subject.id}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteSubject}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  );

};

export default ShowSubject;
