import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";




const Test = () => {
    const grades = useLoaderData();
    const [teachers, setTeachers] = useState([]);
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
    console.log(grades)
    console.log(teachers)
    return <>
        
    </>
}

export default Test;