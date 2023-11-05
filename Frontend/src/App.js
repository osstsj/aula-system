import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListPlantelComponent  from './components/ControlComponents/PlantelComponent/ListPlantelComponent';
import CreatePlantelComponent  from './components/ControlComponents/PlantelComponent/CreatePlantelComponent';
import UpdatePlantelComponent  from './components/ControlComponents/PlantelComponent/UpdatePlantelComponent';
import ViewPlantelComponent  from './components/ControlComponents/PlantelComponent/ViewPlantelComponent';

import CreateCarreraComponent from './components/ControlComponents/CarreraComponent/CreateCarreraComponent';
import ListCarreraComponent from './components/ControlComponents/CarreraComponent/ListCarreraComponent';
import UpdateCarreraComponent from './components/ControlComponents/CarreraComponent/UpdateCarreraComponent';
import ViewCarreraComponent from './components/ControlComponents/CarreraComponent/ViewCarreraComponent';

import CreateCarreraPorUnidadComponent from './components/ControlComponents/CarreraPorUnidadComponent/CreateCarreraPorUnidadComponent';
import ListCarreraPorUnidadComponent from './components/ControlComponents/CarreraPorUnidadComponent/ListCarreraPorUnidadComponent';
import UpdateCarreraPorUnidadComponent from './components/ControlComponents/CarreraPorUnidadComponent/UpdateCarreraPorUnidadComponent';
import ViewCarreraPorUnidadComponent from './components/ControlComponents/CarreraPorUnidadComponent/ViewCarreraPorUnidadComponent';

import CreateOfertaAcademicaComponent from './components/ControlComponents/OfertaAcademicaComponent/CreateOfertaAcademicaComponent';
import ListOfertaAcademicaComponent from './components/ControlComponents/OfertaAcademicaComponent/ListOfertaAcademicaComponent';
import UpdateOfertaAcademicaComponent from './components/ControlComponents/OfertaAcademicaComponent/UpdateOfertaAcademicaComponent';
import ViewOfertaAcademicaComponent from './components/ControlComponents/OfertaAcademicaComponent/ViewOfertaAcademicaComponent';

import CreateAreaComponent from './components/ControlComponents/AreasComponent/CreateAreaComponent';
import ListAreaComponent from './components/ControlComponents/AreasComponent/ListAreaComponent';
import UpdateAreaComponent from './components/ControlComponents/AreasComponent/UpdateAreaComponent';
import ViewAreaComponent from './components/ControlComponents/AreasComponent/ViewAreaComponent';

import CreateColegiaturaComponent from './components/ControlComponents/ColegituraComponent/CreateColegiaturaComponent';
import ListColegiaturaComponent from './components/ControlComponents/ColegituraComponent/ListColegiaturaComponent';
import UpdateColegiaturaComponent from './components/ControlComponents/ColegituraComponent/UpdateColegiaturaComponent';
import ViewColegiaturaComponent from './components/ControlComponents/ColegituraComponent/ViewColegiaturaComponent';

import CreateDocenteComponent from './components/ControlComponents/DocenteComponent/CreateDocenteComponent';
import ListDocenteComponent from './components/ControlComponents/DocenteComponent/ListDocenteComponent';
import UpdateDocenteComponent from './components/ControlComponents/DocenteComponent/UpdateDocenteComponent';
import ViewDocenteComponent from './components/ControlComponents/DocenteComponent/ViewDocenteComponent';

import ListCargaAcademicaComponent from './components/ProyeccionesComponents/ProyeccionAsignaturaComponent/ListProyeccionAsignaturaComponent';
import ViewProyeccionAsignaturaComponent from './components/ProyeccionesComponents/ProyeccionAsignaturaComponent/ViewProyeccionAsignaturaComponent'
import ListProyeccionOrariaComponent from './components/ProyeccionesComponents/ProyeccionFullTimeComponent/ListProyeccionFullTimeComponent';
import CreateProyeccionAsignatura from './components/ProyeccionesComponents/ProyeccionAsignaturaComponent/CreateProyeccionAsignatura';

import HomeComponent from './components/PageComponents/HomeComponent/HomeComponent';

import HeaderComponent from './components/PageComponents/Navbar/HeaderComponent';
import FooterComponent from './components/PageComponents/Footer/FooterComponent';
import LoginComponents from './components/PageComponents/LoginComponents/LoginComponents';
import CreateLoginComponent from './components/PageComponents/CreateLoginComponent/CreateLoginComponent';
import AcuseComponent from './components/PageComponents/AcuseComponent/AcuseComponent';

import CreateFolioAsignaturaComponent from './components/ProyeccionesComponents/ProyeccionAsignaturaComponent/HistorialAsignaturaComponent/CreateFolioAsignaturaComponent';
import ListFolioAsignaturaComponent from './components/ProyeccionesComponents/ProyeccionAsignaturaComponent/HistorialAsignaturaComponent/ListFolioAsignaturaComponent';


