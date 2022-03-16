import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import applicants from "../src/models/applicants";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/apply", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const applications = await res.json();
      setData(applications);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="w-[100vw]">
        <div className="flex justify-center">
          <div className="w-6/12  mt-[10vh] h-full rounded-xl">
            <div className="flex justify-center text-[30px] pb-[30px]">
              View single Application
            </div>
            <button
              onClick={() => router.push("/apply")}
              className="flex justify-center font-bold text-white flex-row space-x-3 bg-gray-400 py-2 w-[120px] px-[5px] rounded mb-4"
            >
              APPLY HERE
            </button>
            <div className="flex justify-center h-full">
              {loading && !data && (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
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
                </div>
              )}
              {!loading && data && (
                <div className="w-full h-full">
                  <div className="not-prose relative rounded-xl overflow-hidden bg-gray-200">
                    <div
                      style={{
                        backgroundPosition: "10px 10px",
                      }}
                      className="absolute inset-0 bg-grid-slate-100"
                    ></div>
                    <div className="relative rounded-xl overflow-auto">
                      <div className="shadow-sm overflow-hidden my-8">
                        <table className="border-collapse table-auto w-full text-sm">
                          <thead className="">
                            <tr>
                              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
                                S/N
                              </th>
                              <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-black text-left">
                                First Name
                              </th>
                              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-black text-left">
                                Last Name
                              </th>
                              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-black text-left">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="">
                            {!loading &&
                              data &&
                              data.map((applicant, index) => {
                                return (
                                  <>
                                    <Link
                                      passHref={true}
                                      href={`/application/${applicant.id}`}
                                    >
                                      <tr className="hover:bg-gray-300 cursor-pointer">
                                        <td className="border-b border-gray-400 p-4 pl-8 font-bold">
                                          {index + 1}.
                                        </td>
                                        <td className="border-b border-gray-400 p-4 ">
                                          {applicant.firstName}
                                        </td>
                                        <td className="border-b border-gray-400 p-4 pr-8 ">
                                          {applicant.lastName}
                                        </td>
                                        <td className="border-b border-gray-400 p-4 pr-8 ">
                                          {applicant.status}
                                        </td>
                                      </tr>
                                    </Link>
                                  </>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
