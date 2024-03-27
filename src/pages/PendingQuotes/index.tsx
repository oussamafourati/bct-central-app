import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import { Link, useNavigate } from "react-router-dom";
import {
  Quote,
  useAddSendBookEmailMutation,
  useGetAllQuoteQuery,
} from "features/Quotes/quoteSlice";

const PendingQuotes = () => {
  document.title = "Pending Quotes | Bouden Coach Travel";
  const { data: AllQuotes = [] } = useGetAllQuoteQuery();
  const result = AllQuotes.filter((bookings) => bookings.status !== "Booked");
  const [modal_QuoteInfo, setmodal_QuoteInfo] = useState<boolean>(false);
  function tog_QuoteInfo() {
    setmodal_QuoteInfo(!modal_QuoteInfo);
  }
  console.log(AllQuotes[1]?.manual_cost!)
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (cell: Quote) => {
        return (
          <span>
            <Link to={`/new-quote/${cell?._id!}`} state={cell}>
              <span className="text-dark">{cell?._id}</span>
            </Link>{" "}
            <i className="ph ph-eye" onClick={() => tog_QuoteInfo()}></i>
          </span>
        );
      },
      sortable: true,
      width: "100px",
    },
    {
      name: (
        <span className="mdi mdi-account-tie-hat font-weight-bold fs-24"></span>
      ),
      selector: (row: any) => "No Driver",
      sortable: true,
      width: "88px",
    },
    {
      name: <span className="font-weight-bold fs-13">Vehicle Type</span>,
      selector: (row: any) => row.vehicle_type,
      sortable: true,
      width: "160px",
    },
    {
      name: <span className="mdi mdi-car font-weight-bold fs-24"></span>,
      selector: (row: any) => "No Vehicle",
      sortable: true,
      width: "95px",
    },
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => row.estimated_start_time,
      sortable: true,
      width: "157px",
    },
    {
      name: <span className="font-weight-bold fs-13">Pax</span>,
      selector: (row: any) => row.passengers_number,
      sortable: true,
      width: "60px",
    },
    {
      name: <span className="font-weight-bold fs-13">Pick Up</span>,
      selector: (row: any) => row.start_point?.placeName!,
      sortable: true,
      width: "270px",
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      selector: (row: any) => row.destination_point?.placeName!,
      sortable: true,
      width: "270px",
    },
    {
      name: <span className="font-weight-bold fs-13">Progress</span>,
      selector: (cell: any) => {
        switch (cell.status) {
          case "New":
            return <span className="badge bg-danger"> {cell.status} </span>;
          case "Booked":
            return <span className="badge bg-info"> {cell.status} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.status} </span>;
          default:
            return <span className="badge bg-danger"> {cell.status} </span>;
        }
      },
      sortable: true,
      width: "86px",
    },
    {
      name: <span className="font-weight-bold fs-13">Passenger Name</span>,
      selector: (row: any) => row.id_visitor?.name!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Mobile</span>,
      sortable: true,
      selector: (cell: any) => {
        return (
          <span
            className="mdi mdi-phone-in-talk-outline d-flex align-items-center"
            title={cell.id_visitor?.phone!}
          ></span>
        );
      },
      width: "72px",
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      sortable: true,
      selector: (cell: any) => {
        return (
          <span
            className="mdi mdi-email-outline d-flex align-items-center"
            title={cell.id_visitor?.email!}
          ></span>
        );
      },
      width: "70px",
    },
    {
      name: <span className="font-weight-bold fs-13">Arrival Date</span>,
      selector: (row: any) => row.estimated_return_start_time,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => row!.manual_cost!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Balance</span>,
      selector: (row: any) => "No Balance",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Contract</span>,
      selector: (row: any) => "No Contract",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Enquiry Date</span>,
      selector: (row: any) => row.createdAt,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Affiliate</span>,
      selector: (row: any) => "No Affiliate",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Callback</span>,
      selector: (row: any) => "No Callback",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Payment Status</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.PaymentStatus) {
          case "Not Paid":
            return (
              <span className="badge bg-danger"> {cell.PaymentStatus} </span>
            );
          case "Medium":
            return (
              <span className="badge bg-info"> {cell.PaymentStatus} </span>
            );
          case "Low":
            return (
              <span className="badge bg-success"> {cell.PaymentStatus} </span>
            );
          default:
            return <span className="badge bg-warning"> Not Paid </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Account Name</span>,
      selector: (row: any) => row.id_visitor?.name!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (row: any) => row.status,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Notes</span>,
      selector: (row: any) => {
        return row.notes !== "" ? <span>{row.notes}</span> : "No Notes";
      },
      sortable: true,
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Pending Quotes" pageTitle="Jobs" />
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="g-lg-2 g-4">
                  <Col sm={9} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All</option>
                      <option value="Today">Today</option>
                      <option value="Yesterday">Yesterday</option>
                      <option value="Last 7 Days">Last 7 Days</option>
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option defaultValue="This Month">This Month</option>
                      <option value="Last Month">Last Month</option>
                    </select>
                  </Col>
                  <Col lg={2}>
                    {/* <input type="text" className="form-control" data-provider="flatpickr" data-date-format="d M, Y" data-range-date="true" id="demo-datepicker" placeholder="Select date" /> */}
                    <Flatpickr
                      className="form-control flatpickr-input"
                      placeholder="Select Date"
                      options={{
                        mode: "range",
                        dateFormat: "d M, Y",
                      }}
                    />
                  </Col>
                  <Col sm={9} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All Payment</option>
                      <option value="Today">Not paid</option>
                      <option value="Yesterday">Part paid</option>
                      <option value="Last 7 Days">Paid</option>
                      <option value="Last 30 Days">Pay Cash</option>
                    </select>
                  </Col>
                  <Col sm={9} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All Progress</option>
                      <option value="Today">Accepted</option>
                      <option value="Yesterday">Allocated</option>
                      <option value="Last 7 Days">Confirmed</option>
                      <option value="Last 30 Days">Ended</option>
                      <option value="Today">In Progress</option>
                      <option value="Yesterday">Internal Job</option>
                      <option value="Last 7 Days">New</option>
                      <option value="Today">On route</option>
                      <option value="Yesterday">On site</option>
                      <option value="Last 7 Days">Under bid</option>
                    </select>
                  </Col>
                  <Col sm={9} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All Priority</option>
                      <option value="Today">1</option>
                      <option value="Yesterday">2</option>
                      <option value="Last 7 Days">3</option>
                      <option value="Last 30 Days">4</option>
                      <option value="Today">5</option>
                    </select>
                  </Col>

                  <Col className="d-flex align-items-center">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox1"
                      >
                        Private Hire
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox2"
                      >
                        Contract
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox3"
                      >
                        Non Invoiced
                      </label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <Row className="g-3">
                  <Col xxl={3} lg={6}>
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search for something..."
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                  <Col lg={7}></Col>
                  <Col>
                    <div
                      className="btn-group btn-group-sm mt-2"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" className="btn btn-outline-dark">
                        Excel
                      </button>
                      <button type="button" className="btn btn-outline-dark">
                        PDF
                      </button>
                      <button type="button" className="btn btn-outline-dark">
                        Print
                      </button>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable columns={columns} data={result} pagination />
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default PendingQuotes;