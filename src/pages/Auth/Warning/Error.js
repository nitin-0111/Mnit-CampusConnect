import { Box, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Error = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '400px',
          textAlign: 'center',
        }}
      >
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <Typography>{message}</Typography>
          <Typography variant="body2" color="text.secondary">
            {`Please `}
            <strong>reload the page</strong>
            {` or `}
            <strong>try again after 1-2 minutes</strong>
            {`.`}
            {` If the issue persists, please contact us.`}
          </Typography>
        </Alert>
      </Box>
    </Box>
  );
};

export default Error;
