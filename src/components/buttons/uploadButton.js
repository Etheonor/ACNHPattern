import React from "react"
import {uploadImg} from './../../API/Firebase'
import writeGlobal from '../../API/Firebase'

let file = null

const uploadImg2 = (file) => {
  console.log(file)
  console.log('yeah')
}

const UploadButton = () => {

  const onChangeHandler = () => {
     const input = document.getElementById('fileinput');
     file = input.files[0]
  }

  const fileUploadHandler = () => {
    const input = document.getElementById('fileinput');
    uploadImg(input.files[0])
   
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form method="post" action="#" id="#">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input
                type="file"
                name="file"
                id="fileinput"
                className="form-control"
                onChange={onChangeHandler}
              />
            </div>
            <div className="col-md-6 pull-right">
              <button
                width="100%"
                type="button"
                className="btn btn-info"
                onClick={fileUploadHandler}
              >
                Upload File
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadButton;
