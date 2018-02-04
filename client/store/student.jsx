/* -------------------<   ACTIONS   >--------------------- */

const ADD_STUDENT   = 'ADD_STUDENT';
const RECEIVE_STUDENTS = 'RECEIVE_STUDENTS';
const RECEIVE_SOME_STUDENTS = 'RECEIVE_SOME_STUDENTS';

/* ---------------<   ACTION CREATORS   >------------------- */

export const addStudentSync = student => ({ type: ADD_STUDENT, student });
export const receiveStudentsSync = allStudents => ({ type: RECEIVE_STUDENTS, allStudents });
export const receiveSomeStudentsSync = allStudents => ({ type: RECEIVE_SOME_STUDENTS, allStudents });

/* -------------------<   REDUCERS   >--------------------- */

let initialState = { allStudents: [] };

export default function students (state = initialState, action) {
  console.log(action)
  console.log(state.allStudents)
  switch (action.type) {
    case ADD_STUDENT:
      return Object.assign({}, state, {allStudents: state.allStudents.concat(action.student)});
    case RECEIVE_STUDENTS:
      return Object.assign({}, state, {allStudents: action.allStudents});
    case RECEIVE_SOME_STUDENTS:
      return Object.assign({}, state, {allStudents: action.allStudents});
    default:
      return state;
  }
}

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

export const addStudent = (obj) => dispatch => {
  axios.post('/api/users/', {
    name: obj.name,
    email: obj.email,
    campusId: obj.campusId
  })
  .then(res => res.data)
  .then(newStudent => {
    dispatch(addStudentSync(newStudent));
  })
  .catch(err => console.error('dang, we hit an error!', err));
};

export const receiveStudents = () => dispatch => {
  axios.get('/api/users/')
  .then(res => res.data)
  .then(allStudents => dispatch(receiveStudentsSync(allStudents)))
  .catch(err => console.error('dang, we hit an error!', err));
};

export const receiveSomeStudents = (id) => dispatch => {
  axios.get(`/api/campuses/${id}`)
  .then(res => res.data)
  .then(allStudents => dispatch(receiveSomeStudentsSync(allStudents)))
  .catch(err => console.error('dang, we hit an error!', err));
};

