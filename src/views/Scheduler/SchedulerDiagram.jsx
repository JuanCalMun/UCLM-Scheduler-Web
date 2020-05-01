import React from "react";
import { WEEKDAYS } from "../constants";
import "./styles/SchedulerDiagram.css";

const SchedulerDiagram = ({ timeslots, selectedShifts, onIncompatibility }) => {
  const subjectColor = Array.from(
    selectedShifts.reduce(
      (accumulator, shift) => accumulator.add(shift.subject),
      new Set()
    )
  );

  const getSubjectCellColor = (subject) => {
    return " cell cell-color-" + subjectColor.indexOf(subject);
  };

  const getSubjectCell = (weekday, timeSlot) => {
    let matchedShifts = selectedShifts.filter(
      (shift) => shift.weekday === weekday.id && shift.shifts === timeSlot.id
    );
    switch (true) {
      case matchedShifts.length > 2:
        onIncompatibility("error");
        break;
      case matchedShifts.length > 1:
        onIncompatibility("warning");
        break;
      default:
        break;
    }
    const warning =
      matchedShifts.length > 2
        ? " danger "
        : matchedShifts.length > 1
        ? " warning "
        : "";
    return matchedShifts.map((shift) => (
      <div className={warning + getSubjectCellColor(shift.subject)}>
        <p className="has-text-weight-bold">{shift.subjectName}</p>
        <p> {shift.groupCode}</p>
        <p>{shift.room}</p>
      </div>
    ));
  };

  return (
    <div className="scheduler-diagram">
      <table className="table is-fullwidth ">
        <thead>
          <tr>
            <th></th>
            {WEEKDAYS.map((weekday) => (
              <th key={weekday.id} className="has-text-centered">
                {weekday.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeslots.map((timeSlot) => (
            <tr key={timeSlot.id} className="time-table-row">
              <td className="has-text-centered">
                <p>{timeSlot.startTime}</p>
                <hr />
                <p>{timeSlot.endTime}</p>
              </td>
              {WEEKDAYS.map((weekday) => (
                <td key={weekday.id} className="has-text-centered ">
                  {selectedShifts &&
                    selectedShifts.length > 0 &&
                    getSubjectCell(weekday, timeSlot)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulerDiagram;
