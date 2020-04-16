import React, { Component } from "react";
import Axios from "axios";
import SubjectYearList from "./SubjectYearList";
import ModalSubject from "./ModalSubject";

class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      years: [],
      modal: {
        visible: false,
        subject: {},
      },
    };
    this.handleSelectSubject = this.handleSelectSubject.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    Axios.get("http://localhost:8080/api/v1/subjects").then((response) => {
      const years = response.data.reduce(
        (years, subject) => years.add(subject.year),
        new Set()
      );
      this.setState({ subjects: response.data, years: Array.from(years) });
    });
  }

  handleSelectSubject(subjectId) {
    Axios.get("http://localhost:8080/api/v1/subjects/" + subjectId).then(
      (response) => {
        this.setState({
          ...this.state,
          modal: { visible: true, subject: response.data },
        });
      }
    );
  }
  handleCloseModal() {
    this.setState({ ...this.state, modal: { visible: false, subject: {} } });
  }

  render() {
    return (
      <div className="Subjects">
        <p className="uclm-title">Lista de asignaturas</p>
        {this.state.years.map((year) => (
          <SubjectYearList
            key={year}
            year={year}
            subjects={this.state.subjects.filter(
              (subject) => subject.year === year
            )}
            onSelect={this.handleSelectSubject}
          />
        ))}

        <ModalSubject
          visible={this.state.modal.visible}
          subject={this.state.modal.subject}
          onClose={this.handleCloseModal}
        />
      </div>
    );
  }
}

export default Subjects;
