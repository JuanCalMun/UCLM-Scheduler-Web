import React from "react";
import { WEEKDAYS, TIME_SLOTS, LESSON_TYPES } from "../constants";

const ListGroupItem = ({ group, onSelect }) => {
  const groupChar = group.shifts[0].subjectGroupCode;

  const getTimeSlot = (timeSlotId, action) => {
    const timeSlot = TIME_SLOTS.find((timeSlot) => timeSlot.id === timeSlotId);
    return timeSlot[action];
  };

  const getWeekDay = (weekdayId) => {
    const weekday = WEEKDAYS.find((weekday) => weekday.id === weekdayId);
    return weekday.name;
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    onSelect(group.id);
  };

  return (
    <div onClick={(event) => handleOnClick(event)}>
      <span className="list-item is-clipped clickable list-item-group">
        <span className="list-group-item-header">Grupo: {groupChar}</span>
        {LESSON_TYPES.map((lessonType) => (
          <div key={lessonType.id}>
            <p className="list-group-item-title">{lessonType.name}</p>
            {group.shifts
              .filter((shift) => shift.lessonType === lessonType.id)
              .map((shift) => (
                <p key={shift.id} className="list-group-item-text">
                  <span>{getWeekDay(shift.weekday)}</span>
                  <span>
                    {getTimeSlot(shift.timeSlot, "startTime") +
                      " / " +
                      getTimeSlot(shift.timeSlot, "endTime")}
                  </span>
                </p>
              ))}
          </div>
        ))}
      </span>
    </div>
  );
};

export default ListGroupItem;
