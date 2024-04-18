// hooks
import { Link } from "react-router-dom";
import { useState } from "react";

import { LoadingSkeleton } from "./LoadingSkeleton";
// icons
import { BsPlusLg, BsTrash } from "react-icons/bs";

const AccountList = () => {
  const [tableLoading, setTableLoading] = useState(true);

  setTimeout(() => {
    setTableLoading(false);
  }, 2000);

  const tableConf = {
    target: "user-data",
    perPage: 5,
  };

  const tableData = {
    totalDocs: 5,
    docs: [
      {
        _id: "1",
        username: "John Doe",
        email: "johndoe@example.com",
        createdAt: "2023-04-01T12:00:00Z",
      },
      {
        _id: "2",
        username: "Jane Smith",
        email: "janesmith@example.com",
        createdAt: "2023-04-02T12:00:00Z",
      },
      {
        _id: "2",
        username: "Jane Allen",
        email: "janeallen@example.com",
        createdAt: "2023-04-02T12:00:00Z",
      },
      {
        _id: "2",
        username: "Jane Jack",
        email: "janejack@example.com",
        createdAt: "2023-04-02T12:00:00Z",
      },
      {
        _id: "2",
        username: "Jane lennon",
        email: "janelennon@example.com",
        createdAt: "2023-04-02T12:00:00Z",
      },
    ],
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  return (
    <>
      <section className="table-container account-list space-y-6">
        <div
          className={
            tableConf && tableConf.target !== "user-data"
              ? "table-header expand-search"
              : "table-header"
          }
        >
          {/* user-data */}
          {tableConf && tableConf.target === "user-data" && (
            <div className="actions">
              <Link to={"/account/new-account"} className="btn btn-primary">
                <BsPlusLg /> <p>Add new Admin</p>
              </Link>
              {tableData?.totalDocs ? (
                <p>
                  {" "}
                  {tableData?.totalDocs}{" "}
                  {tableData?.totalDocs > 1 ? "accounts" : "account"}
                </p>
              ) : null}
            </div>
          )}
        </div>
        <div className="overflow-x-auto ">
          <table className="table table-zebra w-[100%] mx-auto">
            {/* thead*/}
            {tableConf &&
            tableConf.target === "user-data" &&
            tableData?.docs?.length ? (
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Entry date</th>
                  <th>Delete account</th>
                </tr>
              </thead>
            ) : (
              <thead>
                <tr>
                  <th>Accounts</th>
                  <th></th>
                </tr>
              </thead>
            )}

            <tbody>
              {/* loading */}
              {tableLoading &&
                new Array(Number(tableConf.perPage))
                  .fill("")
                  .map((elm, idx) => {
                    return (
                      <tr key={idx} className="w-[100%]">
                        <LoadingSkeleton />
                      </tr>
                    );
                  })}

              {/* error on nothing found */}
              {/* {(error || tableData?.docs?.length === 0) && (
                <>
                  <div className="nodata">
                    <img src="/img/nodata.svg" alt="no data found" />
                    <h3>No record found</h3>
                  </div>
                </>
              )} */}

              {/* user-data */}
              {tableData?.docs?.length &&
              tableConf.target === "user-data" &&
              !tableLoading
                ? tableData?.docs?.map((elm, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{elm?.username}</td>
                        <td>{elm?.email}</td>

                        <td>{new Date(elm?.createdAt).toLocaleString()}</td>
                        <td>
                          <button
                            className="btn btn--delete"
                            // onClick={() =>
                            //   handleRemove(elm?._id, "account-data")
                            // }
                          >
                            <BsTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
        {tableData?.docs?.length > 0 && (
          <div className="table-footer">
            <div className="elms flex items-center justify-between">
              <button
                disabled={!tableData?.hasPrevPage}
                className="btn"
                // onClick={handlePrev}
              >
                Previous
              </button>

              <p>
                Page {tableData?.page} of {tableData?.totalPages}
              </p>

              <button
                disabled={!tableData?.hasNextPage}
                className="btn"
                // onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default AccountList;
