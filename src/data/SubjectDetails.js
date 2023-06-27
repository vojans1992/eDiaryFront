import { Card, CardContent, CardHeader, CardMedia, Container, Grid, Rating, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";

const SubjectDetails = () => {
    const subject = useLoaderData();

    return  <Container>
       <Card sx={{ marginBottom: 3 }} variant="outlined">
        <CardHeader
          sx={{ display: "flex", textAlign: "center", backgroundColor: '#85adad'}}
          title={subject.name}
        />
        <CardMedia
          sx={{ height: 200 }}
          image="https://www.shutterstock.com/image-vector/paper-books-open-closed-academic-260nw-2167688463.jpg"
          title={subject.name}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: '#85adad'
          }}
        >
          
          <Typography>{subject.name} for pupils of the {subject.year} with a weekly class load of {subject.classLoad}</Typography>
        </CardContent>
       
      </Card>
    </Container>
    
   
}

export default SubjectDetails;