function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="Container">    
                    <Switch> 
                         {/* ---------- Home ------------- */}
                         <Route path = "/" exact component = {HomeComponent}></Route>
                          {/* ---------- plantel ------------- */}
                          <Route path = "/list-plantel" exact component = {ListPlantelComponent}></Route>
                          <Route path = "/add-plantel" component = {CreatePlantelComponent}></Route>
                          <Route path = "/update-plantel/:id" component = {UpdatePlantelComponent}></Route>
                          <Route path = "/view-plantel/:id" component = {ViewPlantelComponent}></Route>

                          {/* -----------carrera---------------- */}
                          <Route path = "/list-carrera" component = {ListCarreraComponent}></Route>
                          <Route path = "/add-carrera" component = {CreateCarreraComponent}></Route>
                          <Route path = "/update-carrera/:id" component = {UpdateCarreraComponent}></Route>
                          <Route path = "/view-carrera/:id" component = {ViewCarreraComponent}></Route>

                          {/* ------------ CreateCarreraPorUnidadComponent ----------- */}
                          <Route path = "/list-carrera_por_unidad"  component = {ListCarreraPorUnidadComponent}></Route>
                          <Route path = "/add-carrera_por_unidad" component = {CreateCarreraPorUnidadComponent}></Route>
                          <Route path = "/update-carrera-por-unidad/:id" component = {UpdateCarreraPorUnidadComponent}></Route>
                          <Route path = "/view-carrera_por_unidad/:id" component = {ViewCarreraPorUnidadComponent}></Route>

                          {/* ------------ Oferta AcademicaComponent ----------- */}
                           <Route path = "/add-oferta-academica" component = {CreateOfertaAcademicaComponent}></Route>
                           <Route path = "/list-oferta-academica" component = {ListOfertaAcademicaComponent}></Route>
                           <Route path = "/update-oferta-academica/:id" component = {UpdateOfertaAcademicaComponent}></Route>
                           <Route path = "/view-oferta-academica/:id" component = {ViewOfertaAcademicaComponent}></Route>

                           {/* ------------------- Colegiatura Escolares ------------------- */}
                           <Route path = "/list-colegiatura" component = {ListColegiaturaComponent}></Route>
                           <Route path = "/add-colegiatura" component = {CreateColegiaturaComponent}></Route>
                           <Route path = "/update-colegiatura/:id" component = {UpdateColegiaturaComponent}></Route>
                           <Route path = "/view-colegiatura/:id" component = {ViewColegiaturaComponent}></Route>
                           
                           {/* ------------------- Area Escolares ------------------- */}
                           <Route path = "/list-area" component = {ListAreaComponent}></Route>
                           <Route path = "/add-area" component = {CreateAreaComponent}></Route>
                           <Route path = "/update-area/:id" component = {UpdateAreaComponent}></Route>
                           <Route path = "/view-area/:id" component = {ViewAreaComponent}></Route>

                          {/* ------------------------ Docente Components ------------------ */}
                          <Route path = "/add-docente" component = {CreateDocenteComponent}></Route>
                          <Route path = "/list-docente" component = {ListDocenteComponent}></Route>
                          <Route path = "/update-docente/:id" component = {UpdateDocenteComponent}></Route>
                          <Route path = "/view-docente/:id" component = {ViewDocenteComponent}></Route>

                           {/* ------------ ProyeccionAsignaturaComponent ----------- */}
                           <Route path = "/list-proyeccion_asignatura/:id" component = {ListCargaAcademicaComponent}></Route>
                           <Route path = "/view-proyeccion_asignatura/:id" component = {ViewProyeccionAsignaturaComponent}></Route>
                           <Route path = "/add-proyeccion_asignatura" component = {CreateProyeccionAsignatura}></Route>
                           
                           {/* ------------ ProyeccionFullTimeComponent ----------- */}
                           <Route path = "/list-full-time" component = {ListProyeccionOrariaComponent}></Route>
                          
                          {/* ------------ Longin ----------- */}
                          <Route path = "/login" component = {LoginComponents}></Route>
                          <Route path = "/add-login" component = {CreateLoginComponent}></Route>
                          {/* ------------ DocenteAsignaturaComponent ----------- */}


                          {/* ------------ Acuse ----------- */}
                          <Route path = "/acuse" component = {AcuseComponent}></Route>

                          {/* ---------------- FOLIO --------------- */}
                          <Route path = "/create-folio-asignatura" component = {CreateFolioAsignaturaComponent}></Route>
                          <Route path = "/list-folio-asignatura" component = {ListFolioAsignaturaComponent}></Route>
                            
                  </Switch>
                </div>
              <FooterComponent /> 
        </Router>
    </div>
    
  );
}

export default App;
