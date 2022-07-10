import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

// const update = createAction("task/updated");
// const remove = createAction("task/removed")

// const initialState =  [
//     {id: 1, title: "task 1", completed: false}, 
//     {id: 2, title: "task 2", completed: false}
// ]
const initialState = {entities: [], isLoading: true};
const taskSlice = createSlice({
    name: "task", 
    initialState, 
    reducers: {
        update(state, action) {
            const elementIndex = state.entities.findIndex(el => el.id === action.payload.id)
            // state[elementIndex].completed = true
            state.entities[elementIndex] = {...state.entities[elementIndex], ...action.payload}
        },
        remove(state, action) {
            state.entities = state.entities.filter((e) => e.id !== action.payload.id)
        },
        recived(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskRequestedFailed(state, action) {
            state.isLoading = false
        }, 
        create(state, action) {
            state.entities.push(action.payload)
        }

}})
const {actions, reducer: taskReducer} = taskSlice;
const {update, remove, recived, taskRequested, taskRequestedFailed, create} = actions;

// const taskRequested = createAction("task/requested");
// const taskRequestedFailed = createAction("task/requestedFailed");

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.fetch();
        dispatch(recived(data));
    } catch (error) {
        dispatch(setError(error.message))
        dispatch(taskRequestedFailed());
    }
}

export const completeTask = (id) => (getState, dispatch) => {
    dispatch(update({ id, completed: true }))
}

export function titleChanged (id) {
    return update({ id, title: `New title for ${id}` })
}
export function taskDeleted (id) {
    return remove({ id })
}
export const createNewTask = (newTask) => async (dispatch) => {
    try {
        const data = await todosService.post(newTask);
        dispatch(create(data));
    } catch (error) {
        dispatch(setError(error.message));
    }
}
export const getTasks = () => (state) => state.tasks.entities
export const getLoading = () => (state) => state.tasks.isLoading

// function taskReducer (state = [], action) {
//     switch (action.type) {
//       case update.type: {
//         const newArray = [...state]
//         const elementIndex = newArray.findIndex(el => el.id === action.payload.id)
//         newArray[elementIndex].completed = true
//         newArray[elementIndex] = {...newArray[elementIndex], ...action.payload}
//         return newArray
//       }
//       case remove.type: {
//         return state.filter((e) => e.id !== action.payload.id)
//       }
    
//       default:
//         return state
//     }
// }
export default taskReducer;
