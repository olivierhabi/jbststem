import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";

import { useState } from "react";
import { Listbox } from "@headlessui/react";

const statusChoice = ["Dropped", "Passed"];

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/apply/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const application = await res.json();

  return {
    props: { application },
  };
}

const Application = (props) => {
  const router = useRouter();
  const [selectChoice, setSelectChoice] = useState(statusChoice[0]);
  const [loading, setLoading] = useState(false);
  if (props.application.status === 404) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const updateApplication = async (id) => {
    setLoading(true);
    const res = await fetch(`/api/apply/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        status: selectChoice,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const applications = await res.json();
    setLoading(false);
  };
  return (
    <div className="w-[100vw]">
      <div className="flex justify-center">
        <div className="w-6/12  mt-[10vh] h-full rounded-xl">
          <div className="flex justify-center text-[30px]">
            View single Application
          </div>
          <div>
            <div className="py-6">
              <button
                onClick={() => router.back()}
                className="flex flex-row space-x-3 bg-gray-400 py-2 w-[100px] px-[5px] rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <div>Back</div>
              </button>
            </div>
          </div>
          <div className="flex justify-center h-full">
            <div className="bg-gray-200 w-full pt-[50px] h-[700px] rounded-xl flex flex-row">
              <div className="w-1/2 ">
                <div className="flex flex-col space-y-4 p-10">
                  <div className="flex flex-row text-[23px] space-x-5">
                    <div>First Name:</div>
                    <div>{props.application.applicant.firstName}</div>
                  </div>
                  <div className="flex flex-row text-[23px] space-x-5">
                    <div>Last Name:</div>
                    <div>{props.application.applicant.lastName}</div>
                  </div>
                  <div className="flex flex-row text-[23px] space-x-5">
                    <div>Email:</div>
                    <div>{props.application.applicant.email}</div>
                  </div>
                  <div className="flex flex-row text-[23px] space-x-5">
                    <div>Location:</div>
                    <div>{props.application.applicant.location}</div>
                  </div>
                  <div className="flex flex-row text-[23px] space-x-5">
                    <div>Status:</div>
                    <div>{props.application.applicant.status}</div>
                  </div>
                  <div className="flex flex-row text-[23px] space-x-5">
                    <div>CV (pdf):</div>
                    <a
                      className="text-blue-700"
                      href={`/${props.application.applicant.cvFile}`}
                      alt="alt text"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download File
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-row space-x-9">
                <div>Select:</div>
                <div>
                  <Listbox value={selectChoice} onChange={setSelectChoice}>
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                      {selectChoice}
                    </Listbox.Button>
                    <Listbox.Options className="text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {statusChoice.map((status) => (
                        <Listbox.Option
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-amber-900 bg-amber-100"
                                : "text-gray-900"
                            }`
                          }
                          key={status}
                          value={status}
                        >
                          {status}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </div>
                <div>
                  <button
                    onClick={() => {
                      updateApplication(props.application.applicant.id);
                    }}
                    className="flex flex-row space-x-3 bg-gray-400 py-[6px] w-[100px] px-[5px] rounded-md"
                  >
                    {loading && (
                      <svg
                        className="animate-spin  h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    <div>Update</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
