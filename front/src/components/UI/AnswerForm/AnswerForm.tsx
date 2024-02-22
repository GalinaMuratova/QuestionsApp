import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface Props {
  onSubmit: (answer: string) => void;
}

const AnswerForm: React.FC<Props> = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(answer);
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Your Answer"
        multiline
        rows={4}
        variant="outlined"
        value={answer}
        onChange={handleAnswerChange}
        fullWidth
        name="answer"
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Submit Answer
      </Button>
    </form>
  );
};

export default AnswerForm;
