import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardMedia, Container, Grid, Rating, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";

const GradeDetails = () => {
    const location = useLocation();
    const grade = location.state.grade;

    return  <Container>
       <Card sx={{ marginBottom: 3 }} variant="outlined">
        <CardHeader
          sx={{ display: "flex", textAlign: "center", backgroundColor: '#85adad' }}
          title={grade.subject.name}
        />
        <CardMedia
          sx={{ height: 400 }}
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
        
          <Grid container spacing={3} direction='row' alignItems='center' justifyContent='center'  sx={{padding: '5px', maxWidth: '50%'}}> 
            <Grid item xs={6}>
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
                Subject
            </Grid>
            <Grid item xs={6}>
                {grade.subject.name}
            </Grid>
            <Grid item xs={6} >
                Teacher
            </Grid>
            <Grid item xs={6}>
                {grade.teacher.name}
            </Grid>
            <Grid item xs={6} >
                Date
            </Grid>
            <Grid item xs={6}>
                {grade.date}
            </Grid>
            <Grid item xs={6} >
                Rating
            </Grid>
            <Grid item xs={6}>
                <Rating value={grade.value} readOnly />
            </Grid>
          </Grid>
        </CardContent>
       
      </Card>
    </Container>
    
    
}

export default GradeDetails;