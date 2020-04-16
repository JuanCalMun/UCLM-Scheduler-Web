import React from "react";
import "./styles/ModalSubject.css";
import { SUBJECT_TYPES_STYLES } from "../constants";

const ModalSubject = ({ visible, subject, onClose }) => {
  const handleLinkOnClick = (url) => {
    window.open(url);
  };

  return (
    <div>
      <div className={"modal " + (visible && "is-active")}>
        <div className="modal-background" onClick={() => onClose()}></div>
        <div className="modal-card">
          <header className="modal-card-head ">
            <p className="modal-card-title small"></p>
            <button className="delete right" aria-label="close" onClick={() => onClose()}></button>
          </header>
          <section className="modal-card-body">
            {subject && (
              <div className="Subject-wrapper">
                <p className="uclm-title modal-title">{subject.name} </p>
                <p className="uclm-subtitle modal-subtitle">
                  <span>Año: {subject.year} </span>
                  <span className="modal-subtitle-margin">
                    Cuatrimestre: {subject.quatermester}{" "}
                  </span>
                </p>
                <p className="uclm-subtitle modal-subtitle">
                  <span>
                    Tipo de asignatura:
                    <span
                      className={
                        "tag is-light is-rounded " +
                        SUBJECT_TYPES_STYLES[subject.type]
                      }
                    >
                      {subject.type}
                    </span>
                  </span>
                </p>
                <div className="modal-text">
                  {subject.description &&
                    subject.description
                      .split("\n")
                      .map((line, index) => <p key={index}>{line}</p>)}
                </div>
                <div className="buttons has-addons is-right">
                  <button
                    className="modal-link button is-text"
                    onClick={() => handleLinkOnClick(subject.eguideLink)}
                  >
                    Enlace a guía-e de {subject.name}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
        <div className="modal-content"></div>
      </div>
    </div>
  );
};

export default ModalSubject;
