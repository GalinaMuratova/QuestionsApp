import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Questions = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">
          Questions
          </Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} to="/question/new">
            Add Question
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Questions;