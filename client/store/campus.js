/* -------------------<   ACTIONS   >--------------------- */

const RECEIVE_CAMPUSES = 'RECEIVE_CAMPUSES';

/* ---------------<   ACTION CREATORS   >------------------- */

export const receiveCampusesSync = campuses => ({ type: RECEIVE_CAMPUSES, campuses });

/* -------------------<   REDUCERS   >--------------------- */

let initialState = { allCampuses: [] };

export default function (state = initialState, action) {
  console.log('action', action);
  switch (action.type) {
    case RECEIVE_CAMPUSES:
      return Object.assign({}, state, {allCampuses: action.campuses});
    default:
      return state;
  }
}

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

export const receiveCampuses = () => dispatch => {
  console.log('trying to get campuses')
  axios.get('/api/campuses/')
  .then(res => res.data)
  .then(campuses => dispatch(receiveCampusesSync(campuses)))
  .catch(err => console.error('dang, we hit an error!', err));
};
