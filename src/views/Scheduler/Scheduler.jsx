import React from "react";
import { Component } from "react";
import SchedulerFilter from "./SchedulerFilter";
import Axios from "axios";
import SchedulerGroupsList from "./SchedulerGroupsList";
import SchedulerDiagram from "./SchedulerDiagram";
import Switch from "react-switch";
import Swal from "sweetalert2";
import ListSelectedShifts from "./ListSelectedShifts";

class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuatermesterStates: [
        {
          cuatermester: 1,
          subjects: [],
          filteredSubjects: null,
          selectedShifts: [],
          filterValues: {
            name: "",
            types: [],
            years: [],
          },
        },
        {
          cuatermester: 2,
          subjects: [],
          filteredSubjects: null,
          selectedShifts: [],
          filterValues: {
            name: "",
            types: [],
            years: [],
          },
        },
      ],
      timeslots: [],
      selectedCuatermester: 1,
    };
    this.handleSelectSubject = this.handleSelectSubject.bind(this);
    this.handleSelectSubjectGroup = this.handleSelectSubjectGroup.bind(this);
    this.handleIncompatibleTimes = this.handleIncompatibleTimes.bind(this);
    this.handleDeleteSubject = this.handleDeleteSubject.bind(this);
  }
  advises = {
    warning: true,
    error: true,
  };

  componentDidMount() {
    Axios.get("http://localhost:8080/api/v1/subjects").then((response) => {
      const cuatermesterStates = this.state.cuatermesterStates;
      cuatermesterStates[0].subjects = response.data
        .filter((subject) => subject.quatermester === 1)
        .map((subject) => ({
          ...subject,
          isExpanded: false,
          isClickable: true,
        }));
      cuatermesterStates[1].subjects = response.data
        .filter((subject) => subject.quatermester === 2)
        .map((subject) => ({
          ...subject,
          isExpanded: false,
          isClickable: true,
        }));
      this.setState({ cuatermesterStates });
    });
    Axios.get("http://localhost:8080/api/v1/timeslots").then((response) => {
      this.setState({ timeslots: response.data });
    });
  }

  handleFilterSubmit(filteredSubjects, filterValues) {
    const newState = this.state;
    newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].filteredSubjects = filteredSubjects;
    newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].filterValues = filterValues;
    this.setState(newState);
  }

  handleSelectSubject(subjectToExpand) {
    const newState = this.state;

    newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].subjects = newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].subjects.map((subject) =>
      subject.id === subjectToExpand.id
        ? { ...subject, isExpanded: !subject.isExpanded }
        : { ...subject }
    );

    newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].filteredSubjects =
      newState.cuatermesterStates[this.state.selectedCuatermester - 1]
        .filteredSubjects &&
      newState.cuatermesterStates[
        this.state.selectedCuatermester - 1
      ].filteredSubjects.map((subject) =>
        subject.id === subjectToExpand.id
          ? { ...subject, isExpanded: !subject.isExpanded }
          : { ...subject }
      );

    this.setState(newState);
  }

  handleSelectSubjectGroup(selectedShifts) {
    const newState = this.state;
    const selectedSubject = this.state.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].subjects.find((subject) => subject.id === selectedShifts[0].subject);
    const newSelectedShifts = selectedShifts.map((shift) => ({
      subjectName: selectedSubject.name,
      ...shift,
    }));
    newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].selectedShifts = this.state.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].selectedShifts.concat(newSelectedShifts);

    newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].subjects = newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].subjects.map((subject) =>
      subject.id === selectedSubject.id
        ? { ...subject, isExpanded: false, isClickable: false }
        : { ...subject }
    );

    newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].filteredSubjects =
      newState.cuatermesterStates[this.state.selectedCuatermester - 1]
        .filteredSubjects &&
      newState.cuatermesterStates[
        this.state.selectedCuatermester - 1
      ].filteredSubjects.map((subject) =>
        subject.id === selectedSubject.id
          ? { ...subject, isExpanded: false, isClickable: false }
          : { ...subject }
      );

    this.setState(newState);
  }

  handleIncompatibleTimes(code) {
    if (this.advises[code]) {
      this.advises[code] = !this.advises[code];
      const options =
        code === "error"
          ? {
              title: "El horario creado es totalmente incompatible",
              text: "por favor revisa y elimina las asignaturas incompatibles",
            }
          : {
              title: "Puede que exista una incompatibilidad entre horarios",
              text:
                "por favor revisa la compatibilidad entre las asignaturas destacadas",
            };
      Swal.fire({ ...options, icon: code });
    }
  }

  handleDeleteSubject(subjectId) {
    const newState = this.state;
    newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].selectedShifts = this.state.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].selectedShifts.filter((shift) => shift.subject !== subjectId);

    newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].subjects = newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].subjects.map((subject) =>
      subject.id === subjectId
        ? { ...subject, isExpanded: false, isClickable: true }
        : { ...subject }
    );

    newState.cuatermesterStates[
      this.state.selectedCuatermester - 1
    ].filteredSubjects =
      newState.cuatermesterStates[this.state.selectedCuatermester - 1]
        .filteredSubjects &&
      newState.cuatermesterStates[
        this.state.selectedCuatermester - 1
      ].filteredSubjects.map((subject) =>
        subject.id === subjectId
          ? { ...subject, isExpanded: false, isClickable: true }
          : { ...subject }
      );
    this.setState(newState);
  }

  render() {
    return (
      <div className="scheduler">
        <p className="uclm-title">Planificador de horarios</p>
        <div className="columns">
          <div className="column is-2 is-offset-10 uclm-little-top">
            <p className="uclm-subtitle">Cuatrimestre</p>
            <span>Primero </span>
            <Switch
              checked={this.state.selectedCuatermester === 2}
              uncheckedIcon={false}
              checkedIcon={false}
              offColor="#888"
              onColor="#888"
              onChange={(checked) =>
                this.setState({
                  selectedCuatermester: checked ? 2 : 1,
                })
              }
              height={20}
              width={40}
            />
            <span>Segundo</span>
          </div>
        </div>
        <div className="columns">
          <div className="column is-narrow is-4">
            <SchedulerGroupsList
              subjects={
                this.state.cuatermesterStates[
                  this.state.selectedCuatermester - 1
                ].filteredSubjects ||
                this.state.cuatermesterStates[
                  this.state.selectedCuatermester - 1
                ].subjects
              }
              onSelectGroup={this.handleSelectSubjectGroup}
              onSelectSubject={this.handleSelectSubject}
            />
            <ListSelectedShifts
              selectedShifts={
                this.state.cuatermesterStates[
                  this.state.selectedCuatermester - 1
                ].selectedShifts
              }
              onDelete={this.handleDeleteSubject}
            />
          </div>
          <div className="column">
            <SchedulerFilter
              subjects={
                this.state.cuatermesterStates[
                  this.state.selectedCuatermester - 1
                ].subjects
              }
              onSubmit={(filteredSubjects) =>
                this.handleFilterSubmit(filteredSubjects)
              }
              selectedValues={
                this.state.cuatermesterStates[
                  this.state.selectedCuatermester - 1
                ].filterValues
              }
            />
            <SchedulerDiagram
              timeslots={this.state.timeslots}
              selectedShifts={
                this.state.cuatermesterStates[
                  this.state.selectedCuatermester - 1
                ].selectedShifts
              }
              onIncompatibility={this.handleIncompatibleTimes}
            />
          </div>
        </div>

        <div className="columns">
          <div className="column is-one-third">
            <div className="shceduler-selected-groups"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Scheduler;
