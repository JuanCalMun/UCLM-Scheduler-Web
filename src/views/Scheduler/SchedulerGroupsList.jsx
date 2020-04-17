import React from "react";
import "./styles/SchedulerGroupsList.css";
import ListSubjectItem from "./ListSubjectItem";

const SchedulerGroupsList = ({ subjects, onSelect }) => (
  <div className="shceduler-groups-list">
    <div className="groups-list-title">
      <span className="uclm-subtitle"> Lista de grupos</span>
    </div>
    <div className="groups-list-content">
      <div className="list is-hoverable">
        {subjects.map((subject) => (
          <ListSubjectItem
            key={subject.id}
            subject={subject}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  </div>
);

export default SchedulerGroupsList;
