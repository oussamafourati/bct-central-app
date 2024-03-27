import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Modal, Offcanvas, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Template = ({ emails }: any) => {
  const noresult: any = useRef();
  const teamList: any = useRef();
  const [brandList, setBrandList] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [info, setInfo] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = brandList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(brandList.length / itemsPerPage);

  useEffect(() => {
    setBrandList(emails);
    setItemsPerPage(15);
  }, [emails]);

  const handleSearchClick = (event: any) => {
    setCurrentPage(1);
    let inputVal = event.toLowerCase();

    const filterItems = (arr: any, query: any) => {
      return arr.filter((el: any) => {
        return el.brandName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    };

    let filterData = filterItems(emails, inputVal);
    setBrandList(filterData);
    if (filterData.length === 0) {
      noresult.current.style.display = "block";
      teamList.current.style.display = "none";
    } else {
      noresult.current.style.display = "none";
      // teamList.current.style.display = "block";
    }
  };

  return (
    <React.Fragment>
      <Row className="align-items-center mb-4">
        <Col xxl={3} lg={4} sm={9}>
          <div className="search-box mb-3 mb-sm-0">
            <input
              onChange={(e: any) => handleSearchClick(e.target.value)}
              type="text"
              className="form-control"
              id="searchInputList"
              autoComplete="off"
              placeholder="Search template..."
            />
            <i className="ri-search-line search-icon"></i>
          </div>
        </Col>
        <Col sm={3} className="col-lg-auto ms-auto">
          <Button
            variant="success"
            onClick={() => setShow(true)}
            className="w-100 btn-sm"
          >
            <i className="mdi mdi-email-plus-outline me-1 align-middle"></i> Add Template
          </Button>
        </Col>
      </Row>

      <Row
        className="row-cols-xxl-5 row-cols-lg-4 row-cols-sm-2 row-cols-1"
        id="brand-list"
        ref={teamList}
      >
        {(paginatedData || []).map((item: any, key: number) => (
          <Col key={key}>
            <Card className="card brand-widget card-animate" onClick={() => { setShowDetails(true); setInfo(item) }}>
                    <Card.Body className="card-body text-center pb-2">
                        <i className={item.templateIcon} style={{fontSize: 26}}></i>
              </Card.Body>
              <div className="card-footer text-center border-0">
                <h6 className="fs-17">{item.templateName}</h6>
                <p className="mb-0">
                  <Link to="#" className="link-success stretched-link">
                    {item.for}
                  </Link>
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div
        id="noresult"
        className=""
        ref={noresult}
        style={{ display: "none" }}
      >
        <div className="text-center py-4">
          <div className="avatar-md mx-auto mb-4">
            <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
              <i className="bi bi-search"></i>
            </div>
          </div>
          <h5 className="mt-2">Sorry! No Result Found</h5>
        </div>
      </div>

      <Row className="mb-4" id="pagination-element" style={{ display: "flex" }}>
        <Col lg={12}>
          <div className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
            <div
              className="page-item"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <Link to="#" className="page-link" id="page-prev">
                <i className="mdi mdi-chevron-left"></i>
              </Link>
            </div>
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1;
              const isActive = pageNumber === currentPage;
              return (
                <span
                  id="page-num"
                  className="pagination"
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  <div className={isActive ? "page-item active" : "page-item"}>
                    <Link className="page-link clickPageNumber" to="#">
                      {" "}
                      {pageNumber}
                    </Link>
                  </div>
                </span>
              );
            })}
            <div
              className="page-item"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <Link to="#" className="page-link" id="page-next">
                <i className="mdi mdi-chevron-right"></i>
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        id="createModal"
        className="zoomIn border-0"
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18">Create email template</h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <form className="create-form">
            <input type="hidden" id="id-field" />
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>

            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="brandName-input" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="brandName-input"
                    placeholder="Enter email template title"
                    required
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="brandName-input" className="form-label">
                    Interaction
                  </label>
                  <select
                    className="form-select text-muted"
                    name="choices-single-default"
                    id="statusSelect"
                    required
                  >
                    <option value="">For</option>
                    <option value="Visitor">Customer</option>
                    <option value="Sub-Contractor">Affiliate</option>
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="brandName-input" className="form-label">
                    Body
                  </label>
                  <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea5"
                                                rows={3}
                                              ></textarea>
                </div>
              </Col>
              
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    variant="ghost-danger"
                    className="btn btn-ghost-danger"
                    onClick={() => setShow(false)}
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Close
                  </Button>
                  <Button
                    variant="primary"
                    id="addNew"
                    className="btn btn-primary"
                  >
                    Add Template
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </Modal.Body>
          </Modal>
          <Offcanvas show={showDetails} onHide={() => setShowDetails(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{info.templateName}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="avatar-lg mx-auto">
                        <div className="avatar-title bg-light rounded">
              <i className={`${info.templateIcon} fs-24 text-dark`}></i>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <h5 className="overview-title">{info.templateName}</h5>
            <p className="text-muted">for <Link to="#" className="text-reset">{info.for}</Link></p>
                    </div>
          <h6 className="fs-14 mb-3">Body</h6>
          <p>{info.body}</p>
                    <ul className="vstack gap-2 mb-0 subCategory" style={{ listStyleType: "circle" }}>
                        {(info.subCategory || []).map((item: any, key: number) => (key < 4 && <li key={key}><Link to="#" className="text-reset">{item}</Link></li>))}
                    </ul>
                </Offcanvas.Body>
                <div className="p-3 border-top">
                    <Row>
                        <Col sm={6}>
                            <div data-bs-dismiss="offcanvas">
                                <Button variant="danger" type="button" className="btn btn-danger w-100 remove-list" data-bs-toggle="modal" data-bs-target="#delteModal" data-remove-id="12"><i className="ri-delete-bin-line me-1 align-bottom"></i> Delete</Button>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <Button variant="secondary" type="button" className="w-100 edit-list" data-bs-dismiss="offcanvas" data-edit-id="12"><i className="ri-pencil-line me-1 align-bottom"></i> Edit</Button>
                        </Col>
                    </Row>
                </div>
            </Offcanvas>
    </React.Fragment>
  );
};

export default Template;
