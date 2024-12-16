import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, TOGGLE_THEME } from './action';

// Initial state
const initialState = {
  todos: [],
  darkMode: false,
};

// Reducer function
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { ...action.payload, completed: false }]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case TOGGLE_THEME:
      return {
        ...state,
        darkMode: !state.darkMode
      };
    default:
      return state;
  }
};
