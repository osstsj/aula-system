import React from 'react';
import '../StyleLoginComponent/StyleLoginComponent.css'
import '../../StyleGlobal/Style.css'
const LoginComponents = () => {
  // Manejar el estado de los campos de entrada (Full name, Email, Password, Repeat password)
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  // Manejar los cambios en los campos de entrada
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para procesar el formulario
    // Por ejemplo, enviar los datos al servidor
  };

  return (
    <section className="pt-5 pb-5 mt-0 align-items-center d-flex bg-dark margin-bot login-fondo" >
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center d-flex-row text-center h-100">
          <div className="col-12 col-md-4 col-lg-3 h-50">
            <div className="card shadow">
              <div className="card-body mx-auto">
                <h4 className="card-title mt-3 text-center Title ">Iniciar sesión</h4>
                <small className='' style={{ color: 'grey' }} >Aula Systeam</small>
                <form onSubmit={handleFormSubmit} className='mt-4'>
                  <div className="form-group input-group">
                    {/*<div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                    </div>
                    <   input
                      name="fullName"
                      className="form-control"
                      placeholder="Full name"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />*/}
                  </div>
                  <div className="form-group input-group">
                    {/* <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                    </div>*/}
                    <input
                      name="email"
                      className="form-control"
                      placeholder="Correo electrónico "
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                    </div>
                    <input
                      name="password"
                      className="form-control"
                      placeholder="Create password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>*/}
                  <div className="form-group input-group">
                    {/* <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                    </div>*/}
                    <input
                      name="repeatPassword"
                      className="form-control"
                      placeholder="Contraseña"
                      type="password"
                      value={formData.repeatPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
                  </div>
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
