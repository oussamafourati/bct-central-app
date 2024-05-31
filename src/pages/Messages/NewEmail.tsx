import React, { useState } from "react";
import { Container, Row, Card, Col, Tab, Nav } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { useGetAllEmailQuery } from "features/Emails/emailSlice";
import { Link } from "react-router-dom";

import { useGetAllAttachmentsQuery } from "features/Attachments/attachmentSlice";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "features/Account/authSlice";
import { RootState } from "app/store";

import SingleEmail from "Common/SingleEmail";
import BulkEmail from "Common/BulkEmail";

interface Stop {
  placeName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  raduis: number;
}

const NewEmail = () => {
  document.title = "New Email | Bouden Coach Travel";
  const { data: AllAttachments = [] } = useGetAllAttachmentsQuery();
  const user = useSelector((state: RootState) => selectCurrentUser(state));
  const { data: AllEmails = [] } = useGetAllEmailQuery();
  const [show, setShow] = useState<boolean>(false);
  const [data, setData] = useState("");
  // Function to handle clicking on an email link
  const handleEmailClick = (emailBody: any) => {
    setData(emailBody); // Set the email body to the state
  };
  const [checkedCheckbox, setCheckedCheckbox] = useState(null);
  const handleCheckboxChange = (attachmentId: any) => {
    setCheckedCheckbox(attachmentId);
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
                        <SingleEmail />
                      </Tab.Pane>
                      <Tab.Pane eventKey="profile1">
                        <BulkEmail />
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
export default NewEmail;
