import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Uploads = () => {
  const [documentData, setData] = useState({
    group_id: 1,
    user_id: 1,
    title: "",
    content: "",
  });

  const [error, setErrorMessage] = useState("");

  const handleChangeInput = (fieldName, data) => {
    //change input title
    setData((prevData) => ({
      ...prevData,
      [fieldName]: data,
    }));
  };

  const validateFeatureCombination = (documentData) => {
    if (
      documentData.title == "" &&
      documentData.content == "" &&
      documentData.user_id == null &&
      documentData.group_id == null
    ) {
      return { valid: false, message: "Required fields" };
    }
    return { valid: true };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validateFeatureCombination(documentData);

    if (!validation.valid) {
      setErrorMessage(validation.message);
      return; // Stop submission if validation fails
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(documentData),
    };
    const response = fetch("", options);
    window.location = "/";
  };

  return (
    <div className="upload-page-container">
      <h1 className="page-header mb-5">Upload Document</h1>
      <form method="POST">
        <div className="form-group">
          <label className="input-labels">Title</label>
          <input
            type="text"
            value={documentData.title}
            onChange={(event) => handleChangeInput("title", event.target.value)}
            className="input-item"
            placeholder="Title"
          />
        </div>

        <div className="form-group">
          <label className="input-labels">Content</label>
          <CKEditor
            editor={ClassicEditor}
            data={documentData.content}
            className="costum-editor"
            onChange={(event, editor) =>
              handleChangeInput("content", editor.getData())
            }
          />
        </div>

        <input
          type="submit"
          value="Submit"
          className="submit-btn"
          onClick={(event) => handleSubmit(event)}
        />
      </form>
    </div>
  );
};

export default Uploads;
