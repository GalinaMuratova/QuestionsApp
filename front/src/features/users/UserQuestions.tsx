import {
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled
} from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { selectQuestions, selectQuestionsLoading } from '../questions/questionsSlice';
import { fetchUserQuestions } from '../questions/questionsThunk';
import { selectUser } from './usersSlice';


const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  }
});

const StyledTableCell = styled(TableCell)({
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const UserQuestions = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(selectQuestions);
  const loading = useAppSelector(selectQuestionsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUserQuestions());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Grid item container justifyContent="center">
          <CircularProgress/>
        </Grid>
      ) : (
        <Grid container direction="column" spacing={1}>
          <Grid item style={{
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
            padding: '0'
          }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{backgroundColor: 'gray', color: 'white', fontSize: '24px', textAlign: 'center'}}>
                      My questions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map(question => (
                    <TableRow key={question._id}>
                      <StyledTableCell>
                        <Grid item xs={12} sm={6} md={4} lg={3} style={{fontSize: '18px'}} component={Link}
                              to={'/questions/' + question._id}>
                          {question.title}
                        </Grid>
                        {user ? (
                          <>
                            {question.hidden ? (
                              <span style={{float: 'right', color: 'red'}}>
                              Unpublished
                              </span>
                            ) : (
                              <span style={{float: 'right', color: 'gray'}}>
                                Published
                              </span>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </StyledTableCell>
                    </TableRow>

                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserQuestions;