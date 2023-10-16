// Base Imports
import React, { FC, useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useAppDispatch } from '../redux/hooks';
import { deleteTodo, markTodoAsCompleted, markTodoAsIncomplete, reorderTodoItems } from '../redux/slices/todosSlice';
import { ToDo } from '../interfaces';
// Icons/Images
import iconCross from '../assets/icon-cross.svg';

interface ToDoItemProps {
    index: number;
    todo: ToDo;
}

const ToDoItem: FC<ToDoItemProps> = ({ todo, index }) => {
    const { theme } = useContext(ThemeContext);

    const toDoBulletRef = useRef<HTMLDivElement | null>(null);
    const toDoTextRef = useRef<HTMLSpanElement | null>(null);

    const dispatch = useAppDispatch();

    const deleteTodoFromList = () => {
        const toDoTitle = todo.todo;

        dispatch(deleteTodo({ toDoTitle }));
    };

    const addBulletStyling = () => {
        if (toDoBulletRef.current && !todo.completed) {
            toDoBulletRef.current.style.border = '1px solid transparent';
            toDoBulletRef.current.style.borderRadius = '50%';
            toDoBulletRef.current.style.backgroundOrigin = 'border-box';
            toDoBulletRef.current.style.backgroundClip = 'content-box, border-box';

            if (theme === 'dark') {
                toDoBulletRef.current.style.backgroundImage = 'linear-gradient(hsl(235, 24%, 19%), hsl(235, 24%, 19%)), linear-gradient(#57ddff, #c058f3)';
            } else {
                toDoBulletRef.current.style.backgroundImage = 'linear-gradient(white, white), linear-gradient(#57ddff, #c058f3)';
            }
        }
    };

    const removeBulletStyling = () => {
        if (toDoBulletRef.current) {
            toDoBulletRef.current.style.border = '1px solid rgba(151, 151, 151, 0.2)';

            if (!todo.completed) {
                toDoBulletRef.current.style.borderRadius = '50%';
                toDoBulletRef.current.style.backgroundOrigin = 'unset';
                toDoBulletRef.current.style.backgroundClip = 'unset';
                toDoBulletRef.current.style.backgroundImage = 'unset'
            }
        }
    };

    const handleTodoState = () => {
        const toDoTitle = todo.todo;

        if (todo.completed) {
            dispatch(markTodoAsIncomplete({ toDoTitle }));
        } else {
            dispatch(markTodoAsCompleted({ toDoTitle }));
        }
    };

    const handleDragEnter = (e: any) => {
        if (e.target.classList.contains('todo-item')) {
            e.target.classList.add('dragover');
        }
    };

    const handleDragLeave = (e: any) => {
        if (e.target.classList.contains('dragover')) {
            e.target.classList.remove('dragover');
        }
    };

    const handleDragStart = (e: any) => {
        e.dataTransfer.setData('text', e.target.innerText);
    };

    const handleDrop = (e: any, id: string) => {
        e.preventDefault();

        const draggedElTitle = e.dataTransfer.getData('text');

        const todoItem = document.getElementById(id)!;
        const dragEndIndex = +(todoItem.dataset.index!);

        dispatch(reorderTodoItems({ draggedElTitle, dragEndIndex }));

        e.target.classList.remove('dragover');
    };

    useEffect(() => {
        if (toDoBulletRef.current && toDoTextRef.current) {
            if (todo.completed) {
                toDoBulletRef.current.style.background = 'linear-gradient(45deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%)) repeat';
                toDoTextRef.current.style.textDecoration = 'line-through';
                toDoTextRef.current.style.color = '#767992';
            } else {
                toDoBulletRef.current.style.background = 'none';
                toDoBulletRef.current.style.border = '1px solid rgba(151, 151, 151, 0.2)';
                toDoTextRef.current.style.textDecoration = 'none';
                toDoTextRef.current.style.color = 'unset';
            }
        }
    }, [todo]);

    return (
        <div id={`todo-item-${index}`} className={`todo-item card-${theme}`} data-index={index} draggable onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragStart={handleDragStart} onDrop={(e) => handleDrop(e, `todo-item-${index}`)} data-cy='todo-item' data-completed={`${todo.completed}`}>
            <div className='todo-item__text'>
                <div ref={toDoBulletRef} onMouseEnter={addBulletStyling} onMouseLeave={removeBulletStyling} onClick={handleTodoState} data-cy='todo-item-bullet'></div>
                <span ref={toDoTextRef} data-cy='todo-item-text'>{todo.todo}</span>
            </div>

            <div className='todo-item__delete' onClick={deleteTodoFromList} data-cy='delete-btn'>
                <img src={iconCross} alt='icon-cross' />
            </div>
        </div>
    )
}

export default ToDoItem; 