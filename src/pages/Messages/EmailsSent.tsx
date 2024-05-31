import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Card,
  Col,
  Modal,
  Form,
  Button,
  Offcanvas,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Quote,
  useDeleteQuoteMutation,
  useGetAllQuoteQuery,
  useSurveyAffilaitesMutation,
} from "features/Quotes/quoteSlice";
import Swal from "sweetalert2";
import { useGetAllAffiliatesQuery } from "features/Affiliate/affiliateSlice";
import Select from "react-select";
import SimpleBar from "simplebar-react";
import {
  useDeleteEmailSentMutation,
  useGetAllSentEmailsQuery,
} from "features/emailSent/emailSentSlice";

interface Column {
  name: JSX.Element;
  selector: (cell: Quote | any) => JSX.Element | any;
  sortable: boolean;
  width?: string;
}

const EmailsSent = () => {
  document.title = "Emails Sent | Bouden Coach Travel";

  //  Internally, customStyles will deep merges your customStyles with the default styling.
  const customTableStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        border: "1px solid #ddd",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        border: "1px solid #ddd",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        border: "1px solid #ddd",
      },
    },
  };

  const customStyles = {
    multiValue: (styles: any, { data }: any) => {
      return {
        ...styles,
        backgroundColor: "#4b93ff",
      };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
      ...styles,
      backgroundColor: "#4b93ff",
      color: "white",
      //    borderRadius: "50px"
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
      ...styles,
      color: "white",
      backgroundColor: "#4b93ff",
      ":hover": {
        backgroundColor: "#4b93ff",
        color: "white",
      },
    }),
  };

  const [showAffiliates, setShowAffiliates] = useState<boolean>(false);

  // From Date
  // Inside your functional component
  const [selectedFromDate, setSelectedFromDate] = useState<string>(() => {
    // Get current date
    const currentDate = new Date();
    // Format it to match your dateFormat option
    const formattedDate = currentDate.toISOString().split("T")[0];
    // Return the formatted date as the default value
    return formattedDate;
  });

  const handleFromDateChange = (selectedDates: Date[]) => {
    const formattedDate = selectedDates[0].toISOString().split("T")[0];
    setSelectedFromDate(formattedDate);
  };

  // To Date
  // const [selectedToDate, setSelectedToDate] = useState<Date | null>(newDate);
  const [selectedToDate, setSelectedToDate] = useState<string>(() => {
    // Get current date
    const currentDate = new Date();
    // Format it to match your dateFormat option
    currentDate.setDate(currentDate.getDate() + 15);
    const formattedDate = currentDate.toISOString().split("T")[0];
    // Return the formatted date as the default value
    return formattedDate;
  });
  const handleToDateChange = (selectedDates: Date[]) => {
    const formattedDate = selectedDates[0].toISOString().split("T")[0];
    setSelectedToDate(formattedDate);
  };

  // Log selectedFromDate whenever it changes
  useEffect(() => {
    console.log(selectedFromDate);
  }, [selectedFromDate]);

  const { data: AllQuotes = [] } = useGetAllSentEmailsQuery();

  const [modal_QuoteInfo, setmodal_QuoteInfo] = useState<boolean>(false);

  function tog_QuoteInfo() {
    setmodal_QuoteInfo(!modal_QuoteInfo);
  }

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const handleChange = ({ selectedRows }: { selectedRows: Quote }) => {
    setIsChecked(!isChecked);
    setSelectedRow(selectedRows);
  };

  const [deleteAttachment] = useDeleteEmailSentMutation();

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
        text: "You won't be able to go back !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "yes, delete it !",
        cancelButtonText: "No, cancel !",
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          deleteAttachment(_id);
          swalWithBootstrapButtons.fire(
            "Deleted !",
            "Attachment is deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Attachment is safe :)",
            "info"
          );
        }
      });
  };
  const columns: Column[] = [
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row: any) => row.date,
      sortable: true,
      width: "200px",
    },
    {
      name: <span className="font-weight-bold fs-13">Quote ID</span>,
      selector: (row: any) => row.quoteID,
      sortable: true,
      width: "180px",
    },
    {
      name: <span className="font-weight-bold fs-13">Subject</span>,
      selector: (row: any) => (
        <span>
          <b>{row.subjectEmail}</b>
        </span>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: <span className="font-weight-bold fs-13">From</span>,
      selector: (row: any) => row.from,
      sortable: true,
      width: "200px",
    },
    {
      name: <span className="font-weight-bold fs-13">To</span>,
      selector: (row: any) => row.to,
      sortable: true,
      width: "200px",
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => {
        return (
          <ul className="hstack gap-3 list-unstyled mb-0">
            <li>
              <Link
                to="#"
                className="badge badge-soft-info edit-item-btn"
                // onClick={() => handleDownload(row.attachment)}
              >
                <i className="ri-eye-line"></i>
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
          <Breadcrumb title="Emails Sent" pageTitle="Messages" />
          <Col lg={12}>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <Row className="g-2">
                  <Col lg={8} className="d-flex">
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
                <DataTable
                  columns={columns}
                  data={AllQuotes}
                  pagination
                  customStyles={customTableStyles}
                />
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default EmailsSent;
