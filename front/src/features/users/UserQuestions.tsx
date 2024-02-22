import {
  Button,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  styled,
  IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { Link as NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { selectQuestions, selectQuestionsLoading } from '../questions/questionsSlice';
import { fetchUserQuestions, createQuestion, changeQuestionPublish, deleteQuestion, editQueston } from '../questions/questionsThunk';
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
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [editedQuestionId, setEditedQuestionId] = useState<string | null>(null);
  const [editedQuestionText, setEditedQuestionText] = useState<string>('');

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleEditQuestion = (id: string, text: string) => {
    setEditedQuestionId(id);
    setEditedQuestionText(text);
  };

  const handleSaveQuestion = async () => {
    if (editedQuestionId !== null) {
      await dispatch(editQueston({ id: editedQuestionId, title: editedQuestionText }));
      await dispatch(fetchUserQuestions());
      setEditedQuestionId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditedQuestionId(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(createQuestion({title: question}));
    await dispatch(fetchUserQuestions());
    setQuestion('');
  };

  const onPublic = async (id: string) => {
    await dispatch(changeQuestionPublish(id));
    await dispatch(fetchUserQuestions());
  };

  const onDelete = async (id: string) => {
    const alert = window.confirm('Do you want to delete this question?');
    if (alert) {
      await dispatch(deleteQuestion(id));
      await dispatch(fetchUserQuestions());
    }
  };

  useEffect(() => {
    dispatch(fetchUserQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      {loading ? (
        <Grid item container justifyContent="center">
          <CircularProgress/>
        </Grid>
      ) : (
        <Grid container direction="column" spacing={1}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <form onSubmit={handleSubmit} style={{margin:'20px 0'}}>
              <TextField
                label="Add question"
                multiline
                variant="outlined"
                value={question}
                onChange={handleQuestionChange}
                name="question"
                style={{width:'500px', height:'20px', marginRight:'15px'}}
                required
              />
              <Button type="submit" variant="contained" endIcon={<SendIcon />} color="primary" style={{padding: "15px 12px"}}>
                Create question
              </Button>
            </form>
          </div>
          <Grid item style={{padding: '0'}}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{backgroundColor: 'gray', color: 'white', fontSize: '24px', textAlign: 'center', width: '70%'}}>
                      My questions
                    </TableCell>
                    <TableCell style={{backgroundColor: 'gray', color: 'white', fontSize: '24px', textAlign: 'center', width: '30%'}}>
                      Functions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map(question => (
                    <TableRow key={question._id}>
                      <StyledTableCell>
                        {editedQuestionId === question._id ? (
                          <TextField
                            value={editedQuestionText}
                            onChange={(e) => setEditedQuestionText(e.target.value)}
                            fullWidth
                            required
                          />
                        ) : (
                          <Grid item xs={12} sm={6} md={8} style={{fontSize: '18px'}} component={Link} to={'/questions/' + question._id}>
                            {question.title}
                          </Grid>
                        )}
                      </StyledTableCell>
                      <TableCell style={{textAlign: 'center'}}>
                        <div style={{display:'flex', justifyContent:'end'}}>
                          <Grid mr={4}>
                          {editedQuestionId === question._id ? (
                            <>
                              <IconButton aria-label="save" onClick={handleSaveQuestion} style={{color: 'green'}}>
                                <SaveIcon />
                              </IconButton>
                              <IconButton aria-label="cancel" onClick={handleCancelEdit} style={{color: 'red'}}>
                                <CancelIcon />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton aria-label="edit" onClick={() => handleEditQuestion(question._id, question.title)} style={{color: 'gray'}}>
                              <EditIcon />
                            </IconButton>
                          )}
                          <IconButton aria-label="delete" onClick={() => onDelete(question._id)} color="error">
                            <DeleteIcon />
                          </IconButton>
                          </Grid>
                          {user ? (
                            <>
                              {question.hidden ? (
                                <Button variant="outlined" onClick={() => onPublic(question._id)} color="error">
                                  Unpublished
                                </Button>
                              ) : (
                                <Button variant="outlined" disabled>
                                  Published
                                </Button>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </TableCell>
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
