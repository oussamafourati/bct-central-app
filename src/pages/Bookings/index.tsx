import React, { useState } from "react";
import { Container, Row, Card, Col, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import { Quote, useGetAllQuoteQuery } from "features/Quotes/quoteSlice";
import ModalAssignDriver from "./ModalAssignDriver";
import ModalAssignVehicle from "./ModalAssignVehicle";

const Bookings = () => {
  document.title = "Bookings | Bouden Coach Travel";
  const [modal_AssignDriver, setModal_AssignDriver] = useState<boolean>(false);
  const [modal_AssignVehicle, setModal_AssignVehicle] =
    useState<boolean>(false);
  const { data: AllQuotes = [] } = useGetAllQuoteQuery();
  const result = AllQuotes.filter((bookings) => bookings.status === "Booked");

  const openModalAssignDriver = () => {
    setModal_AssignDriver(!modal_AssignDriver);
  };

  const openModalAssignVehicle = () => {
    setModal_AssignVehicle(!modal_AssignVehicle);
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (cell: Quote) => {
        return (
          <span>
            <Link to={`/assign-quote/${cell?._id!}`} state={cell}>
              <span className="text-dark">{cell?._id}</span>
            </Link>{" "}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: (
        <span className="mdi mdi-account-tie-hat font-weight-bold fs-24"></span>
      ),
      selector: (row: any) =>
        row?.id_driver?.firstname! === undefined ? (
          <Link to="#" onClick={() => openModalAssignDriver()} state={row}>
            No Driver
          </Link>
        ) : (
          <span>
            {row?.id_driver?.firstname!} {row?.id_driver?.surname!}
          </span>
        ),
      sortable: true,
    },
    {
      name: <span className="mdi mdi-car font-weight-bold fs-24"></span>,
      selector: (row: any) => row?.vehicle_type!,
      sortable: true,
    },
    {
      name: <span className="mdi mdi-car font-weight-bold fs-24"></span>,
      selector: (row: any) =>
        row.id_vehicle?.registration_number! === undefined ? (
          <Link to="#" onClick={() => openModalAssignVehicle()} state={row}>
            No Vehicle
          </Link>
        ) : (
          <span>{row.id_vehicle?.registration_number!}</span>
        ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Go Date</span>,
      selector: (row: any) => row?.estimated_start_time!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pax</span>,
      selector: (row: any) => row.passengers_number,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pick Up</span>,
      selector: (row: any) => row.start_point?.placeName!,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      sortable: true,
      selector: (row: any) => row.destination_point?.placeName!,
    },
    {
      name: <span className="font-weight-bold fs-13">Progress</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.progress) {
          case "Booked":
            return <span className="badge bg-warning"> {cell.progress} </span>;
          case "Allocated":
            return <span className="badge bg-info"> {cell.progress} </span>;
          case "Driver Allocated":
            return <span className="badge bg-primary"> {cell.progress} </span>;
          case "Vehicle Allocated":
            return <span className="badge bg-secondary"> {cell.progress} </span>;
          default:
            return <span className="badge bg-danger"> {cell.progress} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Passenger Name</span>,
      sortable: true,
      selector: (row: any) => row.id_visitor?.name!,
    },
    {
      name: <span className="font-weight-bold fs-13">Mobile</span>,
      sortable: true,
      selector: (row: any) => row.id_visitor?.phone!,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      sortable: true,
      selector: (row: any) => row.id_visitor?.email!,
    },
    {
      name: <span className="font-weight-bold fs-13">Arrival Date</span>,
      sortable: true,
      selector: (row: any) => row.estimated_return_start_time,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      sortable: true,
      selector: (row: any) => row.manual_cost,
    },
    {
      name: <span className="font-weight-bold fs-13">Balance</span>,
      sortable: true,
      selector: (row: any) => row.manual_cost,
    },
    {
      name: <span className="font-weight-bold fs-13">Enquiry Date</span>,
      sortable: true,
      selector: (row: any) => row.createdAt,
    },
    {
      name: <span className="font-weight-bold fs-13">Affiliate</span>,
      sortable: true,
      selector: (row: any) => "No Affiliate",
    },
    {
      name: <span className="font-weight-bold fs-13">Callback</span>,
      sortable: true,
      selector: (row: any) => "No CallBack",
    },
    {
      name: <span className="font-weight-bold fs-13">Payment Status</span>,
      sortable: true,
      selector: (cell: any) => {
        return <span className="badge bg-danger"> Not Paid </span>;
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      sortable: true,
      selector: (cell: any) => {
        switch (cell.status) {
          case "Booked":
            return <span className="badge bg-info"> {cell.status} </span>;
          case "Medium":
            return <span className="badge bg-info"> {cell.status} </span>;
          case "Low":
            return <span className="badge bg-success"> {cell.status} </span>;
          default:
            return <span className="badge bg-danger"> {cell.status} </span>;
        }
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Account Name</span>,
      sortable: true,
      selector: (row: any) => row.id_visitor.name,
    },
    {
      name: <span className="font-weight-bold fs-13">Notes</span>,
      sortable: true,
      selector: (row: any) => {
        return row.id_visitor.notes !== "" ? row.id_visitor.notes : "No Notes";
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Bookings" pageTitle="Jobs" />
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
                  <Col lg={2}>
                    <Flatpickr
                      className="form-control flatpickr-input"
                      placeholder="Select Date"
                      options={{
                        mode: "range",
                        dateFormat: "d M, Y",
                      }}
                    />
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
          {/* Modal To Assign Driver */}
          <Modal
            className="fade zoomIn"
            size="xl"
            show={modal_AssignDriver}
            onHide={() => {
              openModalAssignDriver();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Assign Driver
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <ModalAssignDriver />
            </Modal.Body>
          </Modal>
          {/* Modal To Assign Vehicle */}
          <Modal
            className="fade zoomIn"
            size="xl"
            show={modal_AssignVehicle}
            onHide={() => {
              openModalAssignVehicle();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Assign Vehicle
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <ModalAssignVehicle />
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Bookings;
