import React from "react";
import PropTypes from "prop-types";
import "./styles/SubjectYearList.css";

const SUBJECT_TYPES_STYLES = {
  Troncal: "is-danger",
  "Específica de Ingeniería del Software": "is-primary",
  "Específica de Ingeniería de Computadores": "is-link",
  "Específica de Computación": "is-warning",
  "Específica de Tecnologías de la Información": "is-success",
  Optativa: "is-black",
  "Trabajo Fin de Grado": "is-danger",
};

const YEARS_TEXT = ["primer", "segundo", "tercer", "cuarto", "quinto", "sexto"];

const SubjectYearList = ({ year, subjects, onSelect }) => {
  return (
    <div>
      <p className="uclm-title">{YEARS_TEXT[year - 1]} Año</p>
      <div className="list is-hoverable">
        {subjects.map((subject) => (
          <a
            key={subject.id}
            className="list-item is-clipped"
            onClick={() => onSelect(subject.id)}
          >
            {subject.name}
            <div
              className={
                "tag is-light is-rounded is-pulled-right " +
                SUBJECT_TYPES_STYLES[subject.type]
              }
            >
              {subject.type.replace("Específica de ", "")}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

SubjectYearList.propTypes = {
  year: PropTypes.number,
  subjects: PropTypes.array,
};

export default SubjectYearList;
