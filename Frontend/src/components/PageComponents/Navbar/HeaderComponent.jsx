import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../Navbar/Navbar.css'
class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    UnidadList() {
        this.props.history.push('/unidad-list');
    }

    render() {
        const navbarStyle = {
            backgroundColor: '#37109c', // Set the background color to blue
        };
        const letras = {
            color: 'white', // Set the text color to white
        };

        return (
            <nav className="navbar navbar-expand-lg navbar-light" style={navbarStyle}>
                <a href="/">
                    <img src="/img/Fondo2.png" alt="..." width={150} height={70} />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto" style={{ marginLeft: '1.5rem' }}>
                        <li><p style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '18px', marginTop: '5%' }}>
                            <a style={{ color: '#ffffff' }} href="/">Aula System</a> |</p>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                style={letras}
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Control Escolar
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/list-unidad">
                                    <b>Lista de Unidades Académicas</b>
                                </a>
                                <a className="dropdown-item" href="/list-docente">
                                    <b>Lista de Docentes</b>
                                </a>
                                <a className="dropdown-item" href="/list-carrera">
                                    <b>Lista de Carreras</b>
                                </a>
                                <hr />
                                <a className="dropdown-item" href="/list-carrera_por_unidad">
                                    Lista de Carreras Por Unidad
                                </a>
                                <a className="dropdown-item" href="/list-oferta-academica">
                                    Lista de Ofertas Académicas
                                </a>
                                <a className="dropdown-item" href="/list-area">
                                    Lista de Áreas
                                </a>
                                <a className="dropdown-item" href="/list-colegiatura">
                                    Lista de Colegiaturas
                                </a>
                                {/* Add more dropdown items as needed */}
                            </div>
                        </li>

                        <li className="nav-item dropdown">
                            <a style={letras} className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                Proyecciones
                            </a>
                            <div className="dropdown-menu">
                                <div className="dropdown-submenu">
                                    <a className="dropdown-item dropdown-toggle" href="#">
                                        Proyeccion por Asignatura
                                    </a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="/list-folio-asignatura">
                                            Historial de Folios por Asignatura
                                        </a>
                                        <a className="dropdown-item" href="/create-folio-asignatura">
                                            Crear Nuevo Folio por Asignatura
                                        </a>

                                        <hr />    
                                        <a className="dropdown-item" href="/add-proyeccion_asignatura">
                                            Crear Proyeccion por Asignatura
                                        </a>                                                                           
                                    </div>
                                </div>
                                <div className="dropdown-submenu">
                                    <a className="dropdown-item dropdown-toggle" href="">
                                        Proyeccion por Tiempo Completo
                                    </a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="/list-folio-fulltime">
                                            Historial de Folios por Tiempo Completo
                                        </a>
                                        <a className="dropdown-item" href="/create-folio-fulltime">
                                            Crear Nuevo Folio por Tiempo Completo
                                        </a>
                                        
                                        <hr />  
                                        <a className="dropdown-item" href="/add-proyeccion_fulltime">
                                            Crear Proyeccion por Tiempo Completo
                                        </a>                                        
                                    </div>
                                </div>
                            </div>
                        </li>


                    </ul>
                </div>
            </nav>
        );
    }
}

export default HeaderComponent;
