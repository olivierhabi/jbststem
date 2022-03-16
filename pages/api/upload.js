// import nc from "next-connect";
// import onError from "../../src/middleware/errormiddleware";
// import multer from "multer";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const handler = nc(onError);

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/application");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// let upload = multer({
//   storage: storage,
// });

// let uploadFile = upload.single("file");
// handler.use(uploadFile);
// handler.post(async (req, res) => {
//   console.log("req.file", req.file);
//   console.log("req.body", req.body);
//   res.status(200).send({
//     file: req.file.filename,
//   });
// });

// export default handler;

import nextConnect from "next-connect";

const handler = nextConnect().post(async (req, res) => {
  console.log(req.body, "+++++++++++++++++++++++++++++++++++++++ FILE");

  const sendApplication = await fetch(
    "https://filebin.net/uk7lt7kvougx1xuq/Olivier Bk.pdf",
    {
      method: "POST",
      body: req.body,
    }
  );
  const data = await sendApplication.json();
  console.log(data, "+++++++++++++++++++++++++++ DATA")
});

export default handler;
