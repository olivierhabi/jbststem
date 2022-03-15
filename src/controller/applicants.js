import ApplicantsModel from "../models/applicants";
import sortArray from "sort-array";

class Applicants {
  static async create(req, res) {
    try {
      const application = await ApplicantsModel.create(req.body);

      const data = {
        id: application.id,
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        location: application.location,
        cvFile: application.cvFile,
        status: application.status,
        createdOn: application.createdOn,
        modifiedDate: application.modifiedDate,
      };

      await ApplicantsModel.applicants.push(data);

      return res.status(201).send({
        status: 201,
        message: "successfully Applied",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        status: "500",
        message: `Something Went wrong logging in ${error}`,
      });
    }
  }
  static getAll(req, res) {
    const { page } = req.query;
    const applicants = ApplicantsModel.findAll();

    const sortedApplicants = sortArray(applicants, {
      by: "firstName",
      order: "asc",
    });

    const paginate = (array, pageSize, pageNumber) => {
      return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    };
    const data = paginate(sortedApplicants, 10, page ? page : 1);
    return res.status(200).send(data);
  }

  static async getOne(req, res) {
    try {
      const { id } = req.query;

      const applicant = await ApplicantsModel.findOne(id);
      if (!applicant) {
        return res
          .status(404)
          .send({ status: 404, message: "Application not found" });
      }
      return res.status(200).send({ status: 200, applicant });
    } catch (error) {
      return res.status(500).json({
        status: "500",
        message: `Something Went wrong logging in ${error}`,
      });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.query;
      const { status } = req.body;
      const applicant = await ApplicantsModel.findOne(id);
      if (!applicant) {
        return res
          .status(404)
          .send({ status: 404, message: "Application not found" });
      }

      const data = ApplicantsModel.update(id, status);
      return res.status(200).send({
        status: 200,
        message: "Application status successfully updated",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        status: "500",
        message: `Something Went wrong logging in ${error}`,
      });
    }
  }
}

export default Applicants;
