import React from 'react';
import {
  Button,
} from '@material-ui/core';

export default function NewPrescriptionDialog({info}) {
  
  function handleClick() {
    alert('hiciste click')
  }

  return (
    <div>
      <Button variant="outlined" size="large" color="primary" onClick={handleClick} >
        Nueva receta
      </Button>
    </div>
  )
}
