import React, { useState, useContext } from "react";
import { firebase, writePattern } from "../API/Firebase";
import styles from "./uploadPattern.module.scss";
import Button from "./buttons/button";
import { GlobalStateContext } from "../context/GlobalContextProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingIcon from "../icons/System/loader-4-line.svg";
import uploadIcon from "../icons/System/upload-cloud-2-line.svg";
import cameraIcon from "../icons/Media/camera-switch-line.svg";

const UploadDesign = () => {
  const state = useContext(GlobalStateContext);

  const [img, setImg] = useState([]);
  const [cCode, setcCode] = useState("MA-");
  const [dCode, setdCode] = useState("MO-");
  const [cat, setCat] = useState([]);
  const [dName, setdName] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [desc, setDesc] = useState("");

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
          setImg(prevImg => [...prevImg, downloadURL]);
        });
      }
    );
  };

  const onChangeHandler = () => {
    const input = document.getElementById("fileinput");

    if (input.files !== undefined) {
      for (let i = 0; i < input.files.length; i++) {
        uploadImg(input.files[i]);
      }

      //uploadImg(input.files);
    } else if (input.files.size > 500000) {
      toast.warning("Your image is way too big!");
    } else toast.warning("Select an image!");

    return input.files;
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

  const handleDesc = event => {
    setDesc(event.target.value);
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
    if (
      img !== null &&
      cCode !== "" &&
      dCode !== "" &&
      (cat.length > 0) & (desc.length <= 140)
    ) {
      const patternObject = {
        patternImage: img,
        patternCat: cat,
        creatorCode: cCode,
        description: desc,
        designCode: dCode,
        designName: dName,
        user: state.user.username,
        likes: [],
        likeCount: 0,
      };
      writePattern(patternObject);
      document.getElementById("formInput").reset();
      document.getElementById("category1").checked = false;
      document.getElementById("category2").checked = false;
      document.getElementById("category3").checked = false;
      document.getElementById("designCode").value = null;
      document.getElementById("creatorCode").value = null;
      document.getElementById("designName").value = 'MO-';
      document.getElementById("description").value = null;
      setImg([]);
    } else toast.error("Did you enter all the info?");
  };

  return (
    <div className={styles.uploadDesign}>
      {/* UPLOAD IMAGE */}
      <div className={styles.uploadImage}>
        <form method="post" action="#" id="formInput">
          <div className="form-group files">
            <label htmlFor="fileinput" className={styles.uploadImageLabel}>
              <div className={styles.uploadButtons}>
                <p className={styles.uploadButton}>Select your image(s)</p>
              </div>

              {loadingImage && (
                <img
                  className={styles.loadingIcon}
                  src={loadingIcon}
                  alt="loading"
                />
              )}

              <input
                type="file"
                multiple
                name="file"
                id="fileinput"
                className={styles.uploadImageButton}
                onChange={onChangeHandler}
              />
            </label>
            <p className={styles.uploadInfo}>5 images and 500ko/image max</p>
          </div>
        </form>
        <div className={styles.imgBlock}>
          {img &&
            img.map((el, index) => {
              return (
                <img
                  key={index}
                  className={styles.imageUploaded}
                  src={el}
                  alt=""
                />
              );
            })}
        </div>
      </div>
      {/* UPLOAD IMAGE */}
      {/* CATEGORIES */}
      <div className={styles.categories}>
        <h3>Pattern Categories</h3>
        <div className={styles.checkboxes}>
          <label className={styles.checkContainer} htmlFor="category1">
            <input
              type="checkbox"
              id="category1"
              name="category"
              value="Cloth"
              onChange={categoryHandler}
            />
            <span className={styles.checkmark}></span> Clothing
          </label>

          <label className={styles.checkContainer} htmlFor="category2">
            <input
              type="checkbox"
              id="category2"
              name="category"
              value="Wall"
              onChange={categoryHandler}
            />
            <span className={styles.checkmark}></span> Wall
          </label>

          <label className={styles.checkContainer} htmlFor="category3">
            <input
              type="checkbox"
              id="category3"
              name="category"
              value="Floor"
              onChange={categoryHandler}
            />
            <span className={styles.checkmark}></span> Floor
          </label>
          <label className={styles.checkContainer} htmlFor="category4">
            <input
              type="checkbox"
              id="category4"
              name="category"
              value="Sign"
              onChange={categoryHandler}
            />
            <span className={styles.checkmark}></span> Sign
          </label>
        </div>
      </div>
      {/* CATEGORIES */}
      {/* DESCRIPTION */}
      <div className={styles.description}>
        <label htmlFor="description">
          <h3>Description (optional, 140char / max)</h3>
        </label>
        <textarea
          maxlength="140"
          onChange={handleDesc}
          id="description"
          rows="4"
        ></textarea>
      </div>

      {/* DESCRIPTION */}
      {/* DESIGN NAME */}
      <div className={styles.userCode}>
        <h3>Design Name</h3>

        <label htmlFor="designName">
          <input
            type="text"
            value={dName}
            onChange={handleDName}
            id="designName"
            name="designName"
          />
        </label>
      </div>
      {/* DESIGN NAME */}
      {/* CREATOR CODE */}
      <div className={styles.userCode}>
        <h3>Creator Code</h3>
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
      <div className={styles.userCode}>
        <h3>Design Code</h3>
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
        image={uploadIcon}
        onClick={uploadPattern}
        label="Upload your pattern"
      />
    </div>
  );
};

export default UploadDesign;
