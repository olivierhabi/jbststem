import moment from "moment";
import { v4 as uuidv4 } from "uuid";

class Applicants {
  constructor() {
    this.applicants = [];
  }
  create(data) {
    const newApplicant = {
      id: uuidv4(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      location: data.location,
      cvFile: data.cvFile,
      status: null,
      createdOn: moment(),
      modifiedDate: moment(),
    };
    return newApplicant;
  }

  findAll() {
    return this.applicants;
  }

  findOne(id) {
    return this.applicants.find((applicant) => {
      return applicant.id === id;
    });
  }

  update(id, status) {
    const applicant = this.findOne(id);
    const index = this.applicants.indexOf(applicant);
    this.applicants[index].status = status;
    this.applicants[index].modifiedDate = moment();
    return this.applicants[index];
  }
}

export default new Applicants();
