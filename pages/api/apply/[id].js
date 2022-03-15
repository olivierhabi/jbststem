import Applicants from "../../../src/controller/applicants";
import { verifyUpdateStatusApplication } from "../../../src/middleware/validators/application";

import nextConnect from "next-connect";
const handler = nextConnect()
  .put(async (req, res) => {
    await verifyUpdateStatusApplication(req, res);
    await Applicants.updateStatus(req, res);
  })
  .get(async (req, res) => {
    await Applicants.getOne(req, res);
  });

export default handler;
