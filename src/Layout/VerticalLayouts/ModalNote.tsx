import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Offcanvas,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import TableContainer from "Common/TableContainer";
import { shipments } from "Common/data";
import offerbanner from "../../../../assets/images/ecommerce/offer-banner.jpg";
import { transaction } from "Common/data";
import SimpleBar from "simplebar-react";
import { productDelivery } from "Common/data";

const Status = ({ status }: any) => {
  switch (status) {
    case "Successful":
      return <span className="badge badge-soft-success"> {status}</span>;
    case "Denied":
      return <span className="badge badge-soft-danger"> {status}</span>;
    case "Pending":
      return <span className="badge badge-soft-warning"> {status}</span>;
    default:
      return <span className="badge badge-soft-success"> Successful </span>;
  }
};

const ModalNote = () => {
  const [paymentDetails, setPaymentDetails] = useState<any>({});

  return (
    <React.Fragment>
      <Row>
        <div
          id="alert-error-msg"
          className="d-none alert alert-danger py-2"
        ></div>
        <Form className="tablelist-form">
          <input type="hidden" id="id-field" />
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <Form.Label htmlFor="customerName-field">Title</Form.Label>
                <Form.Control
                  type="text"
                  id="customerName-field"
                  placeholder="Enter note title"
                  required
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className="mb-3">
                <Form.Label htmlFor="supplierName-field">Body</Form.Label>

                <div>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea5"
                    rows={3}
                  ></textarea>
                </div>
              </div>
            </Col>
            <Col lg={12}>
              <div className="hstack gap-2 justify-content-end">
                <Button variant="primary" id="add-btn">
                  Add Note
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Row>
    </React.Fragment>
  );
};

export default ModalNote;
