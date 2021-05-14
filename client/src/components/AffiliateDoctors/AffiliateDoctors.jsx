
import React, { useState, useEffect } from 'react';
import supabase from '../../supabase.config';
//Hacer tabs, una de favoritos y otra de busqueda 
//Tab de busqueda ---> profesionales 
//                ---> Provincia: meter tabla de provincias en un estado, mapearlo y meterlo en un select
//                ---> Localidad (opcional): meter tabla de localidades en un estado,  mapearlo y meterlo en un select
//                ---> Especialidad: meter tabla de especialidades en un estado, mapearlo y meterlo en un select 
//                ---> Nombre: meter la tabla de medicos en un estado, mapearlo y hacer una live bar 
//                ---> Paginado: 
// filtro desde el back o el front? Una vez que tengo provincicas filtar localidades desde el back 
//una vez que este seleccionaa la provincia, setea el estado con un use effect y hacer llamado al back de las localidades ya filtradas 
//segun el ID
export default function MedicalDirectory(){




return(    
<Paper className={classes.root}>
  <Tabs
    value={value}
    onChange={handleChange}
    indicatorColor="primary"
    textColor="primary"
    centered
  >
    <Tab label="Favoritos" />
    <Tab label="Buscar médicos" />
    <Tab label="Buscar instituciones" />
  </Tabs>
</Paper>
)
}
