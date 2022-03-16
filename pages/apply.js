import React, { useState } from "react";
import Input from "../src/components/common/Input";
import Button from "../src/components/common/Button";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Dropzone from "react-dropzone-uploader";
import destr from "destr";
import { Validations } from "../src/components/utils/formValidation";
import { ErrorMessage } from "../src/components/common/ErrorMessage";

const Apply = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cv, setCv] = useState(undefined);
  const [errorFile, setErrorFile] = useState("");
  const [message, setMessage] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const getUploadParams = (data) => {
    return {
      // url: "http://localhost:3000/api/upload",
      url: `${process.env.NEXT_PUBLIC_UPLOAD_URL}/${Date.now()}_${
        data.file.name
      }`,
    };
  };

  const handleChangeStatus = (fileWithMeta, status, fileWithMeta1) => {
    setErrorFile("");
    if (fileWithMeta.xhr) {
      console.log(fileWithMeta, "++++++++++++++++++++++++");
      if (fileWithMeta.meta.status == "done") {
        const filename = destr(fileWithMeta.xhr.response);
        setCv(filename.file);
      }
      if (fileWithMeta.meta.status == "removed") {
        setCv(undefined);
      }
    }
  };

  const sendApplication = async ({
    firstName,
    lastName,
    location,
    emailAddress,
  }) => {
    setMessage("");
    if (!cv) {
      setErrorFile("Please upload your CV");
      return;
    }

    try {
      setIsLoading(true);
      const sendApplication = await fetch("api/apply", {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: emailAddress,
          location: location,
          cvFile: `application/${cv}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await sendApplication.json();
      if (data.status == 201) {
        setMessage(data.message);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="w-[100vw]">
        <div className="flex justify-center">
          <div className="w-6/12  mt-[10vh] h-full rounded-xl">
            <div className="flex justify-center text-[30px] pb-[30px]">
              Apply Here
            </div>
            <div className="flex justify-center h-full bg-gray-100 py-10 rounded-xl">
              <form onSubmit={handleSubmit(sendApplication)}>
                <div className="flex flex-col space-y-4">
                  <div>
                    <Input
                      label="First Name"
                      placeholder="First Name"
                      type="text"
                      {...register("firstName", Validations.firstName)}
                      errorText={errors.firstName?.message}
                    />
                  </div>
                  <div>
                    <Input
                      label="Last Name"
                      placeholder="Last Name"
                      type="text"
                      {...register("lastName", Validations.lastName)}
                      errorText={errors.lastName?.message}
                    />
                  </div>
                  <div>
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Your email address"
                      {...register("emailAddress", Validations.emailAddress)}
                      errorText={errors.emailAddress?.message}
                    />
                  </div>
                  <div>
                    <Input
                      label="Location"
                      placeholder="Location"
                      type="text"
                      {...register("location", Validations.location)}
                      errorText={errors.location?.message}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-base text-black-default">
                      Upload Your CV (pdf only)
                    </label>
                    <Dropzone
                      getUploadParams={getUploadParams}
                      onChangeStatus={handleChangeStatus}
                      maxFiles={1}
                      multiple={false}
                      canCancel={false}
                      inputContent="Drop A File"
                      accept=".pdf"
                    />
                    <ErrorMessage message={errorFile || ""} />
                  </div>
                  <div>
                    <Button isLoading={isLoading}>Apply</Button>
                  </div>
                </div>
                <ErrorMessage message={message || ""} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
