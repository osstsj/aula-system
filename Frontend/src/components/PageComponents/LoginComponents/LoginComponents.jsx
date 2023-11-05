import React, { useState } from 'react';
import '../StyleLoginComponent/StyleLoginComponent.css';
import '../../StyleGlobal/Style.css';
import { useHistory } from 'react-router-dom'; // Para redireccionar al usuario a otra página

const LoginComponents = () => {
  // Manejar el estado de los campos de entrada (Full name, Email, Password, Repeat password)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // Para mostrar mensajes de error
  const history = useHistory(); // Para redireccionar al usuario

  // Manejar los cambios en los campos de entrada
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Simulación de credenciales correctas (ajústalo según tus datos reales)
    if (formData.email === 'usuario@example.com' && formData.password === 'contrasena') {
      // Credenciales válidas, redirige al usuario a la página de inicio del panel de control
      history.push('/'); // Reemplaza '/dashboard' con la ruta real
    } else {
      // Credenciales incorrectas, muestra un mensaje de error
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <section className="pt-5 pb-5 mt-0 align-items-center d-flex bg-dark margin-bot login-fondo">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center d-flex-row text-center h-100">
          <div className="col-12 col-md-4 col-lg-3 h-50">
            <div className="card shadow">
              <div className="card-body mx-auto">
                <h4 className="card-title mt-3 text-center Title">Iniciar sesión</h4>
                <small className='' style={{ color: 'grey' }}>Aula Systeam</small>
                <form onSubmit={handleFormSubmit} className='mt-4'>
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                    </div>
                    <input
                      name="email"
                      className="form-control"
                      placeholder="Correo electrónico"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                    </div>
                    <input
                      name="password"
                      className="form-control"
                      placeholder="Contraseña"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
                  </div>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <p className="text-center">¿No tienes una cuenta? <a href="/add-login">Crear una cuenta</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginComponents;
