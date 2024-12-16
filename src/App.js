import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, toggleTheme } from './redux/action';  
import { Container, TextField, Button, List, ListItem, ListItemText, Switch, FormControlLabel, Paper, Typography } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const darkMode = useSelector((state) => state.darkMode);

  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      // Dispatching the action with the new todo object
      dispatch(addTodo({ id: Date.now(), text: newTodo }));
      setNewTodo('');  // Clear the input after adding
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));  // Dispatch the toggle action for the todo
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));  // Dispatch the delete action
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());  // Dispatch the theme toggle action
  };

  return (
    <Paper style={{ minHeight: '100vh', backgroundColor: darkMode ? '#121212' : '#fff' }}>
      <Container maxWidth="sm" style={{ padding: '20px' }}>
        <Typography variant="h4" color={darkMode ? 'white' : 'primary'} gutterBottom>
          Todo List
        </Typography>

        <FormControlLabel
          control={<Switch checked={darkMode} onChange={handleToggleTheme} />}
          label={darkMode ? 'Dark Mode' : 'Light Mode'}
        />

        <TextField
          label="New Todo"
          fullWidth
          variant="outlined"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ margin: '20px 0' }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleAddTodo}>
          Add Todo
        </Button>

        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              <ListItemText
                primary={todo.text}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: darkMode ? 'white' : 'black',
                }}
              />
              <Button onClick={() => handleToggleTodo(todo.id)} color="primary">
                {todo.completed ? 'Undo' : 'Complete'}
              </Button>
              <Button onClick={() => handleDeleteTodo(todo.id)} color="secondary">
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Container>
    </Paper>
  );
}

export default App;
