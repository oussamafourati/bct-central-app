import React from "react";
import { Row } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { productDelivery } from "Common/data";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const ModalEmail = () => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (row: any) => row.quoteID,
      sortable: true,
      width: "180px",
    },
    {
      name: <span className="font-weight-bold fs-13">Subject</span>,
      selector: (row: any) => (
        <span>
          <b>{row.subjectEmail}</b>
        </span>
      ),
      sortable: true,
      width: "240px",
    },
    {
      name: <span className="font-weight-bold fs-13">From</span>,
      selector: (row: any) => row.productName,
      sortable: true,
      width: "240px",
    },
    {
      name: <span className="font-weight-bold fs-13">To</span>,
      selector: (row: any) => row.productName,
      sortable: true,
      width: "240px",
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => {
        return (
          <ul className="hstack gap-3 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-info edit-item-btn"
                // onClick={() => handleDownload(row.attachment)}
              >
                <i className="ri-send-plane-fill align-middle"></i> Send Now
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-danger remove-item-btn"
                // onClick={() => AlertDelete(row._id)}
              >
                <i className="ri-close-fill align-middle"></i> Clear
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Row>
        <div className="col-xxl-12 col-lg-12">
          <div className="card card-height-100">
            <DataTable columns={columns} data={productDelivery} pagination />
          </div>
          <div>
            <Link
              to="#"
              className="link-danger fw-medium float-start mb-2"
              // onClick={clearQueue}
            >
              <span className="badge badge-label bg-primary">
                Send Queue Now
              </span>
            </Link>
            <Link
              to="#"
              className="link-danger fw-medium float-end mb-2"
              // onClick={clearQueue}
            >
              <span className="badge badge-label bg-danger">Clear Queue</span>
            </Link>
          </div>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default ModalEmail;
