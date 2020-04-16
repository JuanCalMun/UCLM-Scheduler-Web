import React from "react";
import PropTypes from "prop-types";
import "./styles/SubjectYearList.css";
import {SUBJECT_TYPES_STYLES} from "../constants";


const YEARS_TEXT = ["primer", "segundo", "tercer", "cuarto", "quinto", "sexto"];

const SubjectYearList = ({ year, subjects, onSelect }) => {
  return (
    <div>
      <p className="uclm-title small">{YEARS_TEXT[year - 1]} Año</p>
      <div className="list is-hoverable">
        {subjects.map((subject) => (
          <span
            key={"item-" + subject.id}
            className="list-item is-clipped clickable"
            onClick={() => onSelect(subject.id)}
          >
            {subject.name}
            <div
              key={"subject-" + subject.id}
              className={
                "tag is-light is-rounded is-pulled-right " +
                SUBJECT_TYPES_STYLES[subject.type]
              }
            >
              {subject.type.replace("Específica de ", "")}
            </div>
          </span>
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
