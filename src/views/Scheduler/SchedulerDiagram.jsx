import React from "react";
import { WEEKDAYS } from "../constants";
import "./styles/SchedulerDiagram.css";
import htmlToImage from "html-to-image";
import logo from "../../components/global/images/download.png";

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

  const downloadImage = () => {
    const scheduler = document.getElementById("scheduler-diagram");
    htmlToImage
      .toPng(scheduler)
      .then((data) => {
        const img = new Image();
        img.src = data;
        download("scheduler", img);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  function download(filename, image) {
    var element = document.createElement("a");
    element.setAttribute("href", image.src);
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

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
    return matchedShifts.map((shift, index) => (
      <div key={index} className={warning + getSubjectCellColor(shift.subject)}>
        <p className="has-text-weight-bold">{shift.subjectName}</p>
        <p> {shift.groupCode}</p>
        <p>{shift.room}</p>
      </div>
    ));
  };

  return (
    <div>
      <div className="scheduler-diagram">
        <div className="buttons is-right">
          <button
            className="button is-info is-fullwidth is-rounded is-light download-button"
            onClick={() => downloadImage()}
          >
            <span>Descargar</span>
            <span>
              <img className="logo" src={logo} alt="Logo" />
            </span>
          </button>
        </div>
        <table id="scheduler-diagram" className="table is-fullwidth ">
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
                  <td
                    key={timeSlot.id + "-" + weekday.id}
                    className="has-text-centered "
                  >
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
    </div>
  );
};

export default SchedulerDiagram;
