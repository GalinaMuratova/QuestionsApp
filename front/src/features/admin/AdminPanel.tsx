import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { selectAllUsers, selectUser } from '../users/usersSlice';
import {
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Avatar,
  IconButton,
  Snackbar
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { authorizeUser, deleteUser, fetchAllUsers, resetDefaultPassword } from '../users/usersThunk';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminPanel = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const onDelete = async (id: string) => {
    const alert = window.confirm('Do you want to delete this question?');
    if (alert) {
      await dispatch(deleteUser(id));
      await dispatch(fetchAllUsers());
    }
  };

  const onAuthorize = async (id: string) => {
    await dispatch(authorizeUser(id));
    await dispatch(fetchAllUsers());
  };

  const onResetPassword = async (id: string) => {
    await dispatch(resetDefaultPassword(id));
    await dispatch(fetchAllUsers());
    setResetPasswordSuccess(true);
  };

  const handleCloseSnackbar = () => {
    setResetPasswordSuccess(false);
  };

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
        <Typography variant="h4">All users</Typography>
        <Button component={Link} to={'/add-new-user'} variant="contained" color="primary">Add New User</Button>
      </div>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Authorization</TableCell>
              <TableCell>Functions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Avatar alt="User Image" src={'http://localhost:8000' + '/images/' + user.image}
                          sx={{width: 60, height: 60, marginBottom: 2}}/>
                </TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.userLogin}</TableCell>
                <TableCell>
                  {user.statusUser ? (
                    <Button variant="outlined" disabled>
                      Authorized
                    </Button>
                  ) : (
                    <Button onClick={() => onAuthorize(user._id)} variant="outlined" color="error">
                      Unauthorized
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <Button onClick={() => onResetPassword(user._id)} variant="outlined" color="primary">Reset
                      password</Button>
                    <div>
                      <IconButton component={Link} to={'/user-information/' + user._id} aria-label="edit"
                                  style={{color: 'gray'}}>
                        <InfoIcon/>
                      </IconButton>
                      <IconButton component={Link} to={'/edit/' + user._id} aria-label="edit" style={{color: 'gray'}}>
                        <EditIcon/>
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => onDelete(user._id)} color="error">
                        <DeleteIcon/>
                      </IconButton>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Snackbar
        open={resetPasswordSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Password reset successfully"
      />
    </>
  );
};

export default AdminPanel;

