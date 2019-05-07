import React, { Component } from "react";
import Dropzone from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { imagePost } from "./service";
import "./style.css";

import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef
} from "./CropUtils";

const imageMaxSize = 1000000000;
class ImageDropAndCrop extends Component {
  constructor(props) {
    super(props);
    this.imagePreviewCanvasRef = React.createRef();
    this.fileInputRef = React.createRef();
    this.state = {
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: 1 / 1,
        width: 0,
        height: 0
      },
      newImgSrc: null
    };
  }

  verifyFiles = file => {
    if (file && file.length > 0) {
      const currentFiles = file[0];
      const currentFiletype = currentFiles.type;
      const currentFileSize = currentFiles.size;
      if (currentFileSize > imageMaxSize) {
        alert("file size too large");
        return false;
      }
      return true;
    }
  };

  handleOnDrop = acceptedfiles => {
    if (acceptedfiles && acceptedfiles.length > 0) {
      const isVerified = this.verifyFiles(acceptedfiles);
      if (isVerified) {
        const currentFile = acceptedfiles[0];
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            const myResult = reader.result;
            this.setState({
              imgSrc: reader.result,
              imgSrcExt: extractImageFileExtensionFromBase64(myResult)
            });
            // console.log("original", this.state.imgSrc);
          },
          false
        );
        reader.readAsDataURL(currentFile);
      }
    }
  };

  handleOnCropChange = crop => {
    this.setState({ crop: crop });
  };

  // handleOnImageLoaded = image => {};

  handleOnCropComplete = async crop => {
    let pixelCrop = {};
    if (crop.width && crop.height === undefined) {
      pixelCrop = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    } else if (crop.width && crop.height === null) {
      pixelCrop = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    } else {
      pixelCrop = {
        x: crop.x,
        y: crop.y,
        width: crop.width,
        height: crop.height
      };
    }
    const canvasRef = this.imagePreviewCanvasRef.current;
    const { imgSrc } = this.state;
    const image = await image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
    console.log("Img blog", image);
    this.handleNewCroppedFile();
  };

  handleNewCroppedFile = () => {
    const { imgSrc } = this.state;
    // console.log("img src", imgSrc);
    if (imgSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current;
      // console.log("canvasRef", canvasRef);

      const { imgSrcExt } = this.state;
      const imageData64 = canvasRef.toDataURL();
      // console.log("Cropped", imageData64);

      const myFilename = "croppedImage." + imgSrcExt;
      if (imageData64 === "data:,") {
        console.log(">>>>>>");
      } else {
        const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
        console.log(myNewCroppedFile);
        const croppedBase64 = `${myNewCroppedFile[0]},${myNewCroppedFile[1]}`;
        console.log(croppedBase64);

        imagePost(croppedBase64)
          .then(res => res.text())
          .then(resp => {
            console.log(resp);
          })
          .catch(err => console.log(err));
        // this.handleClearToDefault();
      }
    }
  };

  handleClearToDefault = event => {
    if (event) event.preventDefault();
    const canvas = this.imagePreviewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.setState({
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: 1 / 1,
        width: 0,
        height: 0
      }
    });
    this.fileInputRef.current.value = null;
  };
  // convertDataURIToBinary = dataURI => {
  //   var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  //   var base64 = dataURI.substring(base64Index);
  //   var raw = window.atob(base64);
  //   var rawLength = raw.length;
  //   var array = new Uint8Array(new ArrayBuffer(rawLength));

  //   for (let i = 0; i < rawLength; i++) {
  //     array[i] = raw.charCodeAt(i);
  //   }
  //   // return array;
  //   // console.log(array);
  // };

  render() {
    const { imgSrc } = this.state;
    return (
      <div>
        <h2>Drop and Crop</h2>
        {imgSrc !== null ? (
          <div>
            {/* {imgSrc}
            <img src={imgSrc} alt="Uploaded Image Preview" /> */}

            <ReactCrop
              src={imgSrc}
              crop={this.state.crop}
              onImageLoaded={this.handleOnImageLoaded}
              onComplete={this.handleOnCropComplete}
              onChange={this.handleOnCropChange}
              minHeight={100}
              minWidth={100}
            />
            <br />
            <p>Preview Canvas</p>
            <canvas className="imageCanvas" ref={this.imagePreviewCanvasRef} />
          </div>
        ) : (
          <Dropzone
            onDrop={(rejectedFiles, acceptedFiles) =>
              this.handleOnDrop(acceptedFiles)
            }
            accept="images/*"
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
        )}
      </div>
    );
  }
}

export default ImageDropAndCrop;
