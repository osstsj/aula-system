import React from 'react';

const FooterComponent = () => {
  const centeredImageStyle = {
    display: 'flex',
    justifyContent: 'center', // Centra horizontalmente
    alignItems: 'center', // Centra verticalmente
    height: '11vh', // Ajusta la altura según tu diseño
    backgroundColor: '#37109c', // Cambia el color de fondo a gris claro (puedes usar cualquier color hexadecimal o nombre de color)
  };

  const leftImageStyle = {
    maxWidth: '40%', // Estilo para la imagen izquierda
    maxHeight: '89%',
    marginRight: '10px', // Separación entre las imágenes
  };
  const footerStyle = {
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Cambia el color de fondo del footer

    textAlign: 'center',
};

  return (
    <footer style={footerStyle}>
      <div style={centeredImageStyle}>

        <img
          src="/img/Fondo2.png" // Ruta de la segunda imagen
          alt="Descripción de la segunda imagen"
          style={{ maxWidth: '100%', maxHeight: '80%',marginTop:'0.5%' }}
        />
         <img
          src="../img/fooder.PNG"
          alt="Descripción de la primera imagen"
          style={leftImageStyle}
        />
      </div>
    </footer>
  );
};

export default FooterComponent;