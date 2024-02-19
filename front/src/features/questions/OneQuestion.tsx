import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneQuestion, selectOneQuestionLoading } from './questionsSlice';
import { Typography, Grid, Card, CardContent, List, Divider, CircularProgress } from '@mui/material';
import { fetchOneQuestion } from './questionsThunk';
import AnswerCard from '../../components/UI/AnswerCard/AnswerCard';
import dayjs from 'dayjs';

const OneQuestion = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const question = useAppSelector(selectOneQuestion);
  const loading = useAppSelector(selectOneQuestionLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneQuestion(id));
    }
  }, [dispatch, id]);


  if (!question) {
    return <Typography variant="h6">Question not found</Typography>;
  }

  return (
    <>
      {loading ? (
        <Grid item container justifyContent="center">
          <CircularProgress/>
        </Grid>
      ) : (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" style={{margin: '10px 0', textAlign: 'center'}}>Detail information:</Typography>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">Author: {question.author.firstName}</Typography>
                <Typography variant="subtitle2"
                            style={{color: 'grey'}}>Date: {dayjs(question.date).format('DD.MM.YYYY HH:mm:ss')}</Typography>
                <Typography variant="h5" style={{marginTop: '10px'}}>{question.title}</Typography>
              </CardContent>
            </Card>
            <Typography variant="h6" style={{margin: '10px 0', textAlign: 'center'}}>Answers:</Typography>
            <List>
              {question.answers.length === 0 ? (
                <Typography variant="subtitle1">No answers yet</Typography>
              ) : (
                question.answers.map(answer => (
                  <AnswerCard key={answer._id} answer={answer}/>
                ))
              )}
            </List>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default OneQuestion;

