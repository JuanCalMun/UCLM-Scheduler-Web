import React from "react";
import "./styles/SchedulerGroupsList.css";

const ListSelectedShifts = ({ selectedShifts, onDelete }) => {
  const subjects = Array.from(
    selectedShifts.reduce(
      (accumulator, shift) => accumulator.add(shift.subject),
      new Set()
    )
  );
  const extendedSubjects = subjects.map((subject) =>
    selectedShifts.find((shift) => shift.subject === subject)
  );

  const handleDeleteSubject = (subjectId) => {
    onDelete(subjectId);
  };

  return (
    <div>
      {selectedShifts.length > 0 && (
        <div className="margin-top">
          <div>
            <span className="uclm-subtitle">Asignaturas seleccionadas</span>
          </div>
          <div className="list  ">
            {extendedSubjects.map((subject) => (
              <span key={subject.subject} className="list-item is-clipped">
                {subject.subjectName}
                <span
                  onClick={() => handleDeleteSubject(subject.subject)}
                  className="button is-danger is-rounded  is-outlined is-pulled-right is-small"
                >
                  Quitar
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListSelectedShifts;
