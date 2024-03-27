import BreadCrumb from "Common/BreadCrumb";
import React from "react";
import { Container, Row } from "react-bootstrap";

import Template from "./Template";

const EmailTemplates = () => {
  document.title = "Email Templates | Bouden Coach Travel";

  const emails = [
    {
      id: "1",
      templateName: "Subscription Request",
      templateIcon: "ri-mail-add-line",
      for: "Sub-contractor",
      body: "Thank you for your recent enquiry,We hope to have a quotation ready for you as soon as possible. Please ensure you check all the information you have provided such as times, dates, pick-up and drop-off details are correct. Any changes to these details are to be brought to our attention as soon as possible, in order to be amended as this may affect the pending quotation. Hope to hear from you soon,",
    },
    {
      id: "2",
      templateName: "Resquest Accpetation",
      templateIcon: "ri-mail-check-line",
      for: "Sub-contractor",
      body: "We are pleased to accept your quotation. Thank you for your prompt response and detailed proposal. Please find attached a copy of the signed quotation for your records. We look forward to working with you on this project and to a successful partnership."
    },
    {
      id: "3",
      templateName: "Resquest rejection",
      templateIcon: "ri-mail-close-line",
      for: "Sub-contractor ",
      body: "Thank you for your quotation. After carefully reviewing your proposal, we regret to inform you that we will not be able to accept it at this time. We appreciate the effort you have put into preparing the quotation and the time you have taken to understand our needs. We will keep your company in mind for future projects. Thank you for considering us and we wish you the best of luck with your future endeavors."
    },
    {
      id: "4",
      templateName: "Quote Request Resume",
      templateIcon: "ri-mail-open-line",
      for: "Visitor",
    },
    {
      id: "5",
      templateName: "Quote Response",
      templateIcon: "ri-mail-send-line",
      for: "Visitor",
    },
    {
      id: "6",
      templateName: "Booking Confirmation ",
      templateIcon: "ri-mail-star-line",
      for: "Visitor",
    },
    {
      id: "7",
      templateName: "Paiement reminder",
      templateIcon: "ri-mail-unread-line",
      for: "Visitor",
    },
    {
      id: "8",
      templateName: "Trip cancellation",
      templateIcon: "ri-mail-forbid-line",
      for: "Visitor",
    },
    {
      id: "9",
      templateName: "Booking Rejection",
      templateIcon: "ri-mail-download-line",
      for: "Visitor",
    },
    {
      id: "10",
      templateName: "Paiement Confirmation",
      templateIcon: "ri-mail-settings-line",
      for: "Visitor",
    },
    {
      id: "11",
      templateName: "Feedback Email ",
      templateIcon: "ri-mail-line",
      for: "Visitor",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Email Templates" pageTitle="Dashboard" />
          <Row>
            <Template emails={emails} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EmailTemplates;
