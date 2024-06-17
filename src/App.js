import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { Formulario, Label, 
  ContenedorTerminos, ContenedorBotonCentrado, Boton,MensajeExito,MensajeError } from './elementos/Formularios';

//importamos el compotente de la carpeta componente / Input
import ComponenteInput from './componentes/Input';


const App = () => {
  const[usuario, cambiarUsuario]=useState({campo: '', valido:null});
  const[nombre, cambiarNombre]=useState({campo: '', valido:null});
  const[password, cambiarPassword]=useState({campo: '', valido:null});
  const[password2, cambiarPassword2]=useState({campo: '', valido:null});
  const[correo, cambiarCorreo]=useState({campo: '', valido:null});
  const[telefono, cambiarTelefono]=useState({campo: '', valido:null});
  const[terminos, cambiarTerminos]=useState(false);
  const[formularioValido, cambiarFormularioValido] = useState(null);
  const [mostrarMensajeExito, setMostrarMensajeExito] = useState(false);


  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }
  
  //validar contraseña
  const validarPassword2=()=>{
    if(password.campo.length > 0){
      if(password.campo !== password2.campo){
        cambiarPassword2((prevState)=>{
          return {...prevState, valido: 'false'}
        });
      }else{
        cambiarPassword2((prevState)=>{
          return {...prevState, valido: 'true'}
        })
    }
    }
  }

  const onchangeTerminos=(e)=>{
    cambiarTerminos(e.target.checked);
  }

  const onSubmit = (e)=>{
    e.preventDefault();

    if(usuario.valido ==='true' &&
      nombre.valido==='true' &&
      password.valido==='true' &&
      password2.valido==='true' &&
      correo.valido==='true' &&
      telefono.valido === 'true' &&
      terminos
      ){
        cambiarFormularioValido(true);
        setMostrarMensajeExito(true);
        setTimeout(() => {
          setMostrarMensajeExito(false);
        }, 3000);
        cambiarUsuario({campo: '', valido:null});
        cambiarNombre({campo: '', valido:null});
        cambiarPassword({campo: '', valido:null});
        cambiarPassword2({campo: '', valido:null});
        cambiarCorreo({campo: '', valido:null});
        cambiarTelefono({campo: '', valido:null});
        
      }else{
        cambiarFormularioValido(false);
      }
  }

  return (
    <main>
      <Formulario action="" onSubmit={onSubmit}>
      
        <ComponenteInput
        estado={usuario}
        cambiarEstado={cambiarUsuario}
        tipo="text"
         label="Usuario"
         placeholder="Jhon conor"
         name="usuario"
         leyendaError="el suario tiene que ser de 4 a 16 digitos, tiene que contener numeros, letras y guion bajo"
         expresionRegular={expresiones.usuario}
        />

        <ComponenteInput
        estado={nombre}
        cambiarEstado={cambiarNombre}
        tipo="text"
         label="Nombre"
         placeholder="Jhon_conor"
         name="usuario"
         leyendaError="El nombre puede contener letras y espacios"
         expresionRegular={expresiones.nombre}
        />

      <ComponenteInput
        estado={password}
        cambiarEstado={cambiarPassword}
        tipo="password"
         label="Contraseña"
         
         name="password1"
         leyendaError="La contraseña tiene que ser de 4 a 12 digitos"
         expresionRegular={expresiones.password}
        />

      <ComponenteInput
        estado={password2}
        cambiarEstado={cambiarPassword2}
        tipo="password"
         label="Repetir Contraseña"
         
         name="password2"
         leyendaError="Ambas contraseñas deben ser iguales."
        funcion={validarPassword2}
         //expresionRegular={expresiones.nombre}
        />

<ComponenteInput
        estado={correo}
        cambiarEstado={cambiarCorreo}
        tipo="email"
         label="Correo Electronico"
         placeholder="Jhon_conor@gmail.com"
         name="correo"
         leyendaError="El correo solo puede contener letras, numeros y puntos"
         expresionRegular={expresiones.correo}
        />
        
        <ComponenteInput
        estado={telefono}
        cambiarEstado={cambiarTelefono}
        tipo="number"
         label="Telefono"
         placeholder="0000000"
         name="telefono"
         leyendaError="Solo puede contener numeros"
         expresionRegular={expresiones.telefono}
        />
       
        

        <ContenedorTerminos>
          <Label>
            <input 
            type="checkbox"
             name="terminos"
              id="terminos"
               checked={terminos}
               onChange={onchangeTerminos}
               />
            Acepto los términos y condiciones
          </Label>
        </ContenedorTerminos>

       {formularioValido === false && <MensajeError>
          <p>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <b className='errorLabel'>Error: </b>Por favor rellene el formulario correctamente
          </p>
        </MensajeError>}

        <ContenedorBotonCentrado>
          <Boton type='submit'>Enviar</Boton>
         
          {mostrarMensajeExito && <MensajeExito><span>El formulario se envio correctamente..!</span></MensajeExito>}

        </ContenedorBotonCentrado>
      </Formulario>
    </main>
  );
};

export default App;
