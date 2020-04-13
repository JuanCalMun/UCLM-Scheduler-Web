import React from "react";
import "./styles/ModalSubject.css";
const ModalSubject = ({ visible, subject, onClose }) => {

  const handleLinkOnClick = (url)=>{
    window.open(url);
  }

  return (
    <div>
      <div className={"modal is-clipped " + (visible && "is-active")}>
        <div className="modal-background" onClick={() => onClose()}></div>
        <div className="modal-content">
          {subject && (
            <div className="Subject-wrapper">
              <p className="uclm-title modal-title">{subject.name}</p>
              <p className="uclm-subtitle">
                Año: {subject.year} Cuatrimestre: {subject.quatermester}
              </p>
              <p className="uclm-subtitle">
                Tipo de asignatura: {subject.type}
              </p>
              <div className="modal-text">
                {subject.description &&
                  subject.description.split("\n").map((line) => <p>{line}</p>)}
              </div>
              <div class="buttons has-addons is-right">
                <button className="modal-link button is-text" onClick={()=>handleLinkOnClick(subject.eguideLink)}>
                  Enlace a guía-e de {subject.name}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalSubject;
