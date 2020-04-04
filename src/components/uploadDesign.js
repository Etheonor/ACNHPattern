import React, { useState, useContext } from "react";
import { firebase, writeGlobal } from "../API/Firebase";
import styles from "./uploadDesign.module.scss";
import Button from "./buttons/button";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";

const UploadDesign = () => {
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);

  const [img, setImg] = useState(null);
  const [cCode, setcCode] = useState('');
  const [dCode, setdCode] = useState('');

  const uploadImg = file => {
    // Create a reference to 'mountains.jpg'
    const task = firebase
      .storage()
      .ref("images/")
      .child(`${file.name}`)
      .put(file);

    task.on(
      "state_changed",
      function progress(snapshot) {},

      function error(err) {
        console.log(err);
      },
      function complete() {
        alert("Success");
        document.getElementById("formInput").reset();
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          setImg(downloadURL);
        });
      }
    );
  };

  const onChangeHandler = () => {
    const input = document.getElementById("fileinput");
    return input.files[0];
  };

  const fileUploadHandler = () => {
    const input = document.getElementById("fileinput");
    if (input.files[0] !== undefined) {
      uploadImg(input.files[0]);
    } else alert("Sélectionner une image !");
  };

  const handleCCode = event => {
    setcCode(event.target.value);
  };

  const handleDCode = event => {
    setdCode(event.target.value);
  };

  const uploadPattern = () => {

    if (img !== null && cCode !== '' && dCode !== '') {
      const patternObject = {
        patternImage: img,
        patternCat: "",
        creatorCode: cCode,
        designCode: dCode,
        user: state.user.username
      };
      writeGlobal(state.user, patternObject)
    }
    else alert('Please fill the form')
    
  };

  return (
    <div className={styles.uploadDesign}>
      {/* UPLOAD IMAGE */}
      <div className={styles.uploadImage}>
        <form method="post" action="#" id="formInput">
          <div className="form-group files">
            <label htmlFor="fileinput" className={styles.uploadImageLabel}>
              <h3>Upload Your File</h3>
            </label>
            <input
              type="file"
              name="file"
              id="fileinput"
              className="form-control"
              onChange={onChangeHandler}
            />
          </div>
          <button width="100%" type="button" onClick={fileUploadHandler}>
            Upload File
          </button>
        </form>
        {img && <img max-width='500px' src={img} alt="" />}
      </div>
      {/* UPLOAD IMAGE */}
      {/* CATEGORIES */}
      <div className={styles.categories}>
        <h3>Pattern Categories</h3>
        <div className={styles.checkboxes}>
          <label htmlFor="category1">
            <input
              type="checkbox"
              id="category1"
              name="category1"
              value="Cloth"
            />{" "}
            Cloth
          </label>

          <label htmlFor="category2">
            <input
              type="checkbox"
              id="category2"
              name="category2"
              value="Wall"
            />{" "}
            Wall
          </label>

          <label htmlFor="category3">
            <input
              type="checkbox"
              id="category3"
              name="category3"
              value="Floor"
            />{" "}
            Floor
          </label>
        </div>
      </div>
      {/* CATEGORIES */}
      {/* CREATOR CODE */}
      <h3>Creator Code</h3>
      <div className={styles.userCode}>
        <label htmlFor="creatorCode">
          <input
            type="text"
            value={cCode}
            onChange={handleCCode}
            id="creatorCode"
            name="creatorCode"
          />
        </label>
      </div>
      {/* CREATOR CODE */}
      {/* DESIGN CODE */}
      <h3>Design Code</h3>
      <div className={styles.userCode}>
        <label htmlFor="designCode">
          <input
            type="text"
            value={dCode}
            onChange={handleDCode}
            id="designCode"
            name="designCode"
          />
        </label>
      </div>
      {/* DESIGN CODE */}
      <Button
        classname={styles.uploadButton}
        onClick={uploadPattern}
        label="Upload your pattern"
      />
    </div>
  );
};

export default UploadDesign;
