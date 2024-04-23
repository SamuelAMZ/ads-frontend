//hooks
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";

// icons
import { BsPlusLg } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { GoEye } from "react-icons/go";
// helpers
import postReq from "../../helpers/postReq";
import notif from "../../helpers/notif";

// react query
import { useQuery } from "react-query";

import { debounce } from "../../helpers/request";

//loading skeleton
import { LoadingSkeleton } from "./LoadingSkeleton";

// env
let REACT_APP_DOMAIN = import.meta.env.VITE_REACT_APP_DOMAIN;
let VITE_ENV = import.meta.env.VITE_ENV;


// view table row
import ViewTableData from "./ViewTableData";
// expotr btn
import { ExportBtn } from "../Upload/exportBtn";

const Table = ({ conf }) => {
  const [pageNumber, setPageNumber] = useState("1");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [removing, setRemoving] = useState(false);
  const location = useLocation();
  // toggle view data
  const [isOpen, setIsOpen] = useState(false);
  const [detailData, setDetailData] = useState({});

  // get table data
  const handleTableData = async () => {
    // send req
    return await postReq(
      {
        page: pageNumber,
        perPage: conf.perPage,
        searchKeyword,
        target: conf.target,
      },
      "/api/pagination"
    );
  };

  let queryKey = [location.pathname, pageNumber, searchKeyword, "user-data"];
  const {
    data: tableData,
    isLoading: tableLoading,
    error,
    refetch: getPaginate,
  } = useQuery(queryKey, handleTableData, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  //  handle next and prev
  const handleNext = () => {
    // check if page available
    if (!tableData?.hasNextPage) {
      // notif page end
      return;
    }

    // scroll to the header of table
    const tableHeaderScrollTo = document.querySelector("thead");
    tableHeaderScrollTo.scrollIntoView();

    // move page to next
    setPageNumber(tableData?.nextPage);
  };

  const handlePrev = () => {
    // check if page available
    if (!tableData?.hasPrevPage) {
      // notif page end
      return;
    }

    // scroll to the header of table
    const tableHeaderScrollTo = document.querySelector("thead");
    tableHeaderScrollTo.scrollIntoView();

    // move page to next
    setPageNumber(tableData?.prevPage);
  };

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchKeyword) {
      return;
    }

    debounce()
      .then((res) => {
        if (res) {
          setPageNumber("1");
          getPaginate();
        }
      })
      .catch((err) => {
        if (VITE_ENV === "development") {
          console.log(err);
        }
      });
  };
  // remove items
  const handleRemove = async (e, target) => {
    const targetId = e.target.getAttribute("id");

    if (!targetId) {
      return notif("error removing item, retry later");
    }

    setRemoving(true);

    const reqData = {
      id: targetId.trim(),
      target: target.trim(),
    };

    // sending request
    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("GET", "POST", "OPTIONS");
      headers.append("Access-Control-Allow-Origin", `${REACT_APP_DOMAIN}`);
      headers.append("Access-Control-Allow-Credentials", "true");

      const response = await fetch(
        `${REACT_APP_DOMAIN}/api/remove-table-item`,
        {
          mode: "cors",
          method: "POST",
          headers: headers,
          body: JSON.stringify(reqData),
          credentials: "include",
        }
      );

      const serverMessage = await response.json();

      if (serverMessage.code === "500") {
        if (VITE_ENV === "development") {
          console.log(serverMessage.message);
        }
      }

      // set data
      if (serverMessage.code === "ok") {
        setRemoving(false);

        // show success message
        notif("removed successfully");

        // refresh table
        getPaginate();
      }
    } catch (err) {
      if (VITE_ENV === "development") {
        console.log(err);
      }
      setRemoving(false);
    }
  };

  // open or close modal
  const toggleViewData = () => {
    setIsOpen(!isOpen);
  };

  // view row detail
  const ViewRowData = (idx) => {
    let { _id, __v, id, ...data } = tableData?.docs[idx] || {};
    // get detail data
    setDetailData(data);
    // open modal
    setIsOpen(true);
  };

  return (
    <>
      <section className="table-container">
        <div
          className={
            conf && conf.target !== "user-data"
              ? "table-header expand-search"
              : "table-header"
          }
        >
          {/* user-data */}
          <div className="wrapper-btn">
            {conf && conf.target === "user-data" && (
              <div className="actions import-data">
                {tableData?.docs ? (
                  <p>{tableData?.totalDocs || tableData?.docs?.length} items</p>
                ) : null}
              </div>
            )}

            {tableData?.docs?.length > 0 ? <ExportBtn /> : null}
          </div>

          {/* search form */}
          {!(error || tableData?.payload === "table conf error") && (
            <div className="search">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search in table"
                  className="input input-bordered w-full"
                  value={searchKeyword}
                  onChange={(e) => {
                    setPageNumber("0");
                    setSearchKeyword(e.target.value);
                  }}
                />
                <button className="btn ">
                  <FiSearch />
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="overflow-x-auto ">
          {/* header */}

          {/* table */}
          <table className="table table-zebra ">
            {/* thead*/}
            {conf &&
            conf.target === "user-data" &&
            (tableData?.docs?.length || tableData) ? (
              <thead>
                <tr>
                  <th>View</th>
                  <th>Id</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Education</th>
                  <th>company name</th>
                  <th>Entry date</th>
                </tr>
              </thead>
            ) : (
              <thead>
                <tr>
                  <th>Items</th>
                  <th></th>
                </tr>
              </thead>
            )}

            <tbody>
              {/* loading */}
              {tableLoading &&
                new Array(Number(conf.perPage)).fill("").map((elm, idx) => {
                  return (
                    <tr key={idx}>
                      <LoadingSkeleton />
                    </tr>
                  );
                })}

              {/* error on nothing found */}
              {(error || tableData?.docs?.length === 0) && (
                <>
                  <div className="nodata">
                    <img src="/img/nodata.svg" alt="no data found" />
                    <h3>No record found</h3>
                  </div>
                </>
              )}

              {/* user-data */}
              {tableData?.docs?.length && conf.target === "user-data"
                ? tableData?.docs?.map((elm, idx) => {
                    return (
                      <tr key={idx}>
                        <th
                          className="view-data"
                          onClick={() => ViewRowData(idx)}
                        >
                          <GoEye />
                        </th>
                        <td>{elm?.candidate_id}</td>
                        <td>{elm?.first_name}</td>
                        <td>{elm?.last_name}</td>
                        <td>{elm?.email}</td>
                        <td>{elm?.education}</td>
                        <td>{elm?.company}</td>
                        <td>{new Date(elm?.created_time).toLocaleString()}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
        {/* footer */}
        {tableData?.docs?.length > 0 && (
          <div className="table-footer">
            <div className="elms">
              <button
                disabled={!tableData?.hasPrevPage}
                className="btn"
                onClick={handlePrev}
              >
                Previous
              </button>

              <p>
                Page {tableData?.page} of {tableData?.totalPages}
              </p>

              <button
                disabled={!tableData?.hasNextPage}
                className="btn"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
      <ViewTableData
        data={detailData}
        isOpen={isOpen}
        toggleViewData={toggleViewData}
      />
    </>
  );
};

export default Table;
