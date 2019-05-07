import "./style.css";
import React from "react";
import Dropzone from "react-dropzone";
import request from "superagent";

const CLOUDINARY_UPLOAD_PRESET = "y0ddnjcj";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dgdo3wqcf/upload";

class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: ""
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    console.log("file selected");

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    console.log("file uploaded");

    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            accept="image/*"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => {
              return (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {<p>Upload Picture</p>}
                </div>
              );
            }}
          </Dropzone>
        </div>
        <div>
          {this.state.uploadedFileCloudinaryUrl === "" ? null : (
            <div>
              {/* <p>{this.state.uploadedFile.name}</p> */}
              <img
                className="image-size"
                alt="dvsjkd"
                src={this.state.uploadedFileCloudinaryUrl}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ContactForm;
