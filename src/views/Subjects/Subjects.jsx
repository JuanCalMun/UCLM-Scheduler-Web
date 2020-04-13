import React, { Component } from "react";
import Axios from "axios";
import SubjectYearList from "./SubjectYearList";

class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      years: [],
    };
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

  render() {
    return (
      <div className="Subjects">
        {this.state.years.map((year) => (
          <SubjectYearList
            key={year}
            year={year}
            subjects={this.state.subjects.filter(
              (subject) => subject.year === year
            )}
          />
        ))}
      </div>
    );
  }
}

export default Subjects;
