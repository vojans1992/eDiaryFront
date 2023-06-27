import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShowSubjects from './data/subject';
import SubjectDetails from './data/SubjectDetails';
import SubjectEdit from './data/SubjectEdit';
import SubjectForm from './data/SubjectForm';
import Test from './data/test'
import ShowGrades from './data/ShowGrades'
import GradeEdit from './data/GradeEdit';
import GradeForm from './data/GradeForm'
import GradeDetails from './data/GradeDetails'

//Vojislav Jovanovic
//https://github.com/vojans1992/zavrsniprojekatiktg2.git - bek
//kad se aplikacija pokrene, potrebno je prvo se ulogovati klikom na link 'login' da bi se moglo pristupiti podacima sa bekenda, a zatim se klikom na link 'subjects' pristupa zadatku
//INSERT INTO `db_final_project`.`user` (`dtype`, `user_id`, `email`, `last_name`, `name`, `password`, `role`) VALUES ('UserEntity', '123', 'neko.neko@gmail.com', 'Prezime', 'Ime', '$2a$12$6XcCYO3k2JIC/C4ca5LQHenIRZIOfvN06u/XiDCY6c.C12.QmnLMq', '1');
//iznad je SQL kod da ne morate da se mucite sa ubacivanjem korisnika u tabelu
//za login se unosi 'neko.neko@gmail.com' u prvo input polje a 'sifra123' u drugo input polje - password je bCrypt-ovan
//takodje nisam znao da namestim da se prilikom prvog citanja stranice prikazu podaci tako da je nakon prvog pristupanja predmetima potrebno ponovo ucitati stranicu.

const getUser = () => {
  let user_r = localStorage.getItem('user')
  let user = JSON.parse(user_r);

  return user;
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'subjects',
        element: <ShowSubjects />,
        loader: async () => {
          return await fetch('http://localhost:8080/api/v1/subjects', {
            method: 'GET',

            headers: {
              'Content-type': 'application/json',
              'Authorization': getUser().token,
            }
          })
        }
      },
      {
        path: "subjects/new_subject",
        element: <SubjectForm />,
      },
      {
        path: "subjects/subject/:id",
        element: <SubjectDetails />,
        loader: async ({ params }) => {
          return fetch(`http://localhost:8080/api/v1/subjects/${params.id}`, {
            method: 'GET',

            headers: {
              'Content-type': 'application/json',
              'Authorization': getUser().token,
            }
          });
        },
      },
      {
        path: "subjects/edit_subject/:id",
        element: <SubjectEdit />,
        loader: async ({ params }) => {
          const subject_r = await fetch(`http://localhost:8080/api/v1/subjects/${params.id}`, {
            method: 'GET',

            headers: {
              'Content-type': 'application/json',
              'Authorization': getUser().token,
            }
          });
          const subject = await subject_r.json();


          return subject;

        },
      },
      {
        path: "grades",
        element: <ShowGrades />,
        loader: async () => {
          if (getUser().role === "ROLE_ADMIN") {
            return await fetch('http://localhost:8080/api/v1/grades', {
              method: 'GET',

              headers: {
                'Content-type': 'application/json',
                'Authorization': getUser().token,
              }

            })
          } else {
            return await fetch('http://localhost:8080/api/v1/teachers/allGrades', {
              method: 'GET',

              headers: {
                'Content-type': 'application/json',
                'Authorization': getUser().token,
              }

            })
          }
        }
      },
      {
        path: "grades/new_grade",
        element: <GradeForm />,
        loader: async () => {
          const departments_r = await fetch("http://localhost:8080/api/v1/teachers/allDepartments", {
            method: 'GET',

            headers: {
              'Content-type': 'application/json',
              'Authorization': getUser().token,
            }
          });
          const departments = await departments_r.json();

          const subjects_r = await fetch("http://localhost:8080/api/v1/teachers/allSubjects", {
            method: 'GET',

            headers: {
              'Content-type': 'application/json',
              'Authorization': getUser().token,
            }
          });
          const subjects = await subjects_r.json();

          const pupils_r = await fetch("http://localhost:8080/api/v1/teachers/allPupils", {
            method: 'GET',

            headers: {
              'Content-type': 'application/json',
              'Authorization': getUser().token,
            }
          });
          const pupils = await pupils_r.json();

          const departmentSubjects_r = await fetch("http://localhost:8080/api/v1/teachers/allDepartmentsAndSubjects", {
            method: 'GET',

            headers: {
              'Content-type': 'application/json',
              'Authorization': getUser().token,
            }
          });
          const departmentSubjects = await departmentSubjects_r.json();

          return [departments, subjects, pupils, departmentSubjects];
        },
      },
      {
        path: "grades/grade/:id",
        element: <GradeDetails />
      },
      {
        path: "grades/edit_grade/:id",
        element: <GradeEdit />,
        loader: async ({ params }) => {
          const grade_r = await fetch(`http://localhost:8080/api/v1/grades/${params.id}`, {
            method: 'GET',

            headers: {
              'Content-type': 'application/json',
              'Authorization': getUser().token,
            }
          });
          const grade = await grade_r.json();


          return grade;

        },
      }
    ]
  },
  {
    path: '/test',
    element: <Test />,
    loader: async () => {
      return await fetch('http://localhost:8080/api/v1/grades', {
        method: 'GET',

        headers: {
          'Content-type': 'application/json',
          'Authorization': getUser().token,
        }
      })
    }
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
