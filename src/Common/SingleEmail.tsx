import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { useSendNewEmailMutation } from "features/Emails/emailSlice";
import { useGetAttachmentByIDQuery } from "features/Attachments/attachmentSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "features/Account/authSlice";
import { RootState } from "app/store";
import { useAddNewEmailSentMutation } from "features/emailSent/emailSentSlice";
import { useNavigate } from "react-router-dom";

const SingleEmail = () => {
  const user = useSelector((state: RootState) => selectCurrentUser(state));
  const navigate = useNavigate();
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

  const [checkedCheckbox, setCheckedCheckbox] = useState(null);

  const handleCheckboxChange = (attachmentId: any) => {
    setCheckedCheckbox(attachmentId);
  };

  const { data: OneAttachment } = useGetAttachmentByIDQuery(checkedCheckbox!);
  const [data, setData] = useState("");
  const [email, setEmail] = useState<string>("");
  const [subjectNewEmail, setSubject] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const [sendNewEmailMutation] = useSendNewEmailMutation();
  const initialSendNewEmailData = {
    newEmail: "",
    subject: "",
    body: "",
    file: "",
    sender: "",
  };

  const currentDate = new Date();

  const [saveEmailSentMutation] = useAddNewEmailSentMutation();

  const [sendNewEmail, setSendNewEmail] = useState(initialSendNewEmailData);

  const { newEmail, subject, body, file, sender } = sendNewEmail;

  const onSubmitSendNewEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      notifyError(error);
    }
  };
  return (
    <React.Fragment>
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
            <Form.Label htmlFor="subjectNewEmail">Subject</Form.Label>
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
              <i className="ri-delete-back-line align-middle me-1"></i> Clear
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
      </Form>
    </React.Fragment>
  );
};

export default SingleEmail;
