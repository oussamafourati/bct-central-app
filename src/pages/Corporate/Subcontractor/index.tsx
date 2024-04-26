import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  useDeleteAffiliateMutation,
  useGetAllAffiliatesQuery,
  useRefuseAffiliateMutation,
  useUpdateAffiliateStatusMutation,
} from "features/Affiliate/affiliateSlice";
import Swal from "sweetalert2";

const Subcontractors = () => {
  document.title = "Affiliates | Bouden Coach Travel";
  const { data: AllAffiliates = [] } = useGetAllAffiliatesQuery();

  const [deleteVisitor] = useDeleteAffiliateMutation();
  const date = new Date();
  let randomstring = Math.random().toString(36).slice(0, 8);
  let affiliateLocation = useLocation();
  const [modal_AffiliateStatus, setModalAffiliateStatus] =
    useState<boolean>(false);
  const tog_ModalAffiliateStatus = () => {
    setModalAffiliateStatus(!modal_AffiliateStatus);
  };
  const [changeStatusMutation] = useUpdateAffiliateStatusMutation();
  const handleUpdate = async () => {
    changeStatusMutation({
      id: affiliateLocation?.state?._id!,
      login: affiliateLocation?.state?.name!,
      password: randomstring,
      service_date: date.toDateString(),
    }).then(() => setModalAffiliateStatus(!modal_AffiliateStatus));
  };

  const [refuseAffiliateMutation] = useRefuseAffiliateMutation();
  const handleRefuseAffiliate = async () => {
    refuseAffiliateMutation({
      id_aff: affiliateLocation?.state?._id!,
    }).then(() => setModalAffiliateStatus(!modal_AffiliateStatus));
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDelete = async (_id: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to go back?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          deleteVisitor(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Affiliate is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Affiliate is safe :)",
            "info"
          );
        }
      });
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Phone</span>,
      selector: (row: any) => row.phone,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Address</span>,
      selector: (row: any) => row.address,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Fleet Number</span>,
      selector: (row: any) => row.fleetNumber,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Region</span>,
      selector: (row: any) => row.region,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (cell: any) => {
        switch (cell.statusAffiliate) {
          case "Pending":
            return (
              <span className="badge bg-warning"> {cell.statusAffiliate} </span>
            );
          case "Accepted":
            return (
              <span className="badge bg-info"> {cell.statusAffiliate} </span>
            );
          default:
            return (
              <span className="badge bg-dark"> {cell.statusAffiliate} </span>
            );
        }
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Enquiry Date</span>,
      selector: (row: any) => row.enquiryDate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => (
        <ul className="hstack gap-2 list-unstyled mb-0">
          <li>
            <Link to="#" className="badge badge-soft-info edit-item-btn">
              <i className="ri-eye-line"></i>
            </Link>
          </li>
          {row.statusAffiliate === "Accepted" ? (
            <span className="badge badge-soft-dark edit-item-btn">
              <i className="ri-checkbox-circle-line"></i>
            </span>
          ) : (
            <li>
              <Link
                to="#"
                className="badge badge-soft-secondary edit-item-btn"
                state={row}
                onClick={() => tog_ModalAffiliateStatus()}
              >
                <i className="ri-checkbox-circle-line"></i>
              </Link>
            </li>
          )}
          <li>
            <Link to="#" className="badge badge-soft-success edit-item-btn">
              <i className="ri-edit-2-line"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="badge badge-soft-danger remove-item-btn"
              onClick={() => AlertDelete(row?._id!)}
            >
              <i className="ri-delete-bin-2-line"></i>
            </Link>
          </li>
        </ul>
      ),
    },
  ];
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Affiliates" pageTitle="Contacts" />
          <Card id="shipmentsList">
            <Card.Header className="border-bottom-dashed">
              <Row className="g-3">
                <Col xxl={3} lg={6}>
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control search"
                      placeholder="Search for something..."
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive table-card">
                <DataTable columns={columns} data={AllAffiliates} pagination />
              </div>
              <div className="noresult" style={{ display: "none" }}>
                <div className="text-center py-4">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                      <i className="bi bi-search"></i>
                    </div>
                  </div>
                  <h5 className="mt-2">Sorry! No Result Found</h5>
                  <p className="text-muted mb-0">
                    We've searched more than 150+ shipment orders We did not
                    find any shipment orders for you search.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
        {/* Modal To Assign Driver */}
        <Modal
          className="fade zoomIn"
          size="lg"
          show={modal_AffiliateStatus}
          onHide={() => {
            tog_ModalAffiliateStatus();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h4 className="modal-title" id="exampleModalLabel">
              Affiliate
            </h4>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Name</h5>
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <h6>{affiliateLocation?.state?.name!}</h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Phone</h5>
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <h6>{affiliateLocation?.state?.phone!}</h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Address</h5>
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <h6>{affiliateLocation?.state?.address!}</h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Work Regions</h5>
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <h6>{affiliateLocation?.state?.region!.join(" , ")}</h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Fleet Number</h5>
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <h6>{affiliateLocation?.state?.name!}</h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <h5>Vehicles</h5>
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  {affiliateLocation?.state?.vehicles!.map((vehicle: any) => (
                    <h6>{vehicle.type}</h6>
                  ))}
                  {/* <h6>{affiliateLocation?.state?.length}</h6> */}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-soft-danger"
                    data-bs-dismiss="modal"
                    onClick={() => handleRefuseAffiliate()}
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Refuse
                  </Button>
                  <Button
                    className="btn-soft-success"
                    id="add-btn"
                    type="submit"
                    onClick={() => handleUpdate()}
                  >
                    <i className="ri-check-line align-bottom me-1"></i> Accept
                  </Button>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Subcontractors;
