import {
  PUT_TASKS, UPDATE_TASKS, ADD_NEW_TASK,
} from './actionsType';

export function putTasks(tasks) {
  return {
    type: PUT_TASKS,
    payload: tasks,
  };
}

export function updateTasks(tasks) {
  return {
    type: UPDATE_TASKS,
    payload: tasks,
  };
}
export function addNewTask(task) {
  return {
    type: ADD_NEW_TASK,
    payload: task,
  };
}
