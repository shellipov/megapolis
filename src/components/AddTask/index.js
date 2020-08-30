import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTask } from '../../redux/actions';
import './style.css';

function AddTask() {
  const [addTaskflag, setAddTaskflag] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  function changeAddTaskFlag() {
    setAddTaskflag(!addTaskflag);
    setMessage('');
  }

  async function addNew(e) {
    e.preventDefault();
    const task = e.target.taskName.value;
    const responce = await fetch('https://test.megapolis-it.ru/api/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: task,
      }),
    });
    const resp = await responce.json();
    const newTask = { title: task, id: resp.id };
    if (resp.success) {
      setAddTaskflag(!addTaskflag);
      setMessage('');
      dispatch(addNewTask(newTask));
    } else {
      setMessage(resp.error);
    }
  }

  return (
    <>
      <button className="addButton" type="button" onClick={changeAddTaskFlag}>Добавить</button>
      {addTaskflag
        ? (
          <>
            <form className="addForm" onSubmit={addNew}>
              <div className="head">
                <div>Краткое описание</div>
                <button className="closeButton" onClick={changeAddTaskFlag} type="button" />
              </div>
              <input className="input" id="newTaskInput" name="taskName" />
              <div className="error">{message}</div>
              <button className="button" type="submit">Создать</button>
            </form>
          </>
        )
        : (
          <>
          </>
        )}
    </>
  );
}

export default AddTask;
