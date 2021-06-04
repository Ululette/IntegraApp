import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableUsers from './TableUsers.jsx';
import { CircularProgress } from '@material-ui/core';
import { getAllUsers } from '../../../actions/users.action.js';

const FormUsers = () => {
    //---STATES
    const [rows, setRows] = useState([]);
    //const [filter,setFilter] = useState([]);

    const users = useSelector((state) => state.users.allUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        setRows(users);
    }, [users]);

    //   useEffect(() => {
    //     setRows(filter);
    // }, [filter]);

    const handleFilter = (filterList) => {
        if (filterList === 'reset') setRows(users);
        else setRows(filterList);
    };

    //
    return (
        <div>
            {rows.length === 0 ? (
                <CircularProgress />
            ) : (
                <TableUsers
                    rows={rows}
                    allUsers={users}
                    handleFilter={handleFilter}
                />
            )}
        </div>
    );
};

export default FormUsers;
