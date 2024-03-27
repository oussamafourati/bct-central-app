import React, { useState } from "react";
import {
  Container,
  Row,
  Card,
  Col,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { useFetchProgrammsQuery, useSendResponseMutation } from "features/Programs/programSlice";
import Swal from "sweetalert2";

const LoadingContainer = () => <div>Loading...</div>;
const ProgramList = (props: any) => {
  document.title = "List of Programs | Bouden Coach Travel";
  const [modal_Pickup, setmodal_Pickup] = useState<boolean>(false);
  const [modal_Destination, setmodal_Destination] = useState<boolean>(false);
  const [modal_Action, setmodal_Action] = useState<boolean>(false);
  const { data = [] } = useFetchProgrammsQuery();
  function tog_Pickup() {
    setmodal_Pickup(!modal_Pickup);
  }
  function tog_Action() {
    setmodal_Action(!modal_Action);
  }
  const navigate = useNavigate();
  function tog_Destination() {
    setmodal_Destination(!modal_Destination);
  }
  function tog_AddShippingModals() {
    navigate("/programming/add-program");
  }

  const programLocation = useLocation()

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.programName,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pickup</span>,
      selector: (cell: any) => {
        return (
          <span>
            <Link to="#">
              <span className="text-secondary" onClick={() => tog_Pickup()}>
                {cell.origin_point.placeName}
              </span>
            </Link>
          </span>
        );
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      selector: (cell: any) => {
        return (
          <span>
            <Link to="#">
              <span
                className="text-secondary"
                onClick={() => tog_Destination()}
              >
                {cell.destination_point.placeName}
              </span>
            </Link>
          </span>
        );
      },
      sortable: true,
    },
    // {
    //   name: <span className="font-weight-bold fs-13">Stops</span>,
    //   selector: (row: any) => row.stops?.address!,
    //   sortable: true,
    // },
    {
      name: <span className="font-weight-bold fs-13">From</span>,
      selector: (row: any) => row.pickUp_date,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">To</span>,
      selector: (row: any) => row.droppOff_date,
      sortable: true,
    },
    // {
    //   name: <span className="font-weight-bold fs-13">Free Days date</span>,
    //   selector: (row: any) => row.freeDays_date,
    //   sortable: true,
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Exception</span>,
    //   selector: (row: any) => row.exceptDays,
    //   sortable: true,
    // },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            {/* <li>
              <Link
                to={`/program/${row.programName}`}
                className="badge badge-soft-dark edit-item-btn"
                state={row}
              >
                <i
                  className="ph ph-copy"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.5em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  title="Clone"
                ></i>
              </Link>
            </li> */}
            <li>
              <Link
                to={`/program-details/${row.programName}`}
                className="badge badge-soft-primary edit-item-btn"
                state={row}
              >
                <i
                  className="ph ph-eye"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.5em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                ></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-dark edit-item-btn"
                state={row}
                onClick={() => tog_Action()}
              >
                <i
                  className="ph ph-paper-plane-tilt"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.5em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                ></i>
              </Link>
            </li>
            <li>
              <Link
                to={`/edit-program/${row.Name}`}
                className="badge badge-soft-success edit-item-btn"
                state={row}
              >
                <i
                  className="ph ph-pencil-line"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.5em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                ></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-danger remove-item-btn">
                <i
                  className="ph ph-trash"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.5em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                ></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Response send successfully",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const notifyError = (err: any) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Sothing Wrong, ${err}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const [sendResponseMutation] = useSendResponseMutation();

  const initialSendResponse = {
    id: "",
    notes_for_client: "",
    unit_price: "",
    total_price: "",
    program_status: "",
  };

  const [sendResponse, setSendResponse] = useState(initialSendResponse);

  const { id, notes_for_client, unit_price, total_price, program_status } =
  sendResponse;

  const onChangeSendResponse = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSendResponse((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitSendResponse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      sendResponse["id"] = programLocation.state?._id!;
      if (isChecked) {
        sendResponse["program_status"] = "Approved";
      } else {
        sendResponse["program_status"] = "Pending";
      }
      sendResponseMutation(sendResponse)
        .then(() => notifySuccess())
        .then(() => navigate("/list-of-program"));
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Programming" pageTitle="" />
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="g-3">
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
                  <Col xxl={3} lg={6}>
                    <Flatpickr
                      className="form-control flatpickr-input"
                      placeholder="Select Date"
                      options={{
                        mode: "range",
                        dateFormat: "d M, Y",
                      }}
                    />
                  </Col>
                  <Col xxl={2} lg={6}>
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="">Status</option>
                      <option value="Pickups">Pickups</option>
                      <option value="Pending">Pending</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Out Of Delivery">Out Of Delivery</option>
                    </select>
                  </Col>

                  <Col lg={5} className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      onClick={() => tog_AddShippingModals()}
                      className="add-btn"
                    >
                      <i className="bi bi-plus-circle me-1 align-middle "></i>{" "}
                      Add Programm
                    </Button>
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
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable columns={columns} data={data} pagination />
              </Card.Body>
            </Card>
          </Col>
        </Container>
        {/* Modal Action */}
        <Modal
          className="fade zoomIn"
          size="lg"
          show={modal_Action}
          onHide={() => {
            tog_Action();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              Send Notes
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Form onSubmit={onSubmitSendResponse}>
              <Col lg={12} className="mb-2">
                <Form.Label htmlFor="notes_for_client">Notes</Form.Label>
                <textarea
                  className="form-control"
                  id="notes_for_client"
                  name="notes_for_client"
                  // placeholder="Customer see these!"
                  rows={3}
                  value={sendResponse.notes_for_client}
                  onChange={onChangeSendResponse}
                ></textarea>
              </Col>
              <Col lg={12} className="mb-2">
                <Form.Label htmlFor="unit_price">Unit Price</Form.Label>
                <Form.Control
                    type="text"
                    name="unit_price"
                    id="unit_price"
                    placeholder="£ 00.00"
                    onChange={onChangeSendResponse}
                    value={sendResponse.unit_price}
                  />
              </Col>
              <Col lg={12} className="mb-2">
                <Form.Label htmlFor="total_price">Total Price</Form.Label>
                <Form.Control
                    type="text"
                    name="total_price"
                    id="total_price"
                    placeholder="£ 00.00"
                    onChange={onChangeSendResponse}
                    value={sendResponse.total_price}
                  />
              </Col>
              <Col lg={4} className="d-flex align-items-center">
                  <div className="form-check m-2">
                    <Form.Control
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck1"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <Form.Label className="m-2" htmlFor="customerName-field">Approved</Form.Label>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_Action();
                      setSendResponse(initialSendResponse)
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button variant="primary" id="add-btn" type="submit" onClick={() => {
                      tog_Action();
                    }}>
                    Send
                  </Button>
                </div>
              </Col>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal
          className="fade zoomIn"
          size="xl"
          show={modal_Pickup}
          onHide={() => {
            tog_Pickup();
          }}
          centered
        >
          <Modal.Body className="p-4">
            <Map
              google={props.google}
              zoom={18}
              style={{ height: "118%", width: "95%" }}
              initialCenter={{ lat: 52.477732, lng: -1.8988277 }}
            >
              <Marker position={{ lat: 52.477732, lng: -1.8988277 }} />
            </Map>
          </Modal.Body>
        </Modal>
        <Modal
          className="fade zoomIn"
          size="xl"
          show={modal_Destination}
          onHide={() => {
            tog_Destination();
          }}
          centered
        >
          <Modal.Body className="p-4">
            <Map
              google={props.google}
              zoom={16}
              style={{ height: "118%", width: "95%" }}
              initialCenter={{ lat: 53.1668422, lng: -4.3276843 }}
            >
              <Marker position={{ lat: 53.166, lng: -4.3269 }} />
            </Map>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
  LoadingContainer: LoadingContainer,
  v: "3",
})(ProgramList);
