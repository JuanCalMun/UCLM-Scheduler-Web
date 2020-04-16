import Axios from "axios";

class SchedulerAPI{
  constructor() {
    const service = Axios.create({
      headers: {csrf: 'token'}
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = (error) => {
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, '/')
        break;
      case 404:
        this.redirectTo(document, '/404')
        break;
      default:
        this.redirectTo(document, '/500')
        break;
    }
    return Promise.reject(error)
  }

  redirectTo = (document, path) => {
    document.location = path
  }

  get(path, callback) {
    return this.service.get("http://localhost:8080/api/v1/"+path).then(
      (response) => callback(response.status, response.data)
    );
  }
} 

export default SchedulerAPI;