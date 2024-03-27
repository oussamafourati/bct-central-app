import React, { useState } from "react";
import { Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddNewContractMutation } from "features/contract/contractSlice";
import {
  Company,
  useFetchCompanyByIdQuery,
  useGetAllCompanyQuery,
} from "features/Company/companySlice";
import {
  School,
  useFetchSchoolByIdQuery,
  useGetAllSchoolsQuery,
} from "features/Schools/schools";
import { useGetAllTeamQuery } from "features/Team/teamSlice";
import {
  useFetchProgrammByIdQuery,
  useFetchProgrammsQuery,
} from "features/Programs/programSlice";
import { useGetAllVehicleTypesQuery } from "features/VehicleType/vehicleTypeSlice";
import { useGetAllLuggageQuery } from "features/luggage/luggageSlice";
import { useGetAllJourneyQuery } from "features/Journeys/journeySlice";
import AddProgramm from "pages/Programs/AddProgramm";
import AddContractProgramm from "pages/Programs/AddContractProgramm";

const AddNewContract = () => {
  document.title = "Create Contract | Bouden Coach Travel";
  const { data: AllCompany = [] } = useGetAllCompanyQuery();
  const { data: AllSchools = [] } = useGetAllSchoolsQuery();
  const { data: AllTeams = [] } = useGetAllTeamQuery();
  const { data: AllPrograms = [] } = useFetchProgrammsQuery();
  const { data: AllVehicleTypes = [] } = useGetAllVehicleTypesQuery();
  const { data: AllLuggages = [] } = useGetAllLuggageQuery();
  const { data: AllJourneys = [] } = useGetAllJourneyQuery();

  const [selectedVehicleType, setSelectedVehicletype] = useState<string>("");
  // This function is triggered when the select Vehicle Type
  const handleSelectVehicleType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedVehicletype(value);
  };

  const [selectedLuggage, setSelectedLuggage] = useState<string>("");
  // This function is triggered when the select Luggage
  const handleSelectLuggage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLuggage(value);
  };

  const [selectedJourney, setSelectedJourney] = useState<string>("");
  // This function is triggered when the select Journey
  const handleSelectJourney = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedJourney(value);
  };

  const [selectedInvoiceFrequency, setSelectedInvoiceFrequency] =
    useState<string>("");
  // This function is triggered when the select Invoice Frequency
  const handleSelectInvoiceFrequency = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedInvoiceFrequency(value);
  };

  const [selectedSalesperson, setSelectedSalesperson] = useState<string>("");
  // This function is triggered when the select Salesperson
  const handleSelectSalesperson = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedSalesperson(value);
  };

  const [selectedAccount, setSelectedAccount] = useState<string>("");
  // This function is triggered when the select Account
  const handleSelectAccount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedAccount(value);
  };

  const [selectedProgram, setSelectedProgram] = useState<string>("");
  // This function is triggered when the select Program
  const handleSelectProgram = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedProgram(value);
  };

  const { data: OneProgram } = useFetchProgrammByIdQuery(selectedProgram);
  const { data: OneCompany } = useFetchCompanyByIdQuery(selectedAccount);
  const { data: OneSchool } = useFetchSchoolByIdQuery(selectedAccount);
  const selectedCompany = (element: Company) => element._id === selectedAccount;
  let company_exist = AllCompany.some(selectedCompany);
  const selectedSchool = (element: School) => element._id === selectedAccount;
  let school_exist = AllSchools.some(selectedSchool);

  const notifySuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Contract is created successfully",
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

  const [createNewContract] = useAddNewContractMutation();
  const navigate = useNavigate();
  const initialContract = {
    contractName: "",
    invoiceFrequency: "",
    customerNotes: "",
    staffNotes: "",
    prices: "",
    salesperson: "",
    idProgram: "",
    idAccount: "",
    vehicleType: "",
    journeyType: "",
    luggageDetails: "",
    contractStatus: "Pending",
    accountName: "",
    accountEmail: "",
    accountPhone: "",
    accountRef: "",
  };

  const [contract, setContract] = useState(initialContract);

  const {
    contractName,
    invoiceFrequency,
    customerNotes,
    staffNotes,
    prices,
    salesperson,
    idProgram,
    idAccount,
    vehicleType,
    journeyType,
    luggageDetails,
    contractStatus,
    accountPhone,
    accountEmail,
    accountName,
    accountRef,
  } = contract;

  const onChangeContract = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContract((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitContract = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      contract["idAccount"] = selectedAccount;
      contract["idProgram"] = selectedProgram;
      contract["journeyType"] = selectedJourney;
      contract["luggageDetails"] = selectedLuggage;
      contract["vehicleType"] = selectedVehicleType;
      contract["salesperson"] = selectedSalesperson;
      contract["invoiceFrequency"] = selectedInvoiceFrequency;
      if (company_exist) {
        contract["accountName"] = OneCompany?.name!;
        contract["accountEmail"] = OneCompany?.email!;
        contract["accountPhone"] = OneCompany?.phone!;
        contract["accountRef"] = OneCompany?.name!;
      } else {
        contract["accountName"] = OneSchool?.name!;
        contract["accountEmail"] = OneSchool?.email!;
        contract["accountPhone"] = OneSchool?.phone!;
        contract["accountRef"] = OneSchool?.name!;
      }

      createNewContract(contract)
        .then(() => notifySuccess())
        .then(() => navigate("/contract"));
    } catch (error) {
      notifyError(error);
    }
  };
  const [show, setShow] = useState<boolean>(false);
  const handleShowProgram = () => {
    setShow(!show);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumb title="Create Vehicle" pageTitle="Vehicles" /> */}
          <Form onSubmit={onSubmitContract}>
            <Row>
              <Col lg={8}>
                <Card>
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="mdi mdi-file-sign"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">
                          Contract Information
                        </h5>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {/* Name  == Done */}
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="contractName">
                            Contract
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="contractName"
                            name="contractName"
                            placeholder="Enter contract"
                            onChange={onChangeContract}
                            value={contract.contractName}
                          />
                        </div>
                      </Col>
                      {/* Account == Done */}
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="accountRef">Account</Form.Label>
                          <Form.Control
                            type="text"
                            id="accountRef"
                            name="accountRef"
                            placeholder="Enter account name"
                            onChange={onChangeContract}
                            value={contract.accountRef}
                          />
                        </div>
                      </Col>
                      {/* Account Id Select */}
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="idAccount">
                            Find Account
                          </Form.Label>
                          <select
                            className="form-select text-muted"
                            name="invoiceFrequency"
                            id="invoiceFrequency"
                            onChange={handleSelectAccount}
                          >
                            <option value="">Select</option>
                            {AllCompany.map((company) => (
                              <option key={company._id} value={company._id}>
                                {company.name}
                              </option>
                            ))}
                            {AllSchools.map((school) => (
                              <option key={school._id} value={school._id}>
                                {school.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                    </Row>
                    {company_exist ? (
                      <Row>
                        {/* Name  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountName">Name</Form.Label>
                            <Form.Control
                              type="text"
                              id="accountName"
                              name="accountName"
                              placeholder="Enter name"
                              defaultValue={OneCompany?.name!}
                            />
                          </div>
                        </Col>
                        {/* Email  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountEmail">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountEmail"
                              name="accountEmail"
                              placeholder="Enter email"
                              defaultValue={OneCompany?.email!}
                            />
                          </div>
                        </Col>
                        {/* Phone  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountPhone">
                              Phone
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountPhone"
                              name="accountPhone"
                              placeholder="Enter phone"
                              defaultValue={OneCompany?.phone!}
                            />
                          </div>
                        </Col>
                      </Row>
                    ) : school_exist ? (
                      <Row>
                        {/* Name  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountName">Name</Form.Label>
                            <Form.Control
                              type="text"
                              id="accountName"
                              name="accountName"
                              placeholder="Enter name"
                              defaultValue={OneSchool?.name!}
                            />
                          </div>
                        </Col>
                        {/* Email  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountEmail">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountEmail"
                              name="accountEmail"
                              placeholder="Enter email"
                              defaultValue={OneSchool?.email!}
                            />
                          </div>
                        </Col>
                        {/* Phone  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountPhone">
                              Phone
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountPhone"
                              name="accountPhone"
                              placeholder="Enter phone"
                              defaultValue={OneSchool?.phone!}
                            />
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      <Row>
                        {/* Name  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountName">Name</Form.Label>
                            <Form.Control
                              type="text"
                              id="accountName"
                              name="accountName"
                              placeholder="Enter name"
                              onChange={onChangeContract}
                              value={contract.accountName}
                            />
                          </div>
                        </Col>
                        {/* Email  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountEmail">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountEmail"
                              name="accountEmail"
                              placeholder="Enter email"
                              onChange={onChangeContract}
                              value={contract.accountEmail}
                            />
                          </div>
                        </Col>
                        {/* Phone  == Done */}
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="accountPhone">
                              Phone
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="accountPhone"
                              name="accountPhone"
                              placeholder="Enter phone"
                              onChange={onChangeContract}
                              value={contract.accountPhone}
                            />
                          </div>
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="customerNotes">Notes</Form.Label>
                          <div>
                            <textarea
                              className="form-control"
                              id="customerNotes"
                              name="customerNotes"
                              placeholder="Customer see these!"
                              rows={3}
                              value={contract.customerNotes}
                              onChange={onChangeContract}
                            ></textarea>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="staffNotes">
                            Note for Staff
                          </Form.Label>
                          <div>
                            <textarea
                              className="form-control"
                              placeholder="only for staff member"
                              id="staffNotes"
                              name="staffNotes"
                              value={contract.staffNotes}
                              onChange={onChangeContract}
                              rows={3}
                            ></textarea>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="salesperson">
                            Salesperson
                          </Form.Label>
                          <select
                            className="form-select text-muted"
                            name="salesperson"
                            id="salesperson"
                            onChange={handleSelectSalesperson}
                          >
                            <option value="">Select</option>
                            {AllTeams.map((team) => (
                              <option key={team._id} value={team._id}>
                                {team.firstName} {team.lastName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="mdi mdi-currency-gbp"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">Price</h5>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-2">
                          <Form.Label htmlFor="prices">Price</Form.Label>
                          <Form.Control
                            type="text"
                            id="prices"
                            name="prices"
                            placeholder="00.00"
                            value={contract.prices}
                            onChange={onChangeContract}
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-2">
                          <Form.Label htmlFor="invoiceFrequency">
                            Invoice Frequency
                          </Form.Label>
                          <select
                            className="form-select text-muted"
                            name="invoiceFrequency"
                            id="invoiceFrequency"
                            onChange={handleSelectInvoiceFrequency}
                          >
                            <option value="">Select</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Bi Weekly">Bi Weekly</option>
                            <option value="Third Weekly">Third Weekly</option>
                            <option value="Monthly">Monthly</option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
                <Card>
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="mdi mdi-briefcase-outline"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">Job Prototype</h5>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={12}>
                        <Form.Label htmlFor="idProgram">Program</Form.Label>
                        <div className="input-group mb-3">
                          <select
                            className="form-select text-muted"
                            name="idProgram"
                            id="idProgram"
                            onChange={handleSelectProgram}
                          >
                            <option value="">Select</option>
                            {AllPrograms.map((program) => (
                              <option key={program._id} value={program._id}>
                                {program.programName}
                              </option>
                            ))}
                          </select>
                          <button
                            className="btn btn-success btn-label"
                            type="button"
                            id="button-addon2"
                            onClick={handleShowProgram}
                          >
                            <i className="mdi mdi-plus label-icon align-middle fs-18 me-2"></i>
                            New Program
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {/* job pattern name  == Done */}
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="customerName-field">
                            Job Pattern Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="customerName-field"
                            placeholder="Enter job pattern name"
                            defaultValue={OneProgram?.programName}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="recommanded_capacity">
                            Number of passengers
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="recommanded_capacity"
                            name="recommanded_capacity"
                            placeholder="Number of passengers"
                            defaultValue={OneProgram?.recommanded_capacity}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="vehicleType">
                            Vehicle Type
                          </Form.Label>
                          <div>
                            <select
                              className="form-select text-muted"
                              name="vehicleType"
                              id="vehicleType"
                              onChange={handleSelectVehicleType}
                            >
                              <option value="">Select Vehicle Type</option>
                              {AllVehicleTypes.map((vehicleType) => (
                                <option
                                  value={vehicleType._id}
                                  key={vehicleType._id}
                                >
                                  {vehicleType.type}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="luggageDetails">
                            Luggage Details
                          </Form.Label>
                          <select
                            className="form-select text-muted"
                            name="luggageDetails"
                            id="luggageDetails"
                            onChange={handleSelectLuggage}
                          >
                            <option value="">Select Luggage</option>
                            {AllLuggages.map((Luggage) => (
                              <option value={Luggage._id} key={Luggage._id}>
                                {Luggage.description}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-4">
                          <Form.Label htmlFor="journeyType">
                            Journey Type
                          </Form.Label>
                          <select
                            className="form-select text-muted"
                            name="journeyType"
                            id="journeyType"
                            onChange={handleSelectJourney}
                          >
                            <option value="">Select Journey Type</option>
                            {AllJourneys.map((journeys) => (
                              <option value={journeys._id} key={journeys._id}>
                                {journeys.type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Row className="mt-3">
                  <Col lg={11} className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary btn-lg">
                      <span>
                        <i className="ri-roadster-line align-middle"></i> Add
                        Contract
                      </span>
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          {show && (
            // <Modal
            //   className="fade modal-dialog modal-fullscreen"
            //   id="createModal"
            //   show={show}
            //   onHide={() => {
            //     handleShowProgram();
            //   }}
            //   centered
            // >
            // <div className="fade modal-dialog modal-fullscreen">
            <AddContractProgramm />
            // </div>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddNewContract;
