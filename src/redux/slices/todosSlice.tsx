import { createSlice } from '@reduxjs/toolkit';

const initialData = {
    "todos": [
        {
            "todo": "Complete online JavaScript course",
            "completed": false
        },
        {
            "todo": "Jog around the park 3x",
            "completed": false
        },
        {
            "todo": "10 minutes meditation",
            "completed": false
        },
        {
            "todo": "Read for 1 hour",
            "completed": false
        },
        {
            "todo": "Pick up groceries",
            "completed": false
        },
        {
            "todo": "Complete Todo App",
            "completed": false
        }
    ]
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        allTodos: initialData
    },
    reducers: {
        addTodo: (state, action) => {
            return {
                ...state,
                allTodos: {
                    ...state.allTodos,
                    todos: [
                        action.payload.newTodo,
                        ...state.allTodos.todos
                    ]
                }
            }
        },
        deleteTodo: (state, action) => {
            const todoIndex = state.allTodos.todos.findIndex(todo => todo.todo === action.payload.toDoTitle);
            state.allTodos.todos.splice(todoIndex, 1);

            return state;
        },
        markTodoAsCompleted: (state, action) => {
            const currentTodo = state.allTodos.todos.find(todo => todo.todo === action.payload.toDoTitle);

            if (currentTodo) {
                currentTodo.completed = true;
            }

            return state;
        },
        markTodoAsIncomplete: (state, action) => {
            const currentTodo = state.allTodos.todos.find(todo => todo.todo === action.payload.toDoTitle);

            if (currentTodo) {
                currentTodo.completed = false;
            }

            return state;
        },
        clearCompletedTodos: (state, action) => {
            return {
                ...state,
                allTodos: {
                    ...state.allTodos,
                    todos: action.payload.updatedTodos
                }
            }
        },
        reorderTodoItems: (state, action) => {
            const currentTodoIndex = state.allTodos.todos.findIndex(todo => todo.todo === action.payload.draggedElTitle);
            const currentTodo = state.allTodos.todos[currentTodoIndex];
            const replacedTodo = state.allTodos.todos[action.payload.dragEndIndex];
            const replacedTodoIndex = action.payload.dragEndIndex;

            state.allTodos.todos.splice(currentTodoIndex, 1, replacedTodo);
            state.allTodos.todos.splice(replacedTodoIndex, 1, currentTodo);

            return state;
        }
    }
});

export const { addTodo, deleteTodo, markTodoAsCompleted, markTodoAsIncomplete, clearCompletedTodos, reorderTodoItems } = todosSlice.actions;

export default todosSlice.reducer;