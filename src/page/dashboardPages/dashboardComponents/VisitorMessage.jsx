import React, { useEffect, useState } from "react";
import useAxiosInstanceSecure from "../../../api/axiosInstanceSecure";
import { useQuery } from "@tanstack/react-query";

const VisitorMessage = () => {
  const axiosInstanceSecure = useAxiosInstanceSecure();

  const {
    data: messages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["visitorMessage"],
    queryFn: async () => {
      const res = await axiosInstanceSecure.get("/user-message");
      return res.data;
    },
  });
  return (
    <div className="bg-base-100 p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-6">User Messages</h2>

      {isLoading ? (
        <p className="text-base-content">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-base-content">No messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-base-300 rounded-lg">
            <thead className="bg-base-200">
              <tr>
                <th className="border border-base-300 px-4 py-2 text-left text-secondary font-semibold">
                  Name
                </th>
                <th className="border border-base-300 px-4 py-2 text-left text-secondary font-semibold">
                  Email
                </th>
                <th className="border border-base-300 px-4 py-2 text-left text-secondary font-semibold">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map(({ _id, name, email, message }) => (
                <tr
                  key={_id}
                  className="odd:bg-base-100 even:bg-base-300 hover:bg-base-200 transition-colors"
                >
                  <td className="border border-base-300 px-4 py-2 text-base-content">
                    {name}
                  </td>
                  <td className="border border-base-300 px-4 py-2 text-base-content">
                    {email}
                  </td>
                  <td className="border border-base-300 px-4 py-2 text-base-content">
                    {message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VisitorMessage;
