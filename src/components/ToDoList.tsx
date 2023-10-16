// Base Imports 
import React, { FC, useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addTodo, clearCompletedTodos } from '../redux/slices/todosSlice';
import { ToDo } from '../interfaces';
// Components
import ToDoItem from './ToDoItem';
// Icons/Images

const ToDoList: FC = () => {
    const { theme } = useContext(ThemeContext);

    const [todoValue, setTodoValue] = useState('');
    //eslint-disable-next-line
    const [filterByAll, setFilterByAll] = useState(true);
    const [filterByActive, setFilterByActive] = useState(false);
    const [filterByCompleted, setFilterByCompleted] = useState(false);

    const todos = useAppSelector(state => state.todos.allTodos.todos);
    const displayedTodos = filterByActive ? todos.filter(todo => !todo.completed) : filterByCompleted ? todos.filter(todo => todo.completed) : todos;

    const activeFilterRef = useRef<HTMLDivElement | null>(null);
    const completedFilterRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    const itemsLeft = todos?.filter(todo => !todo.completed).length;

    const renderedTodos = displayedTodos?.map((todo: ToDo, i: number) => (
        <ToDoItem key={i} index={i} todo={todo} />
    ));

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTodoValue(e.target.value);
    };

    const addNewTodoToList = () => {
        const newTodo = {
            "todo": todoValue.slice(0, 1).toUpperCase() + todoValue.slice(1),
            "completed": false
        }

        dispatch(addTodo({ newTodo }));
    };

    const clearTodos = () => {
        const updatedTodos = todos.map(todo => {
            return {
                "todo": todo.todo,
                "completed": false
            }
        });

        dispatch(clearCompletedTodos({ updatedTodos }));
    };

    const handleFilters = (filter: string) => {
        if (filter === 'active') {
            setFilterByActive(true);
            setFilterByCompleted(false);
            setFilterByAll(false);
        } else if (filter === 'completed') {
            setFilterByCompleted(true);
            setFilterByActive(false);
            setFilterByAll(false);
        } else {
            setFilterByAll(true);
            setFilterByActive(false);
            setFilterByCompleted(false);
        }
    };

    useEffect(() => {
        if (activeFilterRef.current) {
            if (filterByActive) {
                if (theme === 'dark') {
                    activeFilterRef.current.style.color = '#FFFFFF';
                } else {
                    activeFilterRef.current.style.color = '#494C6B';
                }

                activeFilterRef.current.style.fontWeight = '700';
            } else {
                activeFilterRef.current.style.color = 'unset';
            }
        }

        if (completedFilterRef.current) {
            if (filterByCompleted) {
                if (theme === 'dark') {
                    completedFilterRef.current.style.color = '#FFFFFF';
                } else {
                    completedFilterRef.current.style.color = '#494C6B';
                }

                completedFilterRef.current.style.fontWeight = '700';
            } else {
                completedFilterRef.current.style.color = 'unset';
            }
        }
    }, [theme, filterByActive, filterByCompleted]);

    return (
        <div className='todo-list'>
            <div className={`todo-list__create card-${theme}`}>
                <div></div>
                <input
                    className={`card-${theme}`}
                    type='text'
                    placeholder='Create a new todo...'
                    value={todoValue}
                    onChange={handleChange}
                    data-cy='create-new-todo' />

                <button className={`button-${theme}`} onClick={addNewTodoToList} data-cy='add-btn'>Add</button>
            </div>

            <div className={`todo-list__items box-shadow-${theme}`} onDragOver={(e) => e.preventDefault()}>
                {renderedTodos}
            </div>

            <div className={`todo-list__filters card-${theme}`}>
                <div data-cy='items-left'>{itemsLeft > 1 || itemsLeft === 0 ? `${itemsLeft} items left` : `${itemsLeft} item left`}</div>

                <div>
                    <div id='todo-list-filter-all' onClick={() => handleFilters('all')} data-cy='all-filter'>All</div>
                    <div ref={activeFilterRef} id='todo-list-filter-active' className={`todo-list__filters__filter-${theme}`} onClick={() => handleFilters('active')} data-cy='active-filter'>Active</div>
                    <div ref={completedFilterRef} className={`todo-list__filters__filter-${theme}`} onClick={() => handleFilters('completed')} data-cy='completed-filter'>Completed</div>
                </div>

                <div className={`todo-list__filters__filter-${theme}`} onClick={clearTodos} data-cy='clear-completed'>Clear Completed</div>
            </div>

            <div className='todo-list__drag-and-drop'>Drag and drop to reorder list</div>
        </div>
    )
}

export default ToDoList;