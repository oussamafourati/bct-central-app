import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import { useGetAllLuggageQuery } from "features/luggage/luggageSlice";
import { useGetAllJourneyQuery } from "features/Journeys/journeySlice";
import {
  useAddSendBookEmailMutation,
  useGetQuoteByIdQuery,
} from "features/Quotes/quoteSlice";
import Swal from "sweetalert2";
import { useGetAllPricingCalendarsQuery } from "features/PricingCalendar/pricingCalendar";
import { useGetAllModePricesQuery } from "features/modePrice/modePriceSlice";

const Newquote = () => {
  document.title = "Create New Quote | Bouden Coach Travel";
  const quoteLocation = useLocation();

  const { data: AllPricingCalendar = [] } = useGetAllPricingCalendarsQuery();
  const { data: allModes = [] } = useGetAllModePricesQuery();
  const { data: quoteById } = useGetQuoteByIdQuery(quoteLocation.state._id);

  // The selected Type
  const [selectedType, setSelectedType] = useState<String>();

  // This function will be triggered when a radio button is selected
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  };

  const [selected, setSelected] = useState("");
  const handlePassengerNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const passengerNumber = e.target.value;
    setSelected(passengerNumber);
  };

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const handleVehicleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const vehicleType = e.target.value;
    setSelectedVehicle(vehicleType);
  };

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Email is sent successfully",
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

  const { data: AllVehicleTypes = [] } = useGetAllVehicleTypesQuery();
  const { data: AllLuggageDetails = [] } = useGetAllLuggageQuery();
  const { data: AllJourney = [] } = useGetAllJourneyQuery();

  const [bookEmailMutation] = useAddSendBookEmailMutation();

  const initialBookEmail = {
    quote_id: "",
    price: 0,
    id_visitor: "",
    automatic_cost: "",
    deposit_amount: "",
    deposit_percentage: "",
    total_price: "",
  };

  const [bookEmail, setBookEmail] = useState(initialBookEmail);

  const {
    id_visitor,
    price,
    quote_id,
    automatic_cost,
    deposit_amount,
    deposit_percentage,
    total_price,
  } = bookEmail;
  const navigate = useNavigate();
  const onChangeBookEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookEmail((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const [vehiclePrice, setVehiclePrice] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const onChangeVehiclePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVehiclePrice(parseInt(event.target.value));
    setTotalPrice(parseInt(event.target.value) * 1.2);
  };

  const [depositPourcentage, setDepositPourcentage] = useState<number>();
  const [depositAmount, setDepositAmount] = useState<number>();
  const onChangeDeposit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepositPourcentage(parseInt(event.target.value));
    setDepositAmount(totalPrice! * (parseInt(event.target.value) / 100));
  };

  const onSubmitBookEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      bookEmail["quote_id"] = quoteLocation.state?._id!;
      bookEmail["id_visitor"] = quoteLocation.state?.id_visitor!;
      bookEmail["price"] = vehiclePrice!;
      bookEmail["total_price"] = totalPrice!.toString();
      bookEmail["deposit_amount"] = depositAmount!.toFixed(2);
      bookEmail["deposit_percentage"] = depositPourcentage!.toString();
      bookEmail["automatic_cost"] = quoteById?.manual_cost!;
      bookEmailMutation(bookEmail)
        .then(() => notifySuccess())
        .then(() => navigate("/pending-quotes"));
    } catch (error) {
      notifyError(error);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Form onSubmit={onSubmitBookEmail}>
              <Row>
                <Col lg={8}>
                  <Card>
                    <div className="d-flex align-items-center p-2">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-secondary fs-20">
                            <i className="ph ph-quotes"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1 hstack gap-2">
                        <h5 className="card-title mb-1">
                          Quote n°: {quoteLocation.state?._id!}
                        </h5>
                        <span className="badge bg-danger">
                          {quoteLocation.state.status}
                        </span>
                      </div>
                      <div className="hstack gap-2 justify-content-end">
                        <Button
                          variant="success"
                          id="add-btn"
                          className="btn-sm"
                          type="submit"
                        >
                          Save & Send
                        </Button>
                        <Button
                          variant="info"
                          id="add-btn"
                          className="btn-sm"
                          type="submit"
                        >
                          Quick Save
                        </Button>
                      </div>
                    </div>
                    <Card.Header>
                      <div className="d-flex align-items-center p-1">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-sm">
                            <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                              <i className="ph ph-user"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-1">Customer</h5>
                        </div>
                      </div>
                      <Row>
                        {/* Email == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="supplierName-field">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              id="supplierName-field"
                              placeholder="Enter email"
                              defaultValue={
                                quoteLocation.state.id_visitor?.email!
                              }
                            />
                          </div>
                        </Col>
                        {/* Phone  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="supplierName-field">
                              Phone
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="supplierName-field"
                              placeholder="Enter phone number"
                              defaultValue={
                                quoteLocation.state.id_visitor?.phone!
                              }
                            />
                          </div>
                        </Col>
                        {/* Name  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="customerName-field">
                              Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="customerName-field"
                              placeholder="Enter full name"
                              defaultValue={
                                quoteLocation.state.id_visitor?.name!
                              }
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        {/* Mobile  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="supplierName-field">
                              Mobile
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="supplierName-field"
                              placeholder="Enter mobile number"
                              defaultValue={
                                quoteLocation.state.id_visitor?.phone!
                              }
                            />
                          </div>
                        </Col>
                        {/*  Company == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="supplierName-field">
                              Company
                              <span
                                title="If a company trip enter the name of the company"
                                className="mdi mdi-help-circle text-info"
                              ></span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="supplierName-field"
                              placeholder="Enter company"
                            />
                          </div>
                        </Col>
                        {/* External Reference  == Done*/}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="supplierName-field">
                              External Reference
                              <span
                                title="If a customer has a reference number enter here otherwise leave blank"
                                className="mdi mdi-help-circle text-info"
                              ></span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="supplierName-field"
                              placeholder="Enter external reference"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        {/* Notes  == Done */}
                        <Row>
                          <h4>Passenger</h4>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="supplierName-field">
                                Passenger Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="supplierName-field"
                                placeholder="Enter Passenger name"
                                defaultValue={
                                  quoteLocation.state.id_visitor?.name!
                                }
                              />
                            </div>
                          </Col>
                          {/*  Type == Done */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="supplierName-field">
                                Passenger Email
                              </Form.Label>
                              <Form.Control
                                type="email"
                                id="supplierName-field"
                                placeholder="Enter Passenger email"
                                defaultValue={
                                  quoteLocation.state.id_visitor?.email!
                                }
                              />
                            </div>
                          </Col>
                          {/* Pickup date & time  == Not Yet */}
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="supplierName-field">
                                Phone Number
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="supplierName-field"
                                placeholder="Enter Passenger phone number"
                                defaultValue={
                                  quoteLocation.state.id_visitor?.phone!
                                }
                              />
                            </div>
                          </Col>
                        </Row>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-1">
                        <Row>
                          <Card.Header>
                            <div className="d-flex align-items-center p-1">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ph ph-bus"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title mb-1">Transport</h5>
                              </div>
                            </div>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="passengers_number"
                                    className="form-label"
                                  >
                                    Passengers number
                                  </label>
                                  <h4>
                                    {quoteLocation.state.passengers_number}
                                  </h4>
                                </div>
                              </Col>
                              {/* Vehicle Type  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="vehicle_type"
                                    className="form-label"
                                  >
                                    Vehicle Type
                                  </label>
                                  <h5>{quoteLocation.state.vehicle_type}</h5>
                                </div>
                              </Col>
                              {/* Luggage Details  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="luggage_details"
                                    className="form-label"
                                  >
                                    Luggage Details
                                  </label>
                                  <h4>{quoteLocation.state.luggage_details}</h4>
                                </div>
                              </Col>
                              {/* Luggage Details  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="journey_type"
                                    className="form-label"
                                  >
                                    Journey Type
                                  </label>
                                  <h5>{quoteLocation.state.journey_type}</h5>
                                </div>
                              </Col>
                            </Row>
                          </Card.Header>
                        </Row>
                      </div>
                      <div className="mb-1">
                        <Row>
                          <Card.Header>
                            <div className="d-flex align-items-center p-1">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ph ph-currency-gbp"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title mb-1">
                                  Suggested Price
                                </h5>
                              </div>
                            </div>
                            <Row>
                              {/* Suggested Price  == Done */}
                              <Col lg={4}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="supplierName-field">
                                    Price
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    id="supplierName-field"
                                    placeholder={`£${quoteById?.manual_cost!}`}
                                    value={quoteById?.manual_cost!}
                                    readOnly
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Card.Header>
                        </Row>
                      </div>
                      <div className="mb-1">
                        <Row>
                          <Card.Header>
                            <div className="d-flex align-items-center p-1">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm">
                                  <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                                    <i className="ph ph-currency-gbp"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="card-title mb-1">Price</h5>
                              </div>
                            </div>
                            <Row>
                              {/* Vehicle Price  == Done */}
                              <Col lg={2}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="price">
                                    Vehicle Price
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="00.00"
                                    value={vehiclePrice}
                                    onChange={onChangeVehiclePrice}
                                  />
                                </div>
                              </Col>
                              {/* Suggested Price  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="automatic_cost">
                                    Suggested Price
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    id="automatic_cost"
                                    name="automatic_cost"
                                    placeholder="00.00"
                                    value={quoteById?.manual_cost!}
                                    readOnly
                                  />
                                </div>
                              </Col>
                              {/* Total Price == Done */}
                              <Col lg={2}>
                                <div className="mb-3">
                                  <Form.Label
                                    htmlFor="total_price"
                                    className="form-label"
                                  >
                                    Total Price
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    id="total_price"
                                    name="total_price"
                                    placeholder="00.00"
                                    onChange={onChangeBookEmail}
                                    value={totalPrice}
                                  />
                                </div>
                              </Col>
                              {/* Deposit %  == Done */}
                              <Col lg={2}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="deposit_percentage">
                                    Deposit %
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    id="deposit_percentage"
                                    name="deposit_percentage"
                                    placeholder="%"
                                    value={depositPourcentage}
                                    onChange={onChangeDeposit}
                                  />
                                </div>
                              </Col>
                              {/* Deposit Amount  == Done */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="deposit_amount">
                                    Deposit Amount
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    id="deposit_amount"
                                    name="deposit_amount"
                                    placeholder="00.00"
                                    readOnly
                                    value={depositAmount}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Card.Header>
                          <Col lg={12} className="mt-2">
                            <div className="hstack gap-2 justify-content-end">
                              <Button
                                variant="success"
                                id="add-btn"
                                className="btn-sm"
                                type="submit"
                              >
                                Save & Send
                              </Button>
                              <Button
                                variant="info"
                                id="add-btn"
                                className="btn-sm"
                                type="submit"
                              >
                                Quick Save
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card>
                    <Card.Header>
                      <div className="d-flex align-items-center p-1">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-sm">
                            <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                              <i className="ph ph-car"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-1">Trip Details</h5>
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col lg={12}>
                          <Form.Label>Pickup date</Form.Label>
                          <h5>{quoteLocation.state.estimated_start_time}</h5>
                        </Col>
                        <Col lg={12}>
                          <Form.Label>Collection Address</Form.Label>
                          <h5>{quoteLocation.state.start_point?.placeName!}</h5>
                        </Col>
                        <Col lg={12}>
                          <Form.Label>Destination Address</Form.Label>
                          <h5>
                            {quoteLocation.state.destination_point?.placeName!}
                          </h5>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Form>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Newquote;
