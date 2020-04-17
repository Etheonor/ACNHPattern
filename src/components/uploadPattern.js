import React, { useState, useContext } from "react";
import { firebase, writePattern } from "../API/Firebase";
import styles from "./uploadPattern.module.scss";
import Button2 from "./buttons/button";
import { GlobalStateContext } from "../context/GlobalContextProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingIcon from "../icons/System/loader-4-line.svg";
import uploadIcon from "../icons/System/upload-cloud-2-line.svg";
import Resizer from 'react-image-file-resizer';

//IMPORT MATERIAL UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";

const UploadDesign = () => {
  const state = useContext(GlobalStateContext);

  const [img, setImg] = useState([]);
  const [cCode, setcCode] = useState("MA-");
  const [dCode, setdCode] = useState("MO-");
  const [cat, setCat] = useState([]);
  const [dName, setdName] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [desc, setDesc] = useState("");

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

  const reduceFile = file => {
    Resizer.imageFileResizer(
      file,
      600,
      400,
      'JPEG',
      80,
      0,
      uri => {
          uploadImg(uri)
      },
      'blob'
  );
  }

  const uploadImg = file => {
    // Create a reference to 'mountains.jpg'
    if (img.length < 5) {
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
    }
   
  };

  const onChangeHandler = () => {
    const input = document.getElementById("fileinput");

    if (input.files !== undefined) {
      for (let i = 0; i < input.files.length; i++) {
        reduceFile(input.files[i]);
      }

      //uploadImg(input.files);
    } else if (input.files.size > 500000) {
      toast.warning("Your image is way too big!");
    } else toast.warning("Select an image!");

    return input.files;
  };

  const handleCCode = event => {
    setcCode(event.target.value);
    console.log(cCode);
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
      "input[id=catCheck]:checked"
    );
    const newCat = [];
    checkedBoxes.forEach(element => {
      if (element.checked === true) {
        newCat.push(element.labels[0].innerText);
      }
    });
    console.log(newCat);
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

      setImg([]);
    } else toast.error("Did you enter all the info?");
  };
  const classes = useStyles();

  return (
    <Grid className={styles.uploadDesign}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {" "}
            {/* UPLOAD IMAGE */}
            <div className={styles.uploadImage}>
              <form method="post" action="#" id="formInput">
                <div className={styles.uploadImageButton}>
                  <label
                    htmlFor="fileinput"
                    className={styles.uploadImageLabel}
                  >
                    <input
                      type="file"
                      multiple
                      name="file"
                      id="fileinput"
                      className={styles.uploadImageButton}
                      onChange={onChangeHandler}
                    />
                    <Button
                      component="span"
                      variant="contained"
                      color="primary"
                    >
                      Select your image(s)
                    </Button>
                    {loadingImage && (
                      <img
                        className={styles.loadingIcon}
                        src={loadingIcon}
                        alt="loading"
                      />
                    )}
                  </label>
                  <p className={styles.uploadInfo}>
                    5 images and 500ko/image max
                  </p>
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
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {/* CATEGORIES */}
            <div className={styles.categories}>
              <h3>Pattern Categories</h3>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={categoryHandler}
                    id="catCheck"
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
                label="Cloth"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={categoryHandler}
                    id="catCheck"
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
                label="Wall"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={categoryHandler}
                    id="catCheck"
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
                label="Floor"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={categoryHandler}
                    id="catCheck"
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
                label="Path"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={categoryHandler}
                    id="catCheck"
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
                label="Sign"
              />
            </div>

            {/* CATEGORIES */}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {" "}
            {/* DESCRIPTION */}
            <div className={styles.description}>
              <label htmlFor="description">
                <h3>Description (optional, 140char / max)</h3>
              </label>
              <textarea
                maxLength="140"
                onChange={handleDesc}
                id="description"
                rows="4"
              ></textarea>
            </div>
            {/* DESCRIPTION */}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            {/* DESIGN NAME */}
            <TextField
              id="standard-basic"
              label="Design Name"
              value={dName}
              onChange={handleDName}
            />
            {/* DESIGN NAME */}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            {/* CREATOR CODE */}
            <TextField
              id="standard-basic"
              label="Creator Code"
              value={cCode}
              onChange={handleCCode}
            />
            {/* CREATOR CODE */}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            {" "}
            {/* DESIGN CODE */}
            <TextField
              id="standard-basic"
              label="Design Name"
              value={dCode}
              onChange={handleDCode}
            />
            {/* DESIGN CODE */}
          </Paper>
        </Grid>
        <Grid item xs={12} className={styles.uploadButton}>
          {" "}
          <Button
            image={uploadIcon}
            onClick={uploadPattern}
            variant="contained"
            color="primary"
          >
            Upload your pattern
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UploadDesign;
