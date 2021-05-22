import React from 'react';
import {
  Button,
} from '@material-ui/core';

export default function NewOrderDialog({info}) {

  // console.log(info)
  // console.log(date,doctor,patient,diagnosis);

  function handleClick() {
    alert('hiciste click')
  }

  return (
    <div>
      <Button variant="outlined" size="large" color="primary" onClick={handleClick}>
        Nueva orden
      </Button>
    </div>
  )
}
