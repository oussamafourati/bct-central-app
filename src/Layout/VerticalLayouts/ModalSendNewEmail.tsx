import React, { useState, useEffect, useRef } from "react";
import { Form, Row, Card, Col, Button, Tab, Nav } from "react-bootstrap";
import { useGetAllEmailQuery } from "features/Emails/emailSlice";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { GoogleApiWrapper, Map } from "google-maps-react";
import { useGetAllVehiclesQuery } from "features/Vehicles/vehicleSlice";

const LoadingContainer = () => <div>Loading...</div>;

const ModalSendNewEmail = (props: any) => {
  document.title = "New Email | Bouden Coach Travel";
  const { data: AllEmails = [] } = useGetAllEmailQuery();
  const [show, setShow] = useState<boolean>(false);
  const [mapShow, setMapShow] = useState<boolean>(false);
  const { data: allVehicles = [] } = useGetAllVehiclesQuery();
  const editorRef = useRef<any>();
  const [editor, setEditor] = useState(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditor(true);
  }, []);

  const [data, setData] = useState<string>("");

  // Function to handle clicking on an email link
  const handleEmailClick = (emailBody: any) => {
    setData(emailBody); // Set the email body to the state
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={4}>
          <Card className="h-100">
            <Card.Body>
              <Tab.Container defaultActiveKey="home1">
                <Nav
                  as="ul"
                  variant="pills"
                  className="nav-pills-custom nav-success mb-3 "
                >
                  <Nav.Item as="li">
                    <Nav.Link eventKey="home1">Canned Message</Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link eventKey="profile1">Attachments</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content className="text-muted">
                  <Tab.Pane eventKey="home1">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        {show === false ? (
                          <i className="ri-arrow-right-s-line text-dark fs-16"></i>
                        ) : (
                          <i className="ri-arrow-down-s-line text-dark fs-16"></i>
                        )}
                      </div>
                      <Link to="#" onClick={() => setShow(!show)}>
                        <div className="flex-grow-1 ms-2 text-dark">
                          Uncatagorized
                        </div>
                      </Link>
                    </div>
                    {show && (
                      <div>
                        <ul>
                          {AllEmails.map((email) => (
                            <Link
                              to="#"
                              className="text-dark"
                              onClick={() => handleEmailClick(email.body)}
                            >
                              <li key={email?._id!}>{email.name}</li>
                            </Link>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="profile1">
                    <ul>
                      {allVehicles.map((vehicle: any) => (
                        <li key={vehicle?._id!}>{vehicle.vehicle_images}</li>
                      ))}
                    </ul>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8}>
          <Card className="h-100">
            <Card.Body>
              <Tab.Container defaultActiveKey="home1">
                <Nav
                  as="ul"
                  variant="pills"
                  className="nav-pills-custom nav-success mb-3 "
                >
                  <Nav.Item as="li">
                    <Nav.Link eventKey="home1">Single Email</Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link eventKey="profile1">Bulk Email</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content className="text-muted">
                  <Tab.Pane eventKey="home1">
                    <Row className="mb-2">
                      <Col lg={1}>
                        <Form.Label>Email </Form.Label>
                      </Col>
                      <Col lg={5}>
                        <Form.Control type="email" />
                      </Col>
                      <Col lg={2}>
                        <Form.Label>Email BBC</Form.Label>
                      </Col>
                      <Col lg={4}>
                        <Form.Control />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col lg={2}>
                        <Form.Label>Subject</Form.Label>
                      </Col>
                      <Col lg={10}>
                        <Form.Control />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col className="d-flex justify-content-end">
                        <Button
                          type="submit"
                          className="btn-soft-danger"
                          data-bs-dismiss="modal"
                          onClick={() => setData("")}
                        >
                          <i className="ri-delete-back-line align-middle me-1"></i>{" "}
                          Clear
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <div className="w-100">
                        {editor ? (
                          <CKEditor
                            editor={ClassicEditor}
                            data={data}
                            onReady={(editor: any) => {
                              // You can store the "editor" and use when it is needed.
                              console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event: any, editor: any) => {
                              const data = editor.getData();
                              setData(data);
                            }}
                          />
                        ) : (
                          <p>ckeditor5</p>
                        )}
                      </div>
                    </Row>
                    <Row>
                      <div className="hstack gap-2 justify-content-center mb-2">
                        <Button
                          type="submit"
                          className="btn-soft-success"
                          data-bs-dismiss="modal"
                        >
                          <i className="ri-safe-2-line me-1"></i> Send
                        </Button>
                        <Button
                          type="submit"
                          className="btn-soft-info"
                          data-bs-dismiss="modal"
                        >
                          <i className="ri-user-add-line me-1"></i> Save
                        </Button>
                      </div>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="profile1">
                    <Row className="mb-2">
                      <Col>
                        <select className="form-select text-muted">
                          <option>Send to</option>
                        </select>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>
                        <select className="form-select text-muted">
                          <option>All Journey Type</option>
                        </select>
                      </Col>
                      <Col>
                        <select className="form-select text-muted">
                          <option>All Job Status</option>
                        </select>
                      </Col>
                      <Col>
                        <Flatpickr
                          className="form-control flatpickr-input"
                          placeholder="From Date"
                          options={{
                            dateFormat: "d M, Y",
                          }}
                        />
                      </Col>
                      <Col>
                        <Flatpickr
                          className="form-control flatpickr-input"
                          placeholder="Until Date"
                          options={{
                            dateFormat: "d M, Y",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col lg={6}>
                        <Form.Control placeholder="Lookup address" />
                      </Col>
                      {mapShow && (
                        <>
                          <Col lg={2} className="mt-2">
                            <Form.Label>Raduis(mi.)</Form.Label>
                          </Col>
                          <Col lg={2}>
                            <Form.Control type="number" defaultValue={1} />
                          </Col>
                        </>
                      )}
                      <Col lg={2}>
                        <div className="hstack gap-2 justify-content-start mb-2">
                          <Button
                            type="submit"
                            className="btn-soft-success"
                            data-bs-dismiss="modal"
                            onClick={() => setMapShow(!mapShow)}
                          >
                            <i className="ri-map-pin-line me-1"></i>
                          </Button>
                          <Button
                            type="submit"
                            className="btn-soft-danger"
                            data-bs-dismiss="modal"
                          >
                            <i className="ri-close-line me-1"></i>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    {mapShow && (
                      <Row className="mb-4">
                        <div
                          id="gmaps-types"
                          className="gmaps"
                          style={{ position: "relative", width: "99%" }}
                        >
                          <Map
                            google={props.google}
                            zoom={13}
                            initialCenter={{
                              lat: 52.5244734,
                              lng: -1.9857876,
                            }}
                          ></Map>
                        </div>
                      </Row>
                    )}
                    <Row className="mb-2">
                      <Col lg={1}>
                        <Form.Label>Email </Form.Label>
                      </Col>
                      <Col lg={5}>
                        <Form.Control />
                      </Col>
                      <Col lg={2}>
                        <Form.Label>Email BBC</Form.Label>
                      </Col>
                      <Col lg={4}>
                        <Form.Control />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col lg={2}>
                        <Form.Label>Subject</Form.Label>
                      </Col>
                      <Col lg={10}>
                        <Form.Control />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col className="d-flex justify-content-end">
                        <Button
                          type="submit"
                          className="btn-soft-danger"
                          data-bs-dismiss="modal"
                          onClick={() => setData("")}
                        >
                          <i className="ri-delete-back-line align-middle me-1"></i>{" "}
                          Clear
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <div className="w-100">
                        {editor ? (
                          <CKEditor
                            editor={ClassicEditor}
                            data={data}
                            onReady={(editor: any) => {
                              // You can store the "editor" and use when it is needed.
                              console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event: any, editor: any) => {
                              const data = editor.getData();
                              setData(data);
                            }}
                          />
                        ) : (
                          <p>ckeditor5</p>
                        )}
                      </div>
                    </Row>
                    <Row>
                      <div className="hstack gap-2 justify-content-center mb-2">
                        <Button
                          type="submit"
                          className="btn-soft-success"
                          data-bs-dismiss="modal"
                        >
                          <i className="ri-safe-2-line me-1"></i> Send
                        </Button>
                        <Button
                          type="submit"
                          className="btn-soft-info"
                          data-bs-dismiss="modal"
                        >
                          <i className="ri-user-add-line me-1"></i> Save
                        </Button>
                      </div>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw",
  LoadingContainer: LoadingContainer,
  v: "3",
})(ModalSendNewEmail);
