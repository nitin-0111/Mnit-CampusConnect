import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const getRandomColor = (char) => {
  const colors = [
    '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#7f8c8d',
  ];
  const charCode = char.charCodeAt(0) % colors.length;
  return colors[charCode];
};

const ProfileAvatar = ({ fullName }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    if (fullName) {
      const [first, last] = fullName.split(' ');
      setFirstName(first ? first.charAt(0).toUpperCase() : '');
      setLastName(last ? last.charAt(0).toUpperCase() : '');
    }
  }, [fullName]);

  const handleImageError = (event) => {
    event.target.src = 'path-to-default-avatar-image';
  };

  const theme = createTheme(); // Create a theme to use the sx prop

  return (
    <ThemeProvider theme={theme}>
      <Avatar
        sx={{
          backgroundColor: getRandomColor(firstName),
          width: isSmallScreen ? '300px' : '450px',
          height: isSmallScreen ? '300px' : '450px',
          fontSize: isSmallScreen ? '110px' : '200px',
        }}
        src={lastName ? `path-to-image-folder/${firstName}${lastName}.jpg` : null}
        alt={lastName ? `${firstName}${lastName}` : firstName}
        onError={handleImageError}
      >
        {firstName}
        {lastName && lastName.charAt(0)}
      </Avatar>
    </ThemeProvider>
  );
};

export default ProfileAvatar;
