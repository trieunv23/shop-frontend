import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import TodoList from '../../components/TodoList';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import TodoForm from '../../components/TodoForm';

ListPage.propTypes = {
    
};

function ListPage(props) {
    const initTodoList = [
        {
            id: 1,
            title: 'Play',
            status: 'complete'
        },
        {
            id: 2,
            title: 'Sleep',
            status: 'new'
        },
        {
            id: 3,
            title: 'Study',
            status: 'new'
        },
    ];

    const location = useLocation();
    const navigate = useNavigate();
    const [todoList, setTodoList] = useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = useState(() => {
        const params = queryString.parse(location.search);
        return params.status || 'all'; 
    });

    useEffect(() => {
        const params = queryString.parse(location.search);
        setFilteredStatus(params.status || 'all');
    }, [location.search]);

    const handleTodoClick = (todo, index) => {
        const newTodoList = [...todoList];
        newTodoList[index] = {
            ...newTodoList[index],
            status: newTodoList[index].status === 'new' ? 'complete' : 'new',
        };

        setTodoList(newTodoList);

        console.log(todo, index);
    }

    const handleShowAllClick = () => {
        const queryParams = { status: 'all' };
        const queryStringified = queryString.stringify(queryParams);
        navigate(`?${queryStringified}`);
    }

    const handleShowCompleteClick = () => {
        const queryParams = { status: 'complete' };
        const queryStringified = queryString.stringify(queryParams);
        navigate(`?${queryStringified}`);
    }

    const handleShowNewClick = () => {
        const queryParams = { status: 'new' };
        const queryStringified = queryString.stringify(queryParams);
        navigate(`?${queryStringified}`);
    }

    const renderedTodoList = useMemo(() => {
        return todoList.filter(todo => filteredStatus === 'all' || filteredStatus === todo.status);
    }, [todoList, filteredStatus])
    console.log(renderedTodoList);

    const handleTodoFormSubmit = (values) => {
        console.log('Form submit: ', values);
    }

    return (
        <div>
            <h3>Todo Form</h3>
            <TodoForm onSubmit={handleTodoFormSubmit}/> 

            <h3>Todo list</h3>
            <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick}/>
            <div>
                <button onClick={handleShowAllClick}>Show All</button>
                <button onClick={handleShowCompleteClick}>Show Complete</button>
                <button onClick={handleShowNewClick}>Show New</button>
            </div>

            <div className="container">
                <div className="normal-login">
                    <div className="input-box"></div>
                </div>
            </div>
        </div>
    );
}

export default ListPage;