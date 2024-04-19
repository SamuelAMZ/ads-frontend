// hooks
import { Link } from "react-router-dom";
import { useState } from "react";

import { LoadingSkeleton } from "./LoadingSkeleton";
// icons
import { BsPlusLg, BsTrash } from "react-icons/bs";

import { DeleteModalConfirmation } from "./deletionModal";

const tableConf = {
  target: "user-data",
  perPage: 5,
};

const fakeTableData = {
  totalDocs: 5,
  docs: [
    {
      _id: "1",
      username: "John Doe",
      email: "johndoe@example.com",
      createdAt: "2023-04-01T1:00:00Z",
    },
    {
      _id: "2",
      username: "Allen Smith",
      email: "allensmith@example.com",
      createdAt: "2023-04-02T18:00:00Z",
    },
    {
      _id: "2",
      username: "Athena Allen",
      email: "athenaallen@example.com",
      createdAt: "2023-04-02T19:00:00Z",
    },
    {
      _id: "2",
      username: "lord Jack",
      email: "lordjack@example.com",
      createdAt: "2023-04-02T08:00:00Z",
    },
    {
      _id: "2",
      username: "Sir lennon",
      email: "sirlennon@example.com",
      createdAt: "2023-04-02T12:00:00Z",
    },
  ],
  page: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
};

const AccountList = () => {
  const [tableLoading, setTableLoading] = useState(true);

  setTimeout(() => {
    setTableLoading(false);
  }, 1300);

  const [error, setError] = useState(false);
  const [tableData, setTableData] = useState(fakeTableData);
  const [index, setIndex] = useState(null);

  const handleRemove = (idx) => {
    toggleModal();
    setIndex(idx);
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const toggleModal = () => {
    setIsDeleting((prev) => !prev);
  };

  const deleteFile = (index) => {
    if (index) {
      const newTableData = { ...tableData };
      newTableData.docs.splice(index, 1);
      setTableData(newTableData);
      toggleModal();
    } else {
      toggleModal();
    }
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
              {(error || tableData?.docs?.length === 0) && (
                <>
                  <div className="nodata space-y-4">
                    <img
                      src="/img/nodata.svg"
                      alt="no data found"
                      className="max-w-[150px]"
                    />
                    <h3>No record found</h3>
                  </div>
                </>
              )}

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
                            onClick={() => handleRemove(idx)}
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
      {isDeleting && (
        <DeleteModalConfirmation
          isDeleting={isDeleting}
          toggleModal={toggleModal}
          deleteFile={deleteFile}
          warning={{
            message: "Are you sure you want to delete this account?",
          }}
          index={index}
        />
      )}
    </>
  );
};

export default AccountList;
