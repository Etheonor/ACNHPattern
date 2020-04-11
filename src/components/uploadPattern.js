import React, { useState, useContext } from "react";
import { firebase, writePattern } from "../API/Firebase";
import styles from "./uploadPattern.module.scss";
import Button from "./buttons/button";
import { GlobalStateContext } from "../context/GlobalContextProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingIcon from "../icons/System/loader-4-line.svg";

const UploadDesign = () => {
  const state = useContext(GlobalStateContext);

  const [img, setImg] = useState(null);
  const [cCode, setcCode] = useState("");
  const [dCode, setdCode] = useState("");
  const [cat, setCat] = useState([]);
  const [dName, setdName] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const uploadImg = file => {
    // Create a reference to 'mountains.jpg'
    const task = firebase
      .storage()
      .ref("images/")
      .child("pattern" + Date.now() + Math.floor(Math.random() * 10000))
      .put(file);

    task.on(
      "state_changed",
      function progress(snapshot) {
        setLoadingImage(true);
      },

      function error(err) {
        console.log(err);
        toast.error("Something went wrong with the upload :(");
      },
      function complete() {
        setLoadingImage(false);
        toast.info("Image uploaded!");
        document.getElementById("formInput").reset();
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          setImg(downloadURL);
        });
      }
    );
  };

  const onChangeHandler = () => {
    const input = document.getElementById("fileinput");

    if (input.files[0] !== undefined && input.files[0].size <= 500000) {
      uploadImg(input.files[0]);
    } else if (input.files[0].size > 500000) {
      toast.warning("Your image is way too big!");
    } else toast.warning("Select an image!");
    return input.files[0];
  };

  const handleCCode = event => {
    setcCode(event.target.value);
  };

  const handleDCode = event => {
    setdCode(event.target.value);
  };
  const handleDName = event => {
    setdName(event.target.value);
  };

  const categoryHandler = () => {
    const checkedBoxes = document.querySelectorAll(
      "input[name=category]:checked"
    );
    const newCat = [];
    checkedBoxes.forEach(element => {
      if (element.checked === true) {
        newCat.push(element.defaultValue);
      }
    });
    setCat(newCat);
  };

  const uploadPattern = () => {
    if (img !== null && cCode !== "" && dCode !== "" && cat.length > 0) {
      const patternObject = {
        patternImage: img,
        patternCat: cat,
        creatorCode: cCode,
        designCode: dCode,
        designName: dName,
        user: state.user.username,
        likes: [],
        likeCount: 0,
      };
      writePattern(patternObject);
    } else toast.error("Some info are missing!");
  };

  return (
    <div className={styles.uploadDesign}>
      {/* UPLOAD IMAGE */}
      <div className={styles.uploadImage}>
        <form method="post" action="#" id="formInput">
          <div className="form-group files">
            <label htmlFor="fileinput" className={styles.uploadImageLabel}>
              <p>
                <span role="img" aria-label="camera">
                  📷
                </span>{" "}
                Image Upload (500ko max)
              </p>
              {loadingImage && (
                <img
                  className={styles.loadingIcon}
                  src={loadingIcon}
                  alt="loading"
                />
              )}

              <input
                type="file"
                name="file"
                id="fileinput"
                className={styles.uploadImageButton}
                onChange={onChangeHandler}
              />
            </label>
          </div>
        </form>
        {img && <img className={styles.imageUploaded} src={img} alt="" />}
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
              name="category"
              value="Cloth"
              onChange={categoryHandler}
            />{" "}
            Cloth
          </label>

          <label htmlFor="category2">
            <input
              type="checkbox"
              id="category2"
              name="category"
              value="Wall"
              onChange={categoryHandler}
            />{" "}
            Wall
          </label>

          <label htmlFor="category3">
            <input
              type="checkbox"
              id="category3"
              name="category"
              value="Floor"
              onChange={categoryHandler}
            />{" "}
            Floor
          </label>
        </div>
      </div>
      {/* CATEGORIES */}
      {/* DESIGN NAME */}
      <div className={styles.userCode}>
        <h3>Design Name</h3>
        <div>
          <label htmlFor="designName">
            <input
              type="text"
              value={dName}
              onChange={handleDName}
              id="creatorCode"
              name="creatorCode"
            />
          </label>
        </div>
      </div>
      {/* DESIGN NAME */}
      {/* CREATOR CODE */}
      <div className={styles.userCode}>
        <h3>Creator Code</h3>
        <div>
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
      </div>
      {/* CREATOR CODE */}
      {/* DESIGN CODE */}
      <div className={styles.userCode}>
        <h3>Design Code</h3>
        <div>
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
      </div>
      {/* DESIGN CODE */}
      <Button
        specialStyle="upload"
        onClick={uploadPattern}
        label="Upload your pattern"
      />
    </div>
  );
};

export default UploadDesign;
