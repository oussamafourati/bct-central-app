import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Row,
  Card,
  Col,
  Button,
  Tab,
  Nav,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import {
  useGetAllEmailQuery,
  useSendNewEmailMutation,
} from "features/Emails/emailSlice";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { GoogleApiWrapper, Map, Marker, Circle } from "google-maps-react";
import Swal from "sweetalert2";
import {
  useGetAllAttachmentsQuery,
  useGetAttachmentByIDQuery,
} from "features/Attachments/attachmentSlice";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "features/Account/authSlice";
import { RootState } from "app/store";
import { useAddNewEmailSentMutation } from "features/emailSent/emailSentSlice";
import { useGetAllJourneyQuery } from "features/Journeys/journeySlice";

import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useGetAllAffiliatesQuery } from "features/Affiliate/affiliateSlice";
import { Visitor, useGetAllVisitorsQuery } from "features/Visitor/visitorSlice";

const LoadingContainer = () => <div>Loading...</div>;

interface Stop {
  placeName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  raduis: number;
}

const NewEmail = (props: any) => {
  document.title = "New Email | Bouden Coach Travel";
  const { data: AllAttachments = [] } = useGetAllAttachmentsQuery();
  const { data: AllJourneys = [] } = useGetAllJourneyQuery();
  const { data: AllAffiliates = [] } = useGetAllAffiliatesQuery();
  const { data: AllVisitors = [] } = useGetAllVisitorsQuery();
  const acceptedAffiliates = AllAffiliates.filter(
    (affiliate: any) => affiliate.statusAffiliate === "Accepted"
  );

  const [selectedSendTo, setSelectedSendTo] = useState<string>("");
  // This function is triggered when the select Send To
  const handleSelectSendTo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedSendTo(value);
  };

  const user = useSelector((state: RootState) => selectCurrentUser(state));
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

  const { data: AllEmails = [] } = useGetAllEmailQuery();
  const [show, setShow] = useState<boolean>(false);
  const [mapShow, setMapShow] = useState<boolean>(false);
  const [mapShowFromButton, setMapShowFromButton] = useState<boolean>(false);
  const [showShortCodes, setShowShortCodes] = useState<boolean>(false);

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

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = event.currentTarget.selectedOptions;

    const newSelectedOptions: any[] = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      newSelectedOptions.push(selectedOptions[i].value);
    }

    setSelectedValues(newSelectedOptions);
    setData((prevData) => {
      const newData = `${prevData}<p>${newSelectedOptions}</p>`;
      return newData;
    });
  };
  const [data, setData] = useState("");
  const [email, setEmail] = useState<string>("");
  const [subjectNewEmail, setSubject] = useState<string>("");
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };
  // Function to handle clicking on an email link
  const handleEmailClick = (emailBody: any) => {
    setData(emailBody); // Set the email body to the state
  };

  const [checkedCheckbox, setCheckedCheckbox] = useState(null);

  const handleCheckboxChange = (attachmentId: any) => {
    setCheckedCheckbox(attachmentId);
  };
  const navigate = useNavigate();
  const { data: OneAttachment } = useGetAttachmentByIDQuery(checkedCheckbox!);

  /************************************ Send Email **********************************/
  const [sendNewEmailMutation] = useSendNewEmailMutation();
  const initialSendNewEmailData = {
    newEmail: "",
    subject: "",
    body: "",
    file: "",
    sender: "",
  };

  const [sendNewEmail, setSendNewEmail] = useState(initialSendNewEmailData);

  const { newEmail, subject, body, file, sender } = sendNewEmail;
  /**********************************************************************************/
  /************************************ Save Email Sent**********************************/
  const [saveEmailSentMutation] = useAddNewEmailSentMutation();
  const currentDate = new Date();
  const initialSaveEmailSentData = {
    date: "",
    subjectEmail: "",
    from: "",
    to: "",
  };

  const [saveSentEmail, setSaveSentEmail] = useState(initialSaveEmailSentData);

  const { date, subjectEmail, from, to } = saveSentEmail;
  /***************************************************************************************/
  const onSubmitSendNewEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedSendTo === "AllCustomers") {
        const sendEmailsWithDelay = (index: number) => {
          if (index >= AllVisitors.length) return;

          const element = AllVisitors[index];
          sendNewEmail["body"] = data;
          sendNewEmail["newEmail"] = element.email;
          sendNewEmail["subject"] = subjectNewEmail;
          sendNewEmail["file"] = OneAttachment?.attachment!;
          sendNewEmail["sender"] = user?.email;

          sendNewEmailMutation(sendNewEmail).then(() => {
            saveEmailSentMutation({
              date: currentDate.toDateString(),
              subjectEmail: subjectNewEmail,
              from: user?.email,
              to: element.email,
            }).then(() => {
              // Schedule the next email to be sent after a delay
              setTimeout(() => {
                sendEmailsWithDelay(index + 1);
              }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
            });
          });
        };

        // Start sending emails with a delay
        sendEmailsWithDelay(0);
        notifySuccess();
        navigate("/emails-sent");
      }

      if (selectedSendTo === "AllAffiliates") {
        const sendEmailsWithDelay = (index: number) => {
          if (index >= acceptedAffiliates.length) return;

          const element = acceptedAffiliates[index];
          sendNewEmail["body"] = data;
          sendNewEmail["newEmail"] = element.email;
          sendNewEmail["subject"] = subjectNewEmail;
          sendNewEmail["file"] = OneAttachment?.attachment!;
          sendNewEmail["sender"] = user?.email;

          sendNewEmailMutation(sendNewEmail).then(() => {
            saveEmailSentMutation({
              date: currentDate.toDateString(),
              subjectEmail: subjectNewEmail,
              from: user?.email,
              to: element.email,
            }).then(() => {
              // Schedule the next email to be sent after a delay
              setTimeout(() => {
                sendEmailsWithDelay(index + 1);
              }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
            });
          });
        };

        // Start sending emails with a delay
        sendEmailsWithDelay(0);
        notifySuccess();
        navigate("/emails-sent");
      }

      if (selectedSendTo === "") {
        sendNewEmail["body"] = data;
        sendNewEmail["newEmail"] = email;
        sendNewEmail["subject"] = subjectNewEmail;
        sendNewEmail["file"] = OneAttachment?.attachment!;
        sendNewEmail["sender"] = user?.email;
        sendNewEmailMutation(sendNewEmail)
          .then(() => notifySuccess())
          .then(() =>
            saveEmailSentMutation({
              date: currentDate.toDateString(),
              subjectEmail: subjectNewEmail,
              from: user?.email,
              to: email,
            })
          )
          .then(() => navigate("/emails-sent"));
      }
    } catch (error) {
      notifyError(error);
    }
  };

  const [raduis, setRaduis] = useState<number>(1);
  const handleRaduis = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRaduis(Number(e.target.value));
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw",
    libraries: ["places"],
  });

  const [bulkEmailLocation, setBulkEmailLocation] = useState<Stop>();
  const [searchBulkEmailLocation, setSearchBulkEmailLocation] = useState<any>();
  const [markerPosition, setMarkerPosition] = useState({
    lat: 52.4862,
    lng: -1.8904,
  });
  const [markerAddress, setMarkerAddress] = useState<string>("Birmingham, UK");

  const bulkEmailLocationRef = useRef<any>(null);

  function onLoadBulkEmailLocation(autocomplete: any) {
    setSearchBulkEmailLocation(autocomplete);
  }

  function onPlaceChangedBulkEmailLocation() {
    if (searchBulkEmailLocation != null) {
      const place = (
        searchBulkEmailLocation as unknown as google.maps.places.Autocomplete
      ).getPlace();

      const location = place.geometry?.location;
      if (location) {
        const coordinate = { lat: location.lat(), lng: location.lng() };
        const formattedAddress = place.formatted_address;
        const wayPoint = {
          placeName: formattedAddress!,
          coordinates: {
            lat: coordinate.lat,
            lng: coordinate.lng,
          },
          raduis: raduis,
        };
        setBulkEmailLocation(wayPoint);
        setMapShow(true); // Show the map when a place is selected
      } else {
        console.error("Location not found in place object");
      }
    } else {
      alert("Please enter text");
    }
  }

  const handleMarkerDragEnd = async (coord: any) => {
    const lat = coord.latLng.lat();
    const lng = coord.latLng.lng();
    setMarkerPosition({ lat, lng });
    const geocoder = new window.google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat, lng } });
    if (response.results[0]) {
      setMarkerAddress(response.results[0].formatted_address);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="New Email" pageTitle="Messages" />
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
                          {AllAttachments.map((attachement) => (
                            <Col lg={9} className="d-flex align-items-center">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                id={`inlineCheckbox${attachement._id}`}
                                onChange={() =>
                                  handleCheckboxChange(attachement._id)
                                }
                                checked={checkedCheckbox === attachement._id}
                              />
                              <label
                                className="fw-medium mb-0 me-2"
                                htmlFor={`inlineCheckbox${attachement._id}`}
                              >
                                <span>{attachement?.name}</span>
                              </label>
                            </Col>
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
                        <Form onSubmit={onSubmitSendNewEmail}>
                          <Row className="mb-2">
                            <Col lg={1}>
                              <Form.Label htmlFor="email">Email </Form.Label>
                            </Col>
                            <Col lg={5}>
                              <Form.Control
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleEmail}
                              />
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
                              <Form.Label htmlFor="subjectNewEmail">
                                Subject
                              </Form.Label>
                            </Col>
                            <Col lg={10}>
                              <Form.Control
                                type="text"
                                id="subjectNewEmail"
                                name="subjectNewEmail"
                                value={subjectNewEmail}
                                onChange={handleSubject}
                              />
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
                                    console.log(
                                      "Editor is ready to use!",
                                      editor
                                    );
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
                        </Form>
                      </Tab.Pane>
                      <Tab.Pane eventKey="profile1">
                        <Form onSubmit={onSubmitSendNewEmail}>
                          <Row className="mb-2">
                            <Col>
                              <select
                                className="form-select text-muted"
                                onChange={handleSelectSendTo}
                              >
                                <option value="">Send to</option>
                                <option value="PreferredAffiliates">
                                  Preferred Affiliates
                                </option>
                                <option value="Non-preferredAffiliates">
                                  Non-preferred Affiliates
                                </option>
                                <option value="AllAffiliates">
                                  All Affiliates
                                </option>
                                <option value="AllCustomers">
                                  All Customers
                                </option>
                              </select>
                            </Col>
                          </Row>
                          <Row className="mb-2">
                            <Col>
                              <select className="form-select text-muted">
                                <option value="">All Journey Type</option>
                                {AllJourneys.map((journey) => (
                                  <option
                                    key={journey._id}
                                    value={journey.type}
                                  >
                                    {journey.type}
                                  </option>
                                ))}
                              </select>
                            </Col>
                            <Col>
                              <select className="form-select text-muted">
                                <option value="">All Job Status</option>
                                <option value="NewQuotes">New Quotes</option>
                                <option value="PendingQuotes">
                                  Pending Quotes
                                </option>
                                <option value="BookingQuotes">
                                  Booking Quotes
                                </option>
                                <option value="CompleteBooking">
                                  Complete Booking
                                </option>
                                <option value="Deleted">Deleted</option>
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
                            {!mapShowFromButton && (
                              <Col lg={6}>
                                <Autocomplete
                                  onLoad={(autocomplete) =>
                                    onLoadBulkEmailLocation(autocomplete)
                                  }
                                  onPlaceChanged={() =>
                                    onPlaceChangedBulkEmailLocation()
                                  }
                                >
                                  <Form.Control
                                    type="text"
                                    className="w-100"
                                    placeholder="Lookup address"
                                    ref={bulkEmailLocationRef}
                                    id="bulkEmailLocation"
                                  />
                                </Autocomplete>
                              </Col>
                            )}
                            {!mapShow && mapShowFromButton && (
                              <Col lg={6}>
                                <Form.Control
                                  type="text"
                                  className="w-100"
                                  placeholder="London, UK"
                                  value={markerAddress}
                                  id="locationFromMapMarker"
                                  readOnly
                                />
                              </Col>
                            )}
                            {mapShow && (
                              <>
                                <Col lg={2} className="mt-2">
                                  <Form.Label htmlFor="raduis">
                                    Raduis(mi.)
                                  </Form.Label>
                                </Col>
                                <Col lg={2}>
                                  <Form.Control
                                    type="number"
                                    value={raduis}
                                    onChange={handleRaduis}
                                    id="raduis"
                                    name="raduis"
                                  />
                                </Col>
                              </>
                            )}
                            {mapShowFromButton && (
                              <>
                                <Col lg={2} className="mt-2">
                                  <Form.Label htmlFor="raduis">
                                    Raduis(mi.)
                                  </Form.Label>
                                </Col>
                                <Col lg={2}>
                                  <Form.Control
                                    type="number"
                                    value={raduis}
                                    onChange={handleRaduis}
                                    id="raduis"
                                    name="raduis"
                                  />
                                </Col>
                              </>
                            )}
                            <Col lg={2}>
                              <div className="hstack gap-2 justify-content-start mb-2">
                                <Button
                                  type="submit"
                                  className="btn-soft-success"
                                  data-bs-dismiss="modal"
                                  onClick={() => {
                                    setMapShow(false);
                                    setMapShowFromButton(!mapShowFromButton);
                                  }}
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
                          {mapShow && bulkEmailLocation && (
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
                                    lat: bulkEmailLocation.coordinates.lat,
                                    lng: bulkEmailLocation.coordinates.lng,
                                  }}
                                  center={{
                                    lat: bulkEmailLocation.coordinates.lat,
                                    lng: bulkEmailLocation.coordinates.lng,
                                  }}
                                >
                                  <Marker
                                    position={{
                                      lat: bulkEmailLocation.coordinates.lat,
                                      lng: bulkEmailLocation.coordinates.lng,
                                    }}
                                  />
                                  <Circle
                                    center={{
                                      lat: bulkEmailLocation.coordinates.lat,
                                      lng: bulkEmailLocation.coordinates.lng,
                                    }}
                                    radius={raduis * 1609.34} // Convert miles to meters
                                    options={{
                                      strokeColor: "#ff0000",
                                      strokeOpacity: 0.8,
                                      strokeWeight: 2,
                                      fillColor: "#ff0000",
                                      fillOpacity: 0.35,
                                    }}
                                  />
                                </Map>
                              </div>
                            </Row>
                          )}
                          {mapShowFromButton && (
                            <Row className="mb-4">
                              <div
                                id="gmaps-types"
                                className="gmaps"
                                style={{ position: "relative", width: "99%" }}
                              >
                                <Map
                                  google={props.google}
                                  zoom={13}
                                  initialCenter={markerPosition}
                                  center={markerPosition}
                                  onClick={(t: any, map: any, coord: any) =>
                                    setMarkerPosition({
                                      lat: coord.latLng.lat(),
                                      lng: coord.latLng.lng(),
                                    })
                                  }
                                >
                                  <Marker
                                    position={markerPosition}
                                    draggable={true}
                                    onDragend={(t: any, map: any, coord: any) =>
                                      handleMarkerDragEnd(coord)
                                    }
                                  />
                                  <Circle
                                    center={markerPosition}
                                    radius={raduis * 1609.34} // Convert miles to meters
                                    options={{
                                      strokeColor: "#ff0000",
                                      strokeOpacity: 0.8,
                                      strokeWeight: 2,
                                      fillColor: "#ff0000",
                                      fillOpacity: 0.35,
                                    }}
                                  />
                                </Map>
                              </div>
                            </Row>
                          )}
                          <Row className="mb-2">
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
                              <Form.Control
                                type="text"
                                id="subjectNewEmail"
                                name="subjectNewEmail"
                                value={subjectNewEmail}
                                onChange={handleSubject}
                              />
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
                          <Row className="m-2">
                            <Col
                              lg={3}
                              className="d-flex justify-content-start"
                            >
                              <Button
                                type="submit"
                                className="btn-soft-info"
                                data-bs-dismiss="modal"
                                onClick={() =>
                                  setShowShortCodes(!showShortCodes)
                                }
                              >
                                <i className="ri-add-fill align-middle me-1"></i>{" "}
                                Insert Short Codes
                              </Button>
                            </Col>
                          </Row>
                          {showShortCodes && (
                            <select
                              multiple
                              size={8}
                              onChange={handleSelectChange}
                              className="select"
                              style={{
                                marginLeft: "-180px",
                                marginTop: "-50px",
                              }}
                            >
                              <option value="[name]">Customer Name</option>
                              <option value="[drivername]">Driver Name</option>
                              <option value="[quote]">Quote</option>
                              <option value="[paylink]">Payment Link</option>
                              <option value="[cancellink]">Cancel Link</option>
                              <option value="[acceptlink]">
                                Accept Job Link
                              </option>
                              <option value="[driver_pay]">Driver Pay</option>
                              <option value="[driver_details]">
                                Driver Details
                              </option>
                              <option value="[quote_num]">Quote ID</option>
                              <option value="[outward_travel_date]">
                                Outward Travel Date
                              </option>
                              <option value="[balance_due]">Balance Due</option>
                              <option value="[balance_due_date]">
                                Balance Due Date
                              </option>
                              <option value="[Website_name]">
                                Internal Company Name
                              </option>
                              <option value="[Website_phone]">
                                Internal Company Phone
                              </option>
                              <option value="[Website_email]">
                                Internal Company Email
                              </option>
                              <option value="[Website_url]">
                                Internal Company Website
                              </option>
                            </select>
                          )}
                          <Row className="mb-4">
                            <div className="w-100">
                              {editor ? (
                                <CKEditor
                                  editor={ClassicEditor}
                                  data={data}
                                  onReady={(editor: any) => {
                                    console.log(
                                      "Editor is ready to use!",
                                      editor
                                    );
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
                        </Form>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
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
})(NewEmail);
