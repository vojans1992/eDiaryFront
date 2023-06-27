import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import './subject.css'
import ShowSubject from "./showSubject";
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";


const ShowSubjects = () => {
    
    
    const result = useLoaderData();
    const [subjects, setSubjects] = useState(result);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const years = ['FIRST_YEAR', 'SECOND_YEAR', 'THIRD_YEAR', 'FOURTH_YEAR', 'FIFTH_YEAR', 'SIXTH_YEAR', 'SEVENTH_YEAR', 'EIGHT_YEAR']

    const filterByYear = (e) => {
        if (e.target.value == 0) {
          setSubjects(result);
        } else {
          const selectYear = e.target.value;
          const filterSubjects = result.filter((s) => s.year === selectYear);
          setSubjects(filterSubjects);
        }
      };

    

    useEffect(() => {
        if(search === '') {
            setSubjects(result);
        }else {
            setSubjects(result.filter((s) => s.name.toUpperCase().includes(search.toUpperCase())));
        }
    }, [search])

    const handleDelete = (subjectId) => {
        const fb = subjects.filter((s) => s.id != subjectId);
        setSubjects(fb);
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
           
            <FormControl sx={{width: '30%'}}>
              <InputLabel id="demo-select-small-label">Year</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="year-select"
                label="Year"
                onChange={filterByYear}
                
              >
                <MenuItem value="0">
                  <em>All years</em>
                </MenuItem>
                {years.map((y) => (
                  <MenuItem key={y} value={y}> {y} </MenuItem>
                ))}
              </Select>
            </FormControl><Button variant="outlined" onClick={() => navigate("new_subject")}>
              {" "}
              Add new subject{" "}
            </Button>
          </Box>
          <Grid container spacing={3}>
            {subjects.map((s) => (
              <ShowSubject subject={s} onDelete={handleDelete} />
            ))}
          </Grid>
          {/* </div> */}
        </Container>
      );
}

export default ShowSubjects;
