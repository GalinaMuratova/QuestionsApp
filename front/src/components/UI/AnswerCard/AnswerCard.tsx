import React from 'react';
import { ListItem, ListItemText, Typography, styled } from '@mui/material';
import dayjs from 'dayjs';
import { IAnswer } from '../../../types';

const AnswerListItem = styled(ListItem)({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  },
  marginBottom: '16px',
});

interface Props {
  answer: IAnswer;
}

const AnswerCard: React.FC<Props> = ({answer}) => {
  return (
    <AnswerListItem>
      <ListItemText
        primary={<Typography variant="h6" style={{margin: '5px 0 15px'}}>{answer.title}</Typography>}
        secondary={
          <Typography variant="subtitle2" style={{color: 'grey'}}>
            Author: {answer.author.firstName}, Date: {dayjs(answer.date).format('DD.MM.YYYY HH:mm:ss')}
          </Typography>
        }
      />
    </AnswerListItem>
  );
}

export default AnswerCard;
