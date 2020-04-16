import React, { Component } from "react";
import PropTypes from "prop-types";
import Axios from "axios";

class SchedulerFilter extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      types: [],
      years: [
        { code: 1, name: "Primero", selected: false },
        { code: 2, name: "Segundo", selected: false },
        { code: 3, name: "Tercero", selected: false },
        { code: 4, name: "Cuarto", selected: false },
      ],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
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

  handleChangeCheckbox(field, modifiedStatus) {
    const newState = this.state;
    const newValue = newState[field].map((field) =>
      field.code === modifiedStatus.code ? modifiedStatus : field
    );
    newState[field] = newValue;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    const selectedYears = this.state.years
      .filter((year) => year.selected)
      .reduce((accumulator, year) => accumulator.concat(year.code), []);

    const selectedTypes = this.state.types
      .filter((type) => type.selected)
      .reduce((accumulator, type) => accumulator.concat(type.name), []);

    const nameToFilter = this.state.name.toLowerCase();

    const filteredSubjects = this.props.subjects.filter(
      subject =>
        ((selectedYears.length === 0 || selectedYears.includes(subject.year)) &&
        (selectedTypes.length === 0 || selectedTypes.includes(subject.type)) &&
        (nameToFilter === "" || subject.name.toLowerCase().includes(nameToFilter)))
    );
    this.props.onSubmit(filteredSubjects);
  }

  handleClear(event) {
    event.preventDefault();

    const clearedYears = this.state.years.map((year) => ({
      ...year,
      selected: false,
    }));
    const clearedTypes = this.state.types.map((types) => ({
      ...types,
      selected: false,
    }));
    const nameToFilter = "";

    this.setState({
      types: clearedTypes,
      years: clearedYears,
      name: nameToFilter,
    });
    
    this.props.onSubmit(this.props.subjects);
  }

  render() {
    return (
      <div className="scheduler-filter">
        <span className="uclm-subtitle">Filtro de asignaturas</span>
        <form>
          <div className="field-body">
            <div className="field">
              <label className="label">Año</label>
              {this.state.years.map((year) => (
                <div key={year.code}>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={year.selected}
                      onChange={() =>
                        this.handleChangeCheckbox("years", {
                          ...year,
                          selected: !year.selected,
                        })
                      }
                    />
                    {year.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="field">
              <label className="label">Tipo</label>
              {this.state.types.map((type) => (
                <div key={type.id}>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={type.selected}
                      onChange={() =>
                        this.handleChangeCheckbox("types", {
                          ...type,
                          selected: !type.selected,
                        })
                      }
                    />
                    {type.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="field">
              <label className="label">Nombre</label>
              <input
                className="input"
                type="text"
                placeholder="Asignaura a buscar"
                onChange={this.handleNameChange}
                value={this.state.name}
              />
            </div>
          </div>
          <div className="field is-grouped is-grouped-right">
            <p className="button is-text" onClick={this.handleClear}>
              Limpiar
            </p>
            <p className="button " onClick={this.handleSubmit}>
              Filtrar
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default SchedulerFilter;
