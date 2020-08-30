import {
  PUT_TASKS, UPDATE_TASKS, ADD_NEW_TASK
} from '../actionsType';

const init = {
  tasks: [],
  error: '',
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case PUT_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case UPDATE_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ADD_NEW_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    default: return state;
  }
}
