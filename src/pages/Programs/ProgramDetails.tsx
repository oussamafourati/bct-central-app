import React, { useState } from "react";
import { Container, Row, Card, Col, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import { Link, useLocation } from "react-router-dom";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import Calendar from "react-calendar";
const mapStyles = {
  width: "100%",
  height: "100%",
};
const LoadingContainer = () => <div>Loading...</div>;
const ProgramDetails = (props: any) => {
  document.title = "Program Details | Bouden Coach Travel";
  const [modal_Pickup, setmodal_Pickup] = useState<boolean>(false);
  function tog_Pickup() {
    setmodal_Pickup(!modal_Pickup);
  }
  const [modal_Destination, setmodal_Destination] = useState<boolean>(false);
  function tog_Destination() {
    setmodal_Destination(!modal_Destination);
  }
  const detailsLocation = useLocation();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={9}>
              <Card>
                <Card.Header>
                  <div className="d-flex align-items-center p-2">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-1">
                        {detailsLocation.state.programName}
                      </h5>
                    </div>
                    <div className="hstack gap-2 justify-content-end">
                      <Link
                        to="#"
                        className="badge badge-soft-dark edit-item-btn"
                      >
                        <i className="mdi mdi-voicemail" title="Clone"></i>
                      </Link>
                      <Link
                        to="#"
                        className="badge badge-soft-dark edit-item-btn"
                      >
                        <i className="mdi mdi-voicemail" title="Clone"></i>
                      </Link>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div
                    id="gmaps-markers"
                    className="gmaps"
                    style={{ position: "relative" }}
                  >
                    <Map
                      google={props.google}
                      zoom={8}
                      style={mapStyles}
                      initialCenter={{ lat: 34.134117, lng: -118.321495 }}
                    >
                      <Marker position={{ lat: 48.0, lng: -122.0 }} />
                    </Map>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3}>
              <Card>
                <Card.Body>
                  {/* <div>
                                        <table>
                                            <tr>
                                                <td>From</td>
                                                <td>{detailsLocation.state.origin_point.placeName}</td>
                                            </tr>
                                            <tr>
                                                <td>To</td>
                                                <td>{detailsLocation.state.destination_point.placeName}</td>
                                            </tr>
                                            <tr>
                                                <td>At</td>
                                                <td>{detailsLocation.state.pickUp_date} {detailsLocation.state.pickUp_Time}</td>
                                            </tr>
                                            <tr>
                                                <td>Exception</td>
                                                <td>{detailsLocation.state.exceptDays}</td>
                                            </tr>
                                            <tr>
                                                <td>Passengers Number</td>
                                                <td>{detailsLocation.state.recommanded_capacity}</td>
                                            </tr>
                                            <tr>
                                                <td>Extra</td>
                                                <td>{detailsLocation.state.extra}</td>
                                            </tr>
                                        </table>
                                    </div> */}
                </Card.Body>
              </Card>
            </Col>
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
})(ProgramDetails);
