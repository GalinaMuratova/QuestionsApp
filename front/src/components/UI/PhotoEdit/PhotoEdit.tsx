import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import FileInput from '../FileInput/FileInput';
import { useAppDispatch } from '../../../app/hooks';
import { fetchUserProfile, updateProfilePhoto } from '../../../features/users/usersThunk';


const PhotoEdit = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
      await dispatch(updateProfilePhoto(formData));
      await dispatch(fetchUserProfile());
      setImageFile(null);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} mb={2}>
            <FileInput onChange={filesInputChangeHandler} name="image" label="image"/>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Edit photo
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default PhotoEdit;
