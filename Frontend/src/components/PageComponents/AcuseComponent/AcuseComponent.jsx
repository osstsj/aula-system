import React, { useState } from 'react';
import'../AcuseComponent/Acuse.css'
function AcuseComponent() {
  const [nombreProfesor, setNombreProfesor] = useState('Nombre Apellido');
  const [cargo, setCargo] = useState('Cargo');
  const [unidadAcademica, setUnidadAcademica] = useState('Unidad Académica');
  const [fechaHora] = useState(new Date());

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className=' page'>
    <img src="../img/navbar.jpg" alt="Encabezado" style={{ width: '100%' }} />
    <div className="acuse">
    <div className="acuse-container mt-5">
      <div className=" container ">
      {/*<div className="navbar">
          <img src="../img/navbar.jpg" alt="Logo Navbar" />
        </div>*/}
        <h2>Acuse</h2>
        <p>Proyección horaria tipo profesor de asignatura</p>
       <p className='texto-justificado'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat impedit, aut quo repellat dolor sit nihil. Dolorem cumque, architecto doloremque illo animi consequatur eius, commodi, vero aliquam accusantium fugiat reprehenderit.
        Consequatur, dicta accusantium culpa quos quidem illum. Tenetur animi debitis, repellat praesentium modi ullam? Doloremque vel quaerat sit mollitia provident nostrum, animi deserunt molestiae neque voluptates explicabo architecto amet culpa.
        Architecto, natus at reprehenderit qui iure ipsa soluta cum. Nihil commodi sint, id ullam quod natus veniam qui voluptas, consequuntur quos vel placeat iusto! Molestias vero iure in fugiat a.
        Et eos quibusdam sequi saepe consequuntur quas molestias, veniam tempora totam deserunt? Veritatis unde animi, est expedita dolores nisi eaque fugit dolore corrupti illo distinctio nihil dolorem molestiae reiciendis consectetur.
        Sapiente adipisci repellat ab temporibus doloremque porro eligendi natus asperiores repellendus beatae molestias excepturi qui quo pariatur fugiat vel dolores enim ratione tempore cupiditate distinctio quas vero, perspiciatis earum? Error.
        Nobis, excepturi aliquid dolorem eum repudiandae alias nemo quibusdam animi explicabo, ex harum perspiciatis, ipsum sit. Aliquid, officia. Cupiditate eveniet voluptates autem necessitatibus quas dolorum perspiciatis rem rerum saepe similique?
        </p>
        <p>
          {nombreProfesor} - {cargo}
        </p>
        <p>____________________</p>
        <p>
          {fechaHora.toLocaleDateString()} - {fechaHora.toLocaleTimeString()} - {unidadAcademica}
        </p>
        
        <small>Sello Base 64: QUFST04gRVNQQVJaQSBMT1BFWiBDSEFQQUxBIFBST0ZFU09SIEFTSUdOQVRVUkEgQSAyMDIzLTEwLTIyIDIzOjQ4OjUz</small>
        <br />
        
        <button onClick={handleImprimir}>Imprimir</button>
       {/* <div className="footer">
          <img src="../img/fooder2.jpg" alt="Logo Footer" /> {/* Corrige el nombre del archivo de imagen 
        </div>*/}
      </div>
      </div>
    </div>
    <img className='pie-pagina' src="../img/footer2.jpg" alt="Pie de página" style={{ width: '100%' }} />

    </div>
  );
}

export default AcuseComponent;
