import { configureStore } from '@reduxjs/toolkit';

// Define initial states
const initialThemeState = {
  darkMode: false,
};

const initialTodoState = {
  todos: [],
};

// Theme slice
const themeSlice = {
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
};

// Todo slice
const todoSlice = {
  name: 'todos',
  initialState: initialTodoState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
};

// Configure the store
const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    todos: todoSlice.reducer,
  },
});

export default store;
export const { toggleTheme } = themeSlice.actions;
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
