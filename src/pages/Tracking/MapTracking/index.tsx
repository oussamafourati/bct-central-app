import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Tab,
  Nav,
  Dropdown,
  Table,
} from "react-bootstrap";
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import img14 from "assets/images/Animation - 1704963653101.gif";

const LoadingContainer = () => <div>Loading...</div>;
const Maptracking = (props: any) => {
  document.title = "Tracking | Bouden Coach Travel";

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const [navList, setNavList] = useState(150);
  function openMap() {
    setNavList(50);
  }

  function closeMap() {
    setNavList(150);
  }

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (row: any) => row.srNo,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.FixHeadId,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Collection</span>,
      selector: (row: any) => <Link to="#!">{row.title}</Link>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      selector: (row: any) => row.user,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => row.purchaseId,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => row.assigned,
      sortable: true,
    },
  ];

  const columns2 = [
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (row: any) => row.srNo,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.FixHeadId,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Collection</span>,
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      selector: (row: any) => row.user,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => row.purchaseId,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => row.assigned,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (cell: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-success edit-item-btn"
                onClick={() => openMap()}
              >
                <i className="ri-map-2-line" title="Map View"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const columns1 = [
    {
      name: <span className="font-weight-bold fs-13">Account</span>,
      selector: (row: any) => row.srNo,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pay Date</span>,
      selector: (row: any) => row.FixHeadId,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pay Method</span>,
      selector: (row: any) => <Link to="#!">{row.title}</Link>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Amount</span>,
      selector: (row: any) => row.user,
      sortable: true,
    },
  ];

  const data = [
    {
      srNo: "86929",
      FixHeadId: "Nicole Wojtynia",
      purchaseId: "£195.00",
      title: "Paget Primary School, 110 Paget Rd",
      user: "Birmingham B24 0JP",
      assigned: "2023-10-02 12:30:00",
      createdBy: "Joseph Parker",
      createDate: "03 Oct, 2021",
      status: "Re-open",
      priority: "High",
    },
    {
      srNo: "86930",
      FixHeadId: "Nicole Wojtynia",
      purchaseId: "£195.00",
      title: "Paget Primary School, 110 Paget Rd",
      user: "Birmingham B24 0JP",
      assigned: "2023-10-02 12:30:00",
      createdBy: "Mary Rucker",
      createDate: "05 Oct, 2021",
      status: "On-Hold",
      priority: "Medium",
    },
    {
      srNo: "86931",
      FixHeadId: "Nicole Wojtynia",
      purchaseId: "£195.00",
      title: "Paget Primary School, 110 Paget Rd",
      user: "Birmingham B24 0JP",
      assigned: "2023-10-02 12:30:00",
      createdBy: "Tonya Noble",
      createDate: "27 April, 2022",
      status: "Closed",
      priority: "Low",
    },
  ];
  const data2 = [
    {
      srNo: "86929",
      FixHeadId: "Nicole Wojtynia",
      purchaseId: "£195.00",
      title: "Paget Primary School, 110 Paget Rd",
      user: "Birmingham B24 0JP",
      assigned: "2023-10-02 12:30:00",
      createdBy: "Joseph Parker",
      createDate: "03 Oct, 2021",
      status: "Re-open",
      priority: "High",
    },
    {
      srNo: "86930",
      FixHeadId: "Nicole Wojtynia",
      purchaseId: "£195.00",
      title: "Paget Primary School, 110 Paget Rd",
      user: "Birmingham B24 0JP",
      assigned: "2023-10-02 12:30:00",
      createdBy: "Mary Rucker",
      createDate: "05 Oct, 2021",
      status: "On-Hold",
      priority: "Medium",
    },
    {
      srNo: "86931",
      FixHeadId: "Nicole Wojtynia",
      purchaseId: "£195.00",
      title: "Paget Primary School, 110 Paget Rd",
      user: "Birmingham B24 0JP",
      assigned: "2023-10-02 12:30:00",
      createdBy: "Tonya Noble",
      createDate: "27 April, 2022",
      status: "Closed",
      priority: "Low",
    },
  ];
  const data1 = [
    {
      srNo: "Priya Naker",
      FixHeadId: "06-03-2023",
      title: "Bank Transfert",
      user: "£4,620.00",
      assigned: "2023-10-02 12:30:00",
      createdBy: "Joseph Parker",
      createDate: "03 Oct, 2021",
      status: "Re-open",
      priority: "High",
    },
  ];

  const [activeVerticalTab, setactiveVerticalTab] = useState<number>(1);
  const [isHovered, setHover] = useState(false);
  const [navWidth, setNavWidth] = useState(150);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);
  const [showMenuWindow, setMenuWindowFlag] = useState(true);
  function openNav() {
    setNavWidth(100);
    setOpenMenu(true);
    setIsOpen(false)
    setInfoWindowFlag(!showInfoWindow)
  }

  function closeNav() {
    setNavWidth(150);
  }

  const [changeColor, setChangeColor] = useState<boolean>(false);

  // function for handleClick
  const handleClick = () => {
    setChangeColor(!changeColor);
    setNavWidth(150);
  };



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="d-flex justify-content-end">
            <button
              onClick={handleClick}
              type="button"
              className={`btn btn-darken-success custom-toggle btn-sm mb-1 ${changeColor === false ? "btn-darken-success" : "btn-darken-info"
                }`}
              data-bs-toggle="button"
            >
              <span className="icon-on">
                <i
                  className={`${changeColor === false
                    ? "ri-road-map-line align-bottom me-1"
                    : "ri-table-2 align-bottom me-1"
                    }`}
                ></i>
                {changeColor === false ? "Map" : "List"}
              </span>
            </button>
          </div>
          <Row>
            {changeColor === false ? (
              <Col lg={8}>
                <Row>
                  <Col lg={12}>
                    <div
                      className="card-body"
                      onMouseOver={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    >
                      <div
                        id="gmaps-types"
                        className="gmaps"
                        style={{ position: "relative" }}
                      >
                        <Map
                          google={props.google}
                          zoom={13}
                          style={{ height: "200%", width: `${navWidth}%` }}
                          initialCenter={{ lat: 52.5244734, lng: -1.9857876 }}
                        >
                          <Marker
                            position={{ lat: 52.474394, lng: -1.901612 }}
                            // onClick={() => openNav()}
                            onClick={() => setOpenMenu(!openMenu)}
                            icon={img14}
                            style={{height:"5%"}}
                          />
                          {openMenu && (
                            <InfoWindow
                              position={{ lat: 52.474394, lng: -1.901612 }}
                              visible={showMenuWindow}
                            >
                              {/* Circle Menu */}
                              <Row className="justify-content-center">
                                <div className="container">
                                  <div className="row justify-content-start">
                                    <div className="col-4">
                                      {" "}
                                    </div>
                                    <div className="col-4">
                                    {" "}
                                    </div>
                                  </div>
                                  <div className="row justify-content-center">
                                    <div className="col-4">
                                    {" "}
                                    </div>
                                    <div className="col-4">
                                      <i className="ri-equalizer-line"></i>
                                    </div>
                                    <div className="col-4">
                                    {" "}
                                    </div>
                                  </div>
                                  <div className="row justify-content-between">
                                    <div className="col-4">
                                      <i className="ri-equalizer-line"></i>
                                    </div>
                                    <div className="col-4">
                                      <i className="ri-equalizer-line"></i>
                                    </div>
                                  </div>
                                  <div className="row justify-content-center">
                                    <div className="col-4">
                                    {" "}
                                    </div>
                                    <div className="col-4">
                                      <i className="ri-equalizer-line"></i>
                                    </div>
                                    <div className="col-4">
                                    {" "}
                                    </div>
                                  </div>
                                  <div className="row justify-content-start">
                                    <div className="col-4">
                                      {" "}
                                    </div>
                                    <div className="col-4">
                                    {" "}
                                    </div>
                                  </div>
                                </div>
                              </Row>
                            </InfoWindow>
                          )}
                          {/* {isOpen && (
                            <InfoWindow
                              position={{ lat: 52.47866982807519, lng: -1.9015459803590116 }}
                              visible={showInfoWindow}
                            >
                              <div>
                                <h4>415-778-3654</h4>
                              </div>
                            </InfoWindow>
                          )}  */}
                        </Map>
                        {navWidth === 100 ? (
                          <button
                            type="button"
                            className="btn btn-danger btn-icon"
                            onClick={() => closeNav()}
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      {isHovered && (
                        <Dropdown
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "-365px",
                          }}
                        >
                          <Dropdown.Toggle
                            className="btn-icon btn btn-darken-warning arrow-none btn-sm w-sm"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="ri-equalizer-line"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu as="ul">
                            <li>
                              <Link className="dropdown-item" to="#">
                                <i className="ph ph-users-four align-middle"></i>{" "}
                                All Clients
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to="#">
                                <i className="ph ph-check-circle align-middle"></i>{" "}
                                All Status
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to="#">
                                <i className="ph ph-clock-afternoon align-middle"></i>{" "}
                                Delayed
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to="#">
                                <i className="ph ph-arrow-clockwise align-middle"></i>{" "}
                                Changing
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to="#">
                                <i className="ph ph-map-pin align-middle"></i>{" "}
                                On Site
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to="#">
                                <i className="ph ph-thumbs-up align-middle"></i>{" "}
                                Normal
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to="#">
                                <i className="ph ph-checks align-middle"></i>{" "}
                                Compeleted
                              </Link>
                            </li>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            ) : (
              <div style={{ height: "200%", width: `${navList}%` }}>
                {" "}
                <DataTable columns={columns2} data={data2} pagination />
              </div>
            )}
            {navList === 50 ? (
              <Col lg={4}>
                <Row>
                  <Col lg={12}>
                    <div
                      className="card-body"
                      onMouseOver={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    >
                      <div
                        id="gmaps-types"
                        className="gmaps"
                        style={{ position: "relative" }}
                      >
                        <Map
                          google={props.google}
                          zoom={13}
                          style={{ height: "118%", width: "160%" }}
                          initialCenter={{ lat: 52.5244734, lng: -1.9857876 }}
                        >
                          <Marker
                            position={{ lat: 52.5471571, lng: -1.9042587 }}
                          />
                        </Map>
                        <button
                          type="button"
                          className="btn btn-darken-danger btn-icon"
                          onClick={() => closeMap()}
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            ) : (
              ""
            )}
            {navWidth === 100 ? (
              <Col xl={4}>
                <Card style={{ height: "110%" }}>
                  <Card.Header>
                    <h3>Trip: 89089</h3>
                  </Card.Header>
                  <Card.Body>
                    <Card>
                      <Card.Body>
                        <Tab.Container defaultActiveKey="home1">
                          <Nav
                            as="ul"
                            variant="pills"
                            className="nav-pills-custom nav-success mb-3 "
                          >
                            <Nav.Item as="li">
                              <Nav.Link eventKey="home1">General</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                              <Nav.Link eventKey="profile1">History</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                              <Nav.Link eventKey="messages1">Payment</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                              <Nav.Link eventKey="settings1">Contract</Nav.Link>
                            </Nav.Item>
                          </Nav>
                          <Tab.Content className="text-muted">
                            <Tab.Pane eventKey="home1">
                              <Table className="table-borderless table-sm mb-0">
                                <tbody>
                                  <tr className="fw-bold">
                                    <td>Driver:</td>
                                    <td className="fw-medium">Andrew</td>
                                  </tr>
                                  <tr className="fw-bold">
                                    <td>Vehicle</td>
                                    <td className="fw-medium">415-778-3654</td>
                                  </tr>
                                  <tr className="fw-bold">
                                    <td>Vehicle Type</td>
                                    <td className="fw-medium">
                                      10-16 Seat Standard Minibus
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="fw-bold">PickUp</td>
                                    <td className="fw-medium">
                                      Paget Primary School, 110 Paget Rd
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="fw-bold">Destination</td>
                                    <td className="fw-medium">
                                      Birmingham B24 0JP
                                    </td>
                                  </tr>
                                  <tr className="fw-bold">
                                    <td>Arrival Date</td>
                                    <td className="fw-medium">
                                      2023-12-13 17:30:00
                                    </td>
                                  </tr>
                                  <tr className="fw-bold">
                                    <td>Customer Name</td>
                                    <td className="fw-medium">
                                      Nicole Wojtynia
                                    </td>
                                  </tr>
                                  <tr className="fw-bold">
                                    <td>Status</td>
                                    <td className="fw-medium">On road</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Tab.Pane>
                            <Tab.Pane eventKey="profile1">
                              <DataTable
                                columns={columns}
                                data={data}
                              // pagination
                              />
                            </Tab.Pane>
                            <Tab.Pane eventKey="messages1">
                              <DataTable
                                columns={columns1}
                                data={data1}
                              // pagination
                              />
                            </Tab.Pane>
                            <Tab.Pane eventKey="settings1">
                              <Card>
                                <Card.Header>
                                  <Link
                                    to="#"
                                    className="link-danger fw-medium float-end"
                                  >
                                    <i className="ri-download-line align-middle"></i>{" "}
                                    Download
                                  </Link>
                                  <h5 className="card-title text-dark mb-0">
                                    Balfour Beatty - HS2
                                  </h5>
                                  <h6 className="text-muted mt-1">
                                    balfourbeatty@hs2contract.org
                                  </h6>
                                  <h6 className="text-muted mt-1">
                                    0800 1123770
                                  </h6>
                                </Card.Header>
                                <Card.Body>
                                  <div className="table-responsive">
                                    <Table className="table-borderless table-sm mb-0">
                                      <tbody>
                                        <tr>
                                          <td className="fw-bold">
                                            Collection
                                          </td>
                                          <td className="fw-medium">
                                            Water Orton - Contract
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="fw-bold">
                                            Destination
                                          </td>
                                          <td className="fw-medium">
                                            Staffordshire DE13 7AR
                                          </td>
                                        </tr>
                                        <tr className="fw-bold">
                                          <td>Travel Time:</td>
                                          <td className="fw-medium">07:00</td>
                                        </tr>
                                        <tr className="fw-bold">
                                          <td>Price:</td>
                                          <td className="fw-medium">£525.00</td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </Card.Body>
                                <Card.Footer className="p-0">
                                  <p className="d-flex justify-content-end">
                                    2023-10-22
                                  </p>
                                </Card.Footer>
                              </Card>
                            </Tab.Pane>
                          </Tab.Content>
                        </Tab.Container>
                      </Card.Body>
                    </Card>
                  </Card.Body>
                </Card>
              </Col>
            ) : (
              ""
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw",
  LoadingContainer: LoadingContainer,
  v: "3",
})(Maptracking);
