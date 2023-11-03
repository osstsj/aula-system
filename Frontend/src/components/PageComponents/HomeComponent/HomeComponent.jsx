import React, { Component } from 'react';

class HomeComponent extends Component {
    openLinkInBrowserForSearch(query) {
        const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(searchURL, '_blank');
    }
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
            marginTop: '4rem',
            maxWidth: '100%',
            padding: '0 10px',
            fontSize: '2.5em',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign:'justify',

        };

        const imgStyle = {
            maxWidth: '100%',
        };
        const carrusel = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            marginBottom: '2rem'

        }
        const textitle = {
            marginBottom: '25rem',
            color: '#ffffff'
        }
        const aDireccion = {
            color: '#000000',
            fontSize: '24px',
            textDecoration: 'none',
            backgroundColor: 'transparent',
            fontWeight: 'bold'

        }
        const cardStyle = {
            border: '1px solid #ccc',
            backgroundColor: '#f0f0f0',
            boxShadow: '0px 2px 8px 1px rgba(64, 60, 67, 0.24)',
          };
        const carouselData = [
            {
                imageUrl: '/img/arandas.jpg',
                altText: 'First Slide',
                title: 'First slide label',
                description: 'Calle José Guadalupe Tejeda Vázquez 557, C. José Guadalupe Tejeda Vázquez 557, S/C, Hacienda Palomino, Arandas, Jal.',
            },
            {
                imageUrl: '/img/chapala.jpg',
                altText: 'Second Slide',
                title: 'Second slide label',
                description: 'Libramiento Chapala-Ajijic #200, 45900 Chapala, Jal.',
            },
            {
                imageUrl: '/img/cocula.jpg',
                altText: 'Third Slide',
                title: 'Third slide label',
                description: ' C. Tecnológico 1000, Lomas de Cocula, 48505 Cocula, Jal.',
            },
            {
                imageUrl: '/img/grullo.jpg',
                altText: 'Third Slide',
                title: 'Third slide label',
                description: 'Carretera el Grullo - Ejutla. Kilómetro 5, Puerta de Barro, 48740 El Grullo, Jal.',
            },
            {
                imageUrl: '/img/huerta.jpg',
                altText: 'Third Slide',
                title: 'Third slide label',
                description: 'Avenida Rafael Palomera 161, El Maguey, 48850 La Huerta, Jal.',
            },
            {
                imageUrl: '/img/lagos.jpg',
                altText: 'Third Slide',
                title: 'Third slide label',
                description: ' Libramiento Tecnológico No. 5000, Colonia Portugalejo de los Romanes, 47480 Lagos de Moreno, Jal.Ameca - Mascota Km 100, Chan Rey, 46900 Jalisco, Jal.',
            },
            {
                imageUrl: '/img/mascota.jpg',
                altText: 'Third Slide',
                title: 'Third slide label',
                description: 'Ameca - Mascota Km 100, Chan Rey, 46900 Jalisco, Jal.',
            },

            {
                imageUrl: '/img/tala.jpg',
                altText: 'Third Slide',
                title: 'Third slide label',
                description: 'Av. Tecnológico 2010, Centro, 45300 Tala, Jal.',
            },

            {
                imageUrl: '/img/tamazula.jpg',
                altText: 'Third Slide',
                title: 'Third slide label',
                description: 'Carretera Tamazula Santa Rosa 329, 49650 Tamazula de Gordiano, Jal.',
            },
            {
                imageUrl: '/img/tequila.jpg',
                altText: 'Third Slide',
                title: 'Third slide label',
                description: 'Calle Dr. Joel Magallanes 501, Lomas del Paraíso, 46403 Tequila, Jal.',
            },

            {
                imageUrl: '/img/vallarta.jpg',
                altText: 'Third Slide',
                title: 'Third slide label',
                description: 'Corea del Sur 600. Col. El Mangal, Coapinole, 48290 Puerto Vallarta, Jal.',
            },

            {
                imageUrl: '/img/zapopan.jpg',
                altText: 'Third Slide',
                title: 'Third slide label',
                description: 'Cam. Arenero 1101, 45019 Zapopan, Jal.',
            },
            {
                imageUrl: '/img/zapotlanejo.jpg',
                altText: 'Third Slide',
                title: 'Third slide label',
                description: 'Av. Tecnológico No. 300, Predio Huejotitán, 45430 Zapotlanejo, Jal.',
            },

        ];
        return (

            <div >
                <div className="row mb-3 mt-3 mr-0 ml-0" style={{justifyContent:'center'}} >
                <div className="card"  style={{padding:'1%'}}>
                    <div className="card-body">
                    <div style={carrusel}>
                    <div style={containerStyle}>
                        <img src="/img/home2.jpg" alt="Descripción de la imagen" style={imgStyle} />

                    </div>
                    <div className="bd-example">
                        <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel" style={{ width: '800px', height: '600px' }}>
                            <ol className="carousel-indicators">
                                {carouselData.map((item, index) => (
                                    <li key={index} data-target="#carouselExampleCaptions" data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                                ))}
                            </ol>
                            <div className="carousel-inner">
                                {carouselData.map((item, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img src={item.imageUrl} className="d-block w-100" alt={item.altText} style={{ height: '600px', width: 'auto' }} />
                                        <div className="carousel-caption d-none d-md-block" style={textitle}>
                                           {/* <h5>{item.title}</h5>*/}
                                            <p>
                                                <a style={aDireccion}
                                                    href="#"
                                                    onClick={() => this.openLinkInBrowserForSearch(item.description)}
                                                >
                                                    {item.description}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" ariahidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    <div  style={cardStyle}>
                    <h3 style={textStyle}>Bienvenido al sistema Aula System, donde podrás realizar y visualizar proyecciones horarias para mejorar el control de  las mismas.</h3>

                    </div>
                </div>
                    </div>

                </div>

                </div>

                


            </div>

        );
    }
}

export default HomeComponent;
