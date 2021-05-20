import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableUsers from './TableUsers.jsx';
import { CircularProgress } from '@material-ui/core';
import {getAllUsers} from '../../../actions/users.action.js';


const FormUsers = () => {
    
  //---STATES
    const [rows, setRows] = useState([]);
    const users = useSelector(
        (state) => state.users.allUsers
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
        console.log(rows)
    }, []);

    useEffect(() => {
      setRows(users);
      console.log('pase por use effect ')
  }, [users]);

//
    return ( 
      <div>
        <h2>Users</h2>
        {rows.length === 0 ? (
                <CircularProgress/>
            ) : (
                <TableUsers rows={rows} />
            )}
      </div>
      
    );
}
 
export default FormUsers;