import React from "react";
import "./Home.css";
import TimeImage from "./time.png";
import ClocksImage from "./clocks.png";
const Home = () => {
  return (
    <div>
      <p className="uclm-title">Gestión de tiempo académico</p>
      <div className="text-wrapper">
        <p className="has-text-justified">
          Estás accediendo a la herramienta de gestión de tiempo de la UCLM. 
          Con esta herramienta podrás realizar una planificación de tu asistencia 
          al siguiente curso escolar, asegurándo que no tendrás incompatibilidades
          de horas ni de grupos, además obtendrás un esquema con la planificación 
          de tus cuatrimestres como imagen, para que puedas consultarlo siempre y
          cuando lo necesites.
        </p>
        <p className="has-text-justified">
          En esta página podrás consultar también la listas de asignaturas disponibles
          para escoger en cada semestre, de tal manera que te aporte toda la información
          necesaria para ayudarte a decidir entre qué asignatura escoger, en caso de que 
          tengas que elegir entre varias.
        </p>
        <br />
        <figure className="image is-3by1">
          <img src={ClocksImage} alt="clockImage"/>
        </figure>
        <br />
        <p className="has-text-justified">
          Esta herramienta está desarrollada a raiz de un Trabajo de Fin de Grado de un 
          alumno de Ingeniería Informática del campus de Albacete.
        </p>
        <br />
        {/* <figure className="image is-2by1">
          <img src={TimeImage} alt="timeImage"/>
        </figure> */}
        {/* <br />
        <p className="has-text-justified">
          Illorum vero ista ipsa quam exilia de virtutis vi! Quam tantam volunt
          esse, ut beatum per se efficere possit. Qui non moveatur et offensione
          turpitudinis et comprobatione honestatis? Sed ut iis bonis erigimur,
          quae expectamus, sic laetamur iis, quae recordamur. Verba tu fingas et
          ea dicas, quae non sentias? Quamquam scripsit artem rhetoricam
          Cleanthes, Chrysippus etiam, sed sic, ut, si quis obmutescere
          concupierit, nihil aliud legere debeat. Atque ut ceteri dicere
          existimantur melius quam facere, sic hi mihi videntur facere melius
          quam dicere. Quae cum essent dicta, finem fecimus et ambulandi et
          disputandi. Ea possunt paria non esse. Cur igitur, inquam, res tam
          dissimiles eodem nomine appellas? Uterque enim summo bono fruitur, id
          est voluptate.
        </p> */}
      </div>
    </div>
  );
};

export default Home;
