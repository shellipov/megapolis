import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { updateTasks } from '../../redux/actions';
import './style.css';

function DeleteTask(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector((state) => state.tasks);
  async function deleteTask(e) {
    const { id } = e.target.parentNode;
    const responce = await fetch(`https://test.megapolis-it.ru/api/list/${props.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resp = await responce.json();
    if (resp.success) {
      const newTasks = tasks.filter((task) => task.id !== +id);
      dispatch(updateTasks(newTasks));
      history.push('/');
    } else {
      console.log('error');
    }
  }
  return (
    <>
      <button className="deleteButton" onClick={deleteTask} type="button" />
    </>
  );
}

export default DeleteTask;
