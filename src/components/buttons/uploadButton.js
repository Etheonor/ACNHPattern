import React from "react"

const UploadButton = () => {

  const onChangeHandler = () => {

  }

  const fileUploadHandler = () => {

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
