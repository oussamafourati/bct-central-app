import React, { useState } from "react";
import {
  Container,
  Dropdown,
  Form,
  Row,
  Card,
  Col,
  Button,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  useGetAllDriverQuery,
  useGetDriverByIDQuery,
} from "features/Driver/driverSlice";
import { useAddDriverToQuoteMutation } from "features/Quotes/quoteSlice";
import Swal from "sweetalert2";

const ModalAssignDriver = () => {
  const locationQuote = useLocation();
  const navigate = useNavigate()
  const { data: AllDrivers = [] } = useGetAllDriverQuery();
  let filterdDrivers = AllDrivers.filter(
    (driver) => driver.driverStatus === "Active"
  );
  let journeyOne = [];
  let journeyTwo: any[] = [];
  if (locationQuote!.state!.type! === "One way") {
    journeyOne.push(locationQuote?.state!);
  } else {
    journeyTwo.push(
      {
        estimated_start_time: locationQuote.state.estimated_start_time,
        estimated_return_start_time:
          locationQuote.state.estimated_return_start_time,
        destination_point: locationQuote.state.destination_point,
        start_point: locationQuote.state.start_point,
      },
      {
        estimated_start_time: locationQuote.state.estimated_return_start_time,
        estimated_return_start_time: locationQuote.state.estimated_start_time,
        destination_point: locationQuote.state.start_point,
        start_point: locationQuote.state.destination_point,
      }
    );
  }
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Journey</span>,
      selector: (row: any, index: number) => <span>Journey {index + 1}</span>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => row.estimated_start_time,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pickup</span>,
      selector: (row: any) => row.start_point.placeName,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      selector: (row: any) => row.destination_point.placeName,
      sortable: true,
    },
    {
      name: <span className="mdi mdi-account-tie-hat font-weight-bold fs-24"></span>,
      selector: (row: any) =>
        row!.id_driver! === undefined ? (
          <span>No Driver</span>
        ) : (
          <span>{row!.id_driver?.firstname!} {row!.id_driver?.surname!}</span>
        ),
      sortable: true,
    },
    {
      name: <span className="mdi mdi-car font-weight-bold fs-24"></span>,
      selector: (row: any) =>
        row.id_vehicle?.registration_number! === undefined ? (
          <span>No Vehicle</span>
        ) : (
          <span>{row.id_vehicle?.registration_number!}</span>
        ),
      sortable: true,
    },
  ];

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Assign Done successfully",
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

  const [selectVehicle, setSelectedVehicle] = useState<string>("");
  // This function is triggered when the select Vehicle
  const handleSelectVehicle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedVehicle(value);
  };

  let { data: oneDriver } = useGetDriverByIDQuery(selectVehicle);

  const [assignDriverToQuoteMutation] = useAddDriverToQuoteMutation();

  const initialAssignDriverToQuote = {
    quote_id: "",
    id_driver: ""
  };

  const [assignDriverToDriver, setAssignDriverToQuote] = useState(initialAssignDriverToQuote);

  const { quote_id, id_driver } =
  assignDriverToDriver;

  const onChangeAssignDriverToQuote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssignDriverToQuote((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitAssignDriverToQuote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      assignDriverToDriver["quote_id"] = locationQuote.state?._id!;
      assignDriverToDriver["id_driver"] = selectVehicle;

      assignDriverToQuoteMutation(assignDriverToDriver)
        .then(() => notifySuccess())
        .then(() => navigate("/bookings"));
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center p-1">
          <div className="flex-shrink-0 me-3">
            <div className="avatar-sm">
              <div className="avatar-title rounded-circle bg-light text-primary fs-24">
                <i className="mdi mdi-map-marker-path"></i>
              </div>
            </div>
          </div>
          <div className="flex-grow-1">
            <h4 className="mb-1">Journey</h4>
          </div>
        </div>
        {locationQuote.state.type === "One way" ? (
          <DataTable columns={columns} data={journeyOne} />
        ) : (
          <DataTable columns={columns} data={journeyTwo} />
        )}
      </Card.Header>
      <Card.Header>
        <div className="d-flex align-items-center p-1">
          <div className="flex-shrink-0 me-3">
            <div className="avatar-sm">
              <div className="avatar-title rounded-circle bg-light text-primary fs-24">
                <i className="mdi mdi-account-tie-hat"></i>
              </div>
            </div>
          </div>
          <div className="flex-grow-1">
            <h4 className="mb-1">Choose Driver</h4>
          </div>
        </div>
        <Form className="tablelist-form" onSubmit={onSubmitAssignDriverToQuote}>
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <select
                  className="form-select text-muted"
                  name="vehicle_type"
                  id="vehicle_type"
                  onChange={handleSelectVehicle}
                >
                  <option value="">Select</option>
                  {filterdDrivers.map((driver) => (
                    <option value={`${driver._id}`} key={driver?._id!}>
                      {driver.firstname} {driver.surname}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            {selectVehicle && (
              <Row className="mb-2">
                <Col lg={6}>
                  <div>
                    <Form.Label>Driver Name</Form.Label>
                    <Form.Control
                      type="text"
                      readOnly
                      defaultValue={oneDriver?.firstname!}
                    />
                  </div>
                  <div className="mt-2">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      readOnly
                      defaultValue={oneDriver?.phonenumber!}
                    />
                  </div>
                  <div className="mt-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      readOnly
                      defaultValue={oneDriver?.email!}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                <div>
                    <Form.Label>Driving License Expiry</Form.Label>
                    <Form.Control
                      type="text"
                      className="text-danger"
                      readOnly
                      defaultValue={oneDriver?.driving_license_expiry!}
                    />
                  </div>
                  <div className="mt-2">
                    <Form.Label>DQC Expiry</Form.Label>
                    <Form.Control
                      type="text"
                      className="text-danger"
                      readOnly
                      defaultValue={oneDriver?.dqc_expiry!}
                    />
                  </div>
                  <div className="mt-2">
                    <Form.Label>PVC Expiry</Form.Label>
                    <Form.Control
                    className="text-danger"
                      type="text"
                      readOnly
                      defaultValue={oneDriver?.pvc_expiry!}
                    />
                  </div>
                </Col>
              </Row>
            )}
            <Col lg={12}>
              <div className="hstack gap-2 justify-content-end">
                <Button
                  className="btn-ghost-danger"
                  // onClick={() => {
                  //   tog_AddMileage();
                  // }}
                  data-bs-dismiss="modal"
                >
                  <i className="ri-close-line align-bottom me-1"></i> Close
                </Button>
                <Button variant="primary" id="add-btn" type="submit">
                  Assign Driver
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Header>
    </Card>
  );
};
export default ModalAssignDriver;
