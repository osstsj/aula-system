import React, { Component } from 'react';

class HomeComponent extends Component {
    render() {
        const containerStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
        };

        const textStyle = {
            marginTop:'1rem',
            maxWidth: '90%',
            padding: '0 10px',
            fontSize: '2.5em',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'back',
            // 'background-color': 'gray',
        };

        const imgStyle = {
            marginTop:'1rem',
            maxWidth: '100%',
        };

        return (
            <div>
                <div style={containerStyle}>
                    <div className="card">
                        <div className="card-header">
                        <h3 style={textStyle}>Bienvenido al sistema Aula System! 
                        <br />En este portal podras realizar y visualizar proyecciones horarias de la red Tecnologico Superiror de Jalisco</h3>
                        </div>
                        <div className="card-body">
                        <img src="/img/home2.jpg" alt="Descripción de la imagen" style={imgStyle} />
                        </div>
                    </div>
                    
                </div>

            </div>
        );
    }
}

export default HomeComponent;
