import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { titleChanged, taskDeleted, completeTask, loadTasks, getTasks, getLoading, createNewTask } from "./store/task";
import configureStore from './store/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getErrors } from './store/errors';

const store = configureStore();

const App = () => {
  // const [state, setState] = useState(store.getState());
  const state = useSelector(getTasks());
  const isLoading = useSelector(getLoading());
  const error = useSelector(getErrors());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
    // store.subscribe(() => setState(store.getState()))
  }, [])

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }
  const taskDelete = (taskId) => {
    dispatch(taskDeleted(taskId))
  }
  const createTask = () => {
    dispatch(createNewTask({title: "New task", completed: false}));
  }
  if (isLoading) {
    return <h1>loading</h1>
  }
  if (error) {
    return <p>{error}</p>
  }
  console.log(state);
  return (
    <>
      <h1>App</h1> 
      <ul>
        {state.map(el => 
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>Completed</button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => taskDelete(el.id)}>Delete task</button>
            <hr/>
          </li>
        )}
      </ul>
      <button onClick={() => createTask()}>Create new task</button>
      </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
