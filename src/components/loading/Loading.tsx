import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export default function Loading() {
	return (
		<Box sx={{ paddingTop: 2, display: 'flex', flexGrow: 1, width: '100%', justifyContent: 'center' }}>
			<CircularProgress color='primary' />
		</Box>
	);
}
