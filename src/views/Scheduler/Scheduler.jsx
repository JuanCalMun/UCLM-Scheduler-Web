import React from "react";
import { Component } from "react";
import SchedulerFilter from "./SchedulerFilter";
import Axios from "axios";
import SchedulerGroupsList from "./SchedulerGroupsList";
import SchedulerDiagram from "./SchedulerDiagram";
import Switch from "react-switch";
import Swal from "sweetalert2";

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
          selectedGroups: [],
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
          selectedGroups: [],
          filterValues: {
            name: "",
            types: [],
            years: [],
          },
        },
      ],
      subjects: [],
      filteredSubjects: null,
      timeslots: [],
      selectedShifts: [],
      selectedGroups: [],
      selectedCuatermester: 1,
    };
    this.handleSelectSubjectGroup = this.handleSelectSubjectGroup.bind(this);
    this.handleIncompatibleTimes = this.handleIncompatibleTimes.bind(this);
  }
  advises = {
    warning: true,
    error: true,
  };

  componentDidMount() {
    Axios.get("http://localhost:8080/api/v1/subjects").then((response) => {
      const cuatermesterStates = this.state.cuatermesterStates;
      cuatermesterStates[0].subjects = response.data.filter(
        (subject) => subject.quatermester === 1
      );
      cuatermesterStates[1].subjects = response.data.filter(
        (subject) => subject.quatermester === 2
      );
      this.setState({ subjects: response.data, cuatermesterStates });
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
    this.setState(newState);
  }

  handleIncompatibleTimes(code) {
    console.log(this.advises);
    console.log(code);
    if (this.advises[code]) {
      this.advises[code] = !this.advises[code];
      const options =
        code === "error"
          ? { text: "Existen asignaturas con incompatibilidades" }
          : { text: "Puede que exista una incompatibilidad entre horarios" };
      Swal.fire({ ...options, icon: code });
    }
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
              checked={this.state.isSecondCuatermester}
              uncheckedIcon={false}
              checkedIcon={false}
              offColor="#888"
              onColor="#888"
              onChange={(checked) =>
                this.setState({
                  isSecondCuatermester: checked,
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
              onSelect={this.handleSelectSubjectGroup}
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
