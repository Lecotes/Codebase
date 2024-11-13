import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { validateFormFields } from "../utilities/Validation.jsx";
import Select from "react-tailwindcss-select";

const Uploads = () => {
  const [documentData, setData] = useState({
    group_id: "",
    user_id: 1,
    title: "",
    content: "",
  });

  const [errors, setErrorMessage] = useState({});

  const handleChangeInput = (fieldName, data) => {
    console.log(data);
    //change input title
    setData((prevData) => ({
      ...prevData,
      [fieldName]: data,
    }));
  };
  const options = [
    { value: "0", label: "Public" },
    { value: "1", label: "Group1" },
    { value: "2", label: "Group2" },
  ];

  const [groupName, setGroupName] = useState("");

  const handleChange = (selected) => {
    setGroupName(selected);
    handleChangeInput("group_id", selected.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validateFormFields(documentData, setErrorMessage);

    if (!validation.valid) {
      return; // Stop submission if validation fails
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(documentData),
    };
    const response = fetch("/api/material/create", options);
    window.location = "/";
  };

  return (
    <div className="upload-page-container">
      <h1 className="page-header mb-5">Upload Document</h1>
      <form method="POST">
        <div className="form-group">
          <label className="input-labels">Title:</label>
          <input
            type="text"
            value={documentData.title}
            onChange={(event) => handleChangeInput("title", event.target.value)}
            className="input-item"
            placeholder="Title"
          />
          {errors.title && <em className="err-message">*{errors.title}</em>}
        </div>

        <div className="form-group">
          <label className="input-labels">Assign to:</label>
          <Select
            onChange={handleChange}
            options={options}
            value={groupName}
            placeholder="Group Name..."
            classNames={{
              menuButton: () =>
                `flex items-center opacity-[0.7] w-[445px] h-[36px] px-1 py-1 text-[14px] leading-[22px] font-[400] bg-white cursor-pointer border border-[#BCC1CAFF] outline-0 transition-all duration-300 focus:outline-0`,
              menu: "absolute z-10 bg-white shadow-sm w-[445px] text-[#171a1f] text-[14px] font-[400] border border-[#BCC1CAFF] cursor-pointer",
              listItem: ({ isSelected }) =>
                `block transition duration-200 px-1 py-1 cursor-pointer select-none ${
                  isSelected ? `text-[#171a1f]` : `text-[#171a1f] opacity-[0.7]`
                } border-l border-r border-b border-l-[#BCC1CAFF] border-r-[#BCC1CAFF] border-b-[#e7ecf5]`,
            }}
          />
          {errors.group_id && <em className="err-message">*Group required</em>}
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
          {errors.content && <em className="err-message">*{errors.content}</em>}
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
