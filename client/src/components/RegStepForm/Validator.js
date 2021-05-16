
// const complete = {
//   page1:false,
//   page2:false,
//   page3:false,
//   page4:false}

const validator = (input,tipo) =>{
  const errors={};

  if (tipo ==="date"){
      let size = Object.keys(input).length;
      let contador = 0;
          for (const key in input) {
              if (!input[key]) errors[key] = "Debe seleccionar una opción";
              else    if(input[key]!=='hidden'){//es una fecha
                              let aux = new Date(input[key]);
                          if( Date.now() < Date.parse(aux)){
                              errors[key] = "Debe seleccionar una fecha menor a la actual";
                          }
                      }else ++contador;
          }
          if(contador===size){
              errors.Radcomplete=true;
          }else{
              errors.Radcomplete=false;
          }
  }

  if (tipo === "radio"){
      let size = Object.keys(input).length;
      let contador = 0;
      console.log("vamo a ver",input)
      for (const key in input) {
          if (!input[key]) errors[key] = "Debe seleccionar una opción";
          else ++contador
      }
          if(contador===size) errors.Radcomplete=true
          else errors.Radcomplete=false
  }

  if (tipo==="text") {
      let size = Object.keys(input).length;
      let contador = 0;
      for (const key in input) {
          //comprobar si es un numero
          if (!isNaN(Number(input))) {
              //si ingreso es numero
              if (!/^\d*$/.test(input[key])){//comprabar que solo haya numeros sin otros caracter
                  errors[key] = "Datos invalidos,solo se admiten numeros sin puntos ni comas.";
              }else ++contador;
          } else if (!/^[^[A-Za-z\s]+$/.test(input[key])){//es un string, valido que sean solo letras y espacios
              errors[key] = "Datos invalidos.";
          }else ++contador;
      }
      if(contador===size) errors.Radcomplete=true;
      else errors.Radcomplete=false;
  }
  return errors;
}
export default validator; 