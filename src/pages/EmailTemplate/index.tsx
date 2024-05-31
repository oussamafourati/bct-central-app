import BreadCrumb from "Common/BreadCrumb";
import React from "react";
import { Container, Row } from "react-bootstrap";

import Template from "./Template";
import { useGetAllEmailQuery } from "features/Emails/emailSlice";

const EmailTemplates = () => {
  document.title = "Email Templates | Bouden Coach Travel";
  const { data: AllEmails = [] } = useGetAllEmailQuery();
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Email Templates" pageTitle="Dashboard" />
          <Row>
            <Template emails={AllEmails} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EmailTemplates;
