import React, {useState} from "react";
import {
  Container,
  Row,
  Card,
  Col,
  Button,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Contract,
  useDeleteContractMutation,
  useGetAllContractsQuery,
  useGetContractQuery,
  useUpdateContractMutation,
} from "features/contract/contractSlice";
import Swal from "sweetalert2";

const NewContract = () => {
  document.title = "Contract | Bouden Coach Travel";
  const { data: AllContracts = [] } = useGetAllContractsQuery();
  const navigate = useNavigate();

  function tog_AddContract() {
    navigate("/new-contract");
  }
  const [updateContract] = useUpdateContractMutation();
  const [deleteContract] = useDeleteContractMutation();

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
      .then((result) => {
        if (result.isConfirmed) {
          deleteContract(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Contract is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Contract is safe :)",
            "info"
          );
        }
      });
  };

const contractLocation = useLocation()
const [oneContract, setOneContract] = useState<Contract>()
const handleOneContract = ()=> {
  setOneContract(contractLocation.state)
}
const AlertUpdateStatus = async (_id: any) => {
  handleOneContract(); // Start updating state

  // Use a callback function to wait for the state update
  const updateStatusCallback = () => {
    updateContract({
      _id,
      accountEmail: oneContract?.accountEmail!,
      accountName: oneContract?.accountName!,
      accountPhone: oneContract?.accountPhone!,
      accountRef: oneContract?.accountRef!,
      contractName: oneContract?.contractName!,
      invoiceFrequency: oneContract?.invoiceFrequency!,
      customerNotes: oneContract?.customerNotes!,
      staffNotes: oneContract?.staffNotes!,
      prices: oneContract?.prices!,
      salesperson: oneContract?.salesperson!,
      idProgram: oneContract?.idProgram!,
      idAccount: oneContract?.idAccount!,
      vehicleType: oneContract?.vehicleType!,
      journeyType: oneContract?.journeyType!,
      luggageDetails: oneContract?.luggageDetails!,
      contractStatus: "Approved",
    }).then(() => {
      swalWithBootstrapButtons.fire(
        "Deleted !",
        "Contract is Updated.",
        "success"
      );
    });
  };

  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to go back?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it !",
      cancelButtonText: "No, cancel !",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        updateStatusCallback(); // Call the update function after state update
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Canceled",
          "Contract is safe :)",
          "info"
        );
      }
    });
};


  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Contract Name</span>,
      selector: (row: any) => row.contractName,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Customer</span>,
      selector: (row: any) => row.accountRef,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">From</span>,
      selector: (row: any) => {
        return (
          <div>
            <span>
              <strong>{row.idProgram.pickUp_date}</strong>
            </span>{" "}
            <span>at</span>{" "}
            <span>
              <strong>{row.idProgram.pickUp_Time}</strong>
            </span>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">To</span>,
      selector: (row: any) => {
        return (
          <div>
            <span>
              <strong>{row.idProgram.droppOff_date}</strong>
            </span>{" "}
            <span>at</span>{" "}
            <span>
              <strong>{row.idProgram.dropOff_time}</strong>
            </span>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row: any) => "£ " + row.prices,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Invoice Frequency</span>,
      selector: (row: any) => row.invoiceFrequency,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (row: any) => row.contractStatus,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link to="#" className="badge badge-soft-primary edit-item-btn">
                <i className="ri-eye-line"></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-dark edit-item-btn" state={row}  onClick={() => AlertUpdateStatus(row._id)}>
                <i className="mdi mdi-update"></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-success edit-item-btn">
                <i className="ri-edit-2-line"></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="badge badge-soft-danger remove-item-btn"
                onClick={() => AlertDelete(row._id)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Contract" pageTitle="Finance" />
          <Col lg={12}>
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
                  <Col
                    sm={9}
                    className="d-flex col-lg-auto justify-content-end"
                  >
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">Select</option>
                      <option value="Today">Extra Personnel</option>
                      <option value="Yesterday">CHB</option>
                    </select>
                  </Col>
                  <Col className="col-xxl-auto col-sm-auto ms-auto">
                    <Button
                      variant="success"
                      onClick={() => tog_AddContract()}
                      className="add-btn"
                    >
                      <i className="ph ph-file-plus me-1 align-middle"></i> Add
                      Contract
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable columns={columns} data={AllContracts} pagination />
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default NewContract;
