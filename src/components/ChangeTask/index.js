import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Delete from '../Delete';
import { putTasks } from '../../redux/actions';
import './style.css';

function ChangeTask() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const stateTasks = useSelector((state) => state.tasks);
  const [taskValue, setTaskValue] = useState({ id: '', title: '' });
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState('');

  function changeTaskInput(e) {
    setTaskValue({ id: taskValue.id, title: e.target.value });
    setChanged(true);
  }

  useEffect(() => {
    (async () => {
      const response = await fetch('https://test.megapolis-it.ru/api/list');
      const { data } = await response.json();
      dispatch(putTasks(data));
      const oneTask = data.filter((task) => task.id === +id)[0];
      setTaskValue(oneTask);
    })();
  }, [dispatch, id]);

  function goHome() {
    history.push('/');
  }

  async function change(e) {
    e.preventDefault();
    const responce = await fetch(`https://test.megapolis-it.ru/api/list/${taskValue.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: taskValue.title,
      }),
    });
    const resp = await responce.json();
    if (resp.success) {
      const taskIndex = stateTasks.findIndex((task) => task.id === taskValue.id);
      const taskCopy = [...stateTasks];
      taskCopy.splice(taskIndex, 1, { id: taskValue.id, title: taskValue.title });
      dispatch(putTasks(taskCopy));
      history.push('/');
    } else {
      (
        setError('Error')
      );
    }
  }

  return (
    <>
      <div className="taskName">
        Задача №
        {id}
      </div>
      <form className="form" onSubmit={change}>
        <div className="head">
          <div>Изменить заметку</div>
          <Delete className="deleleButton" id={id} />
        </div>
        <input className="input" onChange={changeTaskInput} id="changeTaskInput" name="taskName" value={taskValue.title} autoComplete="off" />
        {changed
          ? (
            <div className="buttonContainer">
              <button className="button" type="submit">Изменить</button>

            </div>
          )
          : (
            <div className="buttonContainer">
              <button className="button" onClick={goHome} type="button">Вернуться в список</button>
            </div>
          )}
        <div>{error}</div>
      </form>
    </>
  );
}

export default ChangeTask;
