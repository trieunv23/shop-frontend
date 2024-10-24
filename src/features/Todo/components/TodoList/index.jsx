import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func
};


function TodoList({todoList = [], onTodoClick = null}) {
    
    const handleTodoClick = (todo, index) => {
        if (!onTodoClick) return;

        onTodoClick(todo, index);
    }

    return (
        <div>
            <ul>
                { todoList.map((todo, index) => (
                    <li 
                    key={todo.id}
                    className={todo.status === 'complete' ? 'complete' : ''}
                    onClick={() => handleTodoClick(todo, index)}
                    >{todo.title}</li>
                )) }    
            </ul>
        </div>
    );
}

export default TodoList;