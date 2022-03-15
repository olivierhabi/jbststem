import Applicants from "../../../src/controller/applicants";
import { verifyApplication } from "../../../src/middleware/validators/application";

import nextConnect from "next-connect";
const handler = nextConnect()
  .get(async (req, res) => {
    await Applicants.getAll(req, res);
  })
  .post(async (req, res) => {
    await verifyApplication(req, res);
    await Applicants.create(req, res);
  });

export default handler;
