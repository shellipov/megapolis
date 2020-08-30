import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { putTasks } from '../../redux/actions';
import DeleteTask from '../Delete';
import AddTask from '../AddTask';
import './style.css';

function TaskList() {
  const dispatch = useDispatch();
  const stateTasks = useSelector((state) => state.tasks);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://test.megapolis-it.ru/api/list');
      const { data } = await response.json();
      dispatch(putTasks(data));
    })();
  }, [dispatch]);

  return (
    <>
      <h1 className="list">Список задач</h1>
      <div>{error}</div>
      <AddTask />
      <div className="taskList">
        {stateTasks.map((task, index) => (
          <>
            <div className="string" id={task.id} key={task.id}>
              <div className="number">
                Задача №
                {index + 1}
              </div>
              <div className="task">
                {task.title}
              </div>
              <Link className="changeButton" to={`/edit/${task.id}`} />
              <DeleteTask id={task.id} />
            </div>
          </>
        ))}
      </div>
    </>
  );
}
export default TaskList;
