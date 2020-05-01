import React from "react";
import "./styles/SchedulerGroupsList.css";
import ListSubjectItem from "./ListSubjectItem";

const SchedulerGroupsList = ({ subjects, onSelectGroup,onSelectSubject }) => (
  <div className="shceduler-groups-list">
    <div className="groups-list-title">
      <span className="uclm-subtitle"> Lista de asignaturas</span>
    </div>
    <div className="groups-list-content">
      <div className="list is-hoverable">
        {subjects.map((subject) => (
          <ListSubjectItem
            key={subject.id}
            subject={subject}
            onSelectGroup={onSelectGroup}
            onSelectSubject={onSelectSubject}
            isClickable={subject.isClickable}
            isExpanded={subject.isExpanded}
          />
        ))}
      </div>
    </div>
  </div>
);

export default SchedulerGroupsList;
