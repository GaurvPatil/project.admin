import { LinearProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const LinearLoading = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  )
}