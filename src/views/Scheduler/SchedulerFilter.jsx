import React, { Component } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import "./styles/SchedulerGroupsList.css";
import { Multiselect } from "multiselect-react-dropdown";

class SchedulerFilter extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.selectedValues.name,
      types: [],
      years: [
        { code: 1, name: "Primero" },
        { code: 2, name: "Segundo" },
        { code: 3, name: "Tercero" },
        { code: 4, name: "Cuarto" },
      ],
      selected: {
        types: this.props.selectedValues.types,
        years: this.props.selectedValues.years,
      },
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    Axios.get("http://localhost:8080/api/v1/subjecttypes").then((response) => {
      const types = response.data
        .filter((type) => type.description !== "Trabajo Fin de Grado")
        .map((type) => ({
          code: type.id,
          name: type.description,
          selected: false,
        }));

      this.setState({ types: types });
    });
  }

  handleNameChange(event) {
    event.preventDefault();
    this.setState({ name: event.target.value });
  }

  handleChangeMultiselect(field, selectedValues) {
    const newState = this.state;
    newState.selected[field] = selectedValues;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    const selectedYears = this.state.selected.years.reduce(
      (accumulator, year) => accumulator.concat(year.code),
      []
    );
    const selectedTypes = this.state.selected.types.reduce(
      (accumulator, type) => accumulator.concat(type.name),
      []
    );
    const nameToFilter = this.state.name.toLowerCase();
    const filteredSubjects = this.props.subjects.filter(
      (subject) =>
        (selectedYears.length === 0 || selectedYears.includes(subject.year)) &&
        (selectedTypes.length === 0 || selectedTypes.includes(subject.type)) &&
        (nameToFilter === "" ||
          subject.name.toLowerCase().includes(nameToFilter))
    );
    // console.log(filteredSubjects);
    this.props.onSubmit(filteredSubjects, this.state.selected);
  }

  handleReset(event) {
    event.preventDefault();
    const newState = this.state;
    newState.selected.years = [];
    newState.selected.types = [];
    newState.name = "";
    this.setState(newState);
    this.props.onSubmit(this.props.subjects, newState.selected);
  }

  render() {
    return (
      <div className="scheduler-filter">
        <div className="scheduler-filter-title">
          <span className="uclm-subtitle">Filtro de asignaturas</span>
        </div>
        <div className="scheduler-filter-content">
          <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
            <div className="columns">
              <div className="column field ">
                <label className="label">Nombre</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Asignatura a buscar"
                  onChange={this.handleNameChange}
                  value={this.state.name}
                />
              </div>
              <div className="column field ">
                <label className="label">Tipo</label>
                <Multiselect
                  displayValue="name"
                  options={this.state.types.map((type) => ({
                    name: type.name,
                    code: type.code,
                  }))}
                  selectedValues={this.state.selected.types}
                  onSelect={(values) =>
                    this.handleChangeMultiselect("types", values)
                  }
                  onRemove={(values) =>
                    this.handleChangeMultiselect("types", values)
                  }
                  placeholder={"Tipos de asignatura"}
                  avoidHighlightFirstOption
                />
              </div>
              <div className="column field ">
                <label className="label">Año</label>
                <Multiselect
                  displayValue="name"
                  options={this.state.years.map((year) => ({
                    name: year.name,
                    code: year.code,
                  }))}
                  selectedValues={this.state.selected.years}
                  onSelect={(values) =>
                    this.handleChangeMultiselect("years", values)
                  }
                  onRemove={(values) =>
                    this.handleChangeMultiselect("years", values)
                  }
                  placeholder={"Años de asignaturas"}
                  avoidHighlightFirstOption
                />
              </div>
            </div>
            <div className="field is-grouped is-grouped-right">
              <button className="button is-small" type="submit">
                Filtrar
              </button>
              <button className="button is-text is-small" type="reset">
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SchedulerFilter;
