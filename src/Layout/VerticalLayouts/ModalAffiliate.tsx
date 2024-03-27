import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Offcanvas,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import TableContainer from "Common/TableContainer";
import { shipments } from "Common/data";
import offerbanner from "../../../../assets/images/ecommerce/offer-banner.jpg";
import { transaction } from "Common/data";
import SimpleBar from "simplebar-react";
import { newcustomers } from "Common/data";

const Status = ({ status }: any) => {
  switch (status) {
    case "Active":
      return <span className="badge badge-soft-success"> {status}</span>;
    case "Inactive":
      return <span className="badge badge-soft-danger"> {status}</span>;
    default:
      return <span className="badge badge-soft-success"> Active </span>;
  }
};

const ModalAffiliate = () => {
  const [paymentDetails, setPaymentDetails] = useState<any>({});

  const [openTab, setOpenTab] = useState(false);
  function open() {
    setOpenTab(true);
  }

  const columns = useMemo(
    () => [
      {
        Header: "Transaction ID",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            <Link
              to="#"
              className="fw-medium"
              onClick={() => setPaymentDetails(cellProps)}
            >
              {cellProps.transactionID}
            </Link>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Row>
        <div className="col-xxl-6 col-lg-6">
          <div className="card card-height-100">
            <SimpleBar style={{ maxHeight: "445px" }}>
              {(newcustomers || []).map((item, key) => (
                <div
                  className="p-3 border-bottom border-bottom-dashed"
                  key={key}
                  onClick={() => open()}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.productName}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </SimpleBar>
          </div>
        </div>
        {openTab === true ? (
          <div className="col-xxl-6 col-lg-6">
            <div className="card card-height-100">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Red Rose Travel</h4>
              </div>

              <Card.Body id="transactionDetails">
                <div className="table-responsive table-card">
                  <table className="table table-borderless align-middle">
                    <tbody>
                      <tr>
                        <td>
                          <span className="text-muted text-uppercase">
                            Email
                          </span>
                        </td>
                        <td>
                          <span className="fw-semibold">
                            bookings@albatrosscars.com
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="text-muted text-uppercase">
                            Phone
                          </span>
                        </td>
                        <td>
                          <span className="fw-semibold">01332 345343</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="text-muted text-uppercase">
                            Address
                          </span>
                        </td>
                        <td>
                          <span className="fw-semibold">
                            14A Midland Rd, Derby
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="text-muted text-uppercase">
                            Joining Date
                          </span>
                        </td>
                        <td>
                          <span className="fw-semibold">14 Dec 2021</span>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <span className="text-muted text-uppercase">
                            Status
                          </span>
                        </td>
                        <td>
                          <Status status={paymentDetails.status} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </div>
          </div>
        ) : (
          ""
        )}
      </Row>
    </React.Fragment>
  );
};

export default ModalAffiliate;
