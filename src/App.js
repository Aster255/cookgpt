import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import NavBar from "./Navbar.jsx";
import HomePage from "./Home.jsx";
import AboutPage from "./About.jsx";
import RecipeGenerator from "./Recipegen.jsx";
import { Login } from "./LoginCompo.jsx";
import { Movie } from "./Movie.jsx";
import { LandingPage } from "./LandingPage.jsx";
// import Home from "./pages/Home";
// import Recipes from "./pages/Recipes";
// import RecipeDetails from "./pages/RecipeDetails";
// import About from "./pages/About";
import "./App.css";
import Recipes from "./Recipes.jsx";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db, payload, storage } from "./config/firebase.js";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {
  Button,
  Container,
  Form,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { RecipePage } from "./Recipepage.jsx";
import { Footer } from "./Footer.jsx";
const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState("");
  const dbRefRecipes = collection(db, "Recipes");
  const getRecipes = async () => {
    try {
      const data = await getDocs(dbRefRecipes);
      const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => b.time.toDate() - a.time.toDate());
      // .filter((doc) => doc.userId == auth?.currentUser?.uid);
      setRecipes(filteredData);
      console.log(recipes);
    } catch (err) {
      if (auth.currentUser) {
        alert("firebase error");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    getRecipes();
  }, [user]);

  //recipe gen stuff//
  const [dish, setDish] = useState("");
  const [spinner, setSpinner] = useState("");
  const [recipx, setRecipx] = useState({});
  const [disable, setDisable] = useState();
  const [fileurl, setFileurl] = useState("");
  const recipeCollectionRef = collection(db, "Recipes");
  const [dalletrigger, setDalletrigger] = useState(0);
  const [uploadimagetrigger, setUploadimagetrigger] = useState(0);
  const [savetrigger, setSavetrigger] = useState(0);
  const [loadingmess, setLoadingmess] = useState("");
  const [imagesrc, setImagesrc] = useState("");
  const [imgfilename, setImgfilename] = useState("");
  const [show, setShow] = useState(false);
  const [toastermessage, setToastermessage] = useState("");
  const [show2, setShow2] = useState(false);

  const apiKey = "2132";

  const handleInputChange = (event) => {
    setDish(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (dish.trim() != "" && auth.currentUser) {
      setSpinner(" ");
      setShow2(true);
      setDisable("disabled");
      setLoadingmess("Letting the AI cook....");
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + apiKey,
            },
          }
        );
        let anna = JSON.parse(
          response?.data?.choices[0]?.message.function_call.arguments
        );
        setRecipx((propz) => ({
          ...propz,
          ...anna,
        }));
      } catch (error) {
        console.error("Error generating recipe:", error);
        setShow(true);
        setShow2(false);
        setSpinner("");
        setDisable("");
        setToastermessage("FOODGPT error Please Retry prompt");
      }
    } else {
      console.log("error blank input");
    }
    setDalletrigger(dalletrigger + 1);
  };

  const submitRecipe = async () => {
    setLoadingmess("Saving to firebase");
    if (spinner && auth.currentUser) {
      try {
        let now = new Date();
        await addDoc(recipeCollectionRef, {
          ...recipx,
          userId: auth?.currentUser?.uid,
          userEmail: auth?.currentUser?.email,
          prompt: dish,
          image: fileurl,
          time: now,
        });
        setShow2(true);
        await getRecipes();
      } catch (err) {
        console.error(err);
        setShow(true);
        setShow2(false);
        setToastermessage("FOODGPT error: Recipe not saved");
      }
    }
    setSpinner("");
    setDisable("");
    setLoadingmess("");
  };

  const tryimage = async () => {
    if (recipx.scene && spinner && auth.currentUser) {
      try {
        setLoadingmess("generating dish visual");
        console.log("imagegen started");
        const response = await axios.post(
          "https://api.openai.com/v1/images/generations",
          {
            prompt: `GENRE: gourmet|PHOTOREALISTIC, PRODUCTION:Food Stylist, SCENE: ${recipx.scene.replace(
              /,/g,
              " "
            )}| Mid-angle Shot, High-end food photography, clean composition, dramatic lighting, luxurious, elegant| SHOT: Mid-angle| FOCAL LENGTH: 50mm`,
            n: 1,
            size: "512x512",
            response_format: "b64_json",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + apiKey,
            },
          }
        );
        console.log(response);
        console.log(response.request.response);
        const a = JSON.parse(response.request.response);
        // console.log(a);
        // console.log(a.data[0].url);
        console.log(a.data[0].b64_json);
        console.log(a.created);
        setImagesrc(a.data[0].b64_json);
        setImgfilename(a.created);
        console.log(imgfilename);
        console.log(imagesrc);
        setUploadimagetrigger(uploadimagetrigger + 1);
      } catch (error) {
        console.error(error);
        setSpinner(false);
        setShow(true);
        setShow2(false);
        setDisable("");
        setToastermessage("FOODGPT ERROR: image error \n Please Retry prompt");
      }
    }
  };

  const uploadFile = async () => {
    if (spinner && auth.currentUser) {
      setLoadingmess("uploading img to firebase");
      const filesFolderRef = ref(storage, `${imgfilename}.png`);
      try {
        await uploadString(filesFolderRef, imagesrc, "base64");
        setLoadingmess("getting url");
        await getDownloadURL(ref(storage, `${imgfilename}.png`)).then((url) =>
          setFileurl(url)
        );
        console.log("uploadk");
        console.log(fileurl);
        setSavetrigger(savetrigger + 1);
      } catch (err) {
        console.error(err);
        setShow(true);
        setShow2(false);
        setDisable("");
        setToastermessage("FOODGPT error: error connecting to firebase");
      }
    }
  };

  useEffect(() => {
    submitRecipe();
  }, [savetrigger]);
  useEffect(() => {
    uploadFile();
  }, [uploadimagetrigger]);
  useEffect(() => {
    tryimage();
  }, [dalletrigger]);

  return (
    <BrowserRouter>
      <div id="page-container">
        <div id="content-wrap" className="mb-2">
          <NavBar spinner={spinner} loadingmess={loadingmess} key={spinner} />
          <Container fluid className="position-relative">
            <ToastContainer
              className="p-3"
              position={"top-center"}
              style={{ zIndex: 1 }}
            >
              <Toast onClose={() => setShow(false)} show={show}>
                <Toast.Header>
                  <strong className="me-auto">FoodGPT</strong>
                </Toast.Header>
                <Toast.Body>{toastermessage}</Toast.Body>
              </Toast>
            </ToastContainer>
            <ToastContainer
              className="p-3"
              position={"top-end"}
              style={{ zIndex: 1 }}
            >
              <Toast onClose={() => setShow2(false)} show={show2}>
                <Toast.Header>
                  <strong className="me-auto">FoodGPT</strong>
                </Toast.Header>
                <div className="d-grid">
                  {spinner ? (
                    <Button variant="primary" disabled>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      {loadingmess}
                    </Button>
                  ) : (
                    <>
                      <div>
                        <h5>{recipx.name}</h5>
                      </div>
                      <div>
                        {recipx.othername ? `aka ${recipx.othername}` : ""}
                      </div>
                      <Link
                        className="link"
                        to={`/recipe-generator/`}
                        onClick={() => setShow2(false)}
                      >
                        <div className="d-grid">
                          <Button variant="primary">
                            Recipe Successfully Generated
                          </Button>
                        </div>
                      </Link>
                    </>
                  )}
                </div>
              </Toast>
            </ToastContainer>
            <Routes>
              <Route exact path="/foodgpt" element={<LandingPage />} />
              <Route exact path="/" element={<LandingPage />} />
              <Route
                exact
                path="/test"
                element={
                  <>
                    <Login />
                    <Movie />
                  </>
                }
              />
              <Route
                path="/recipe-generator"
                element={
                  <RecipeGenerator
                    dish={dish}
                    handleInputChange={handleInputChange}
                    disable={disable}
                    spinner={spinner}
                    loadingmess={loadingmess}
                    handleSubmit={handleSubmit}
                    recipx={recipx}
                    imagesrc={imagesrc}
                  />
                }
              />
              <Route
                path="/recipes"
                element={<Recipes recipes={recipes} key={recipes} />}
              />

              <Route
                path="/recipe/:id"
                element={<RecipePage recipes={recipes} key={recipes} />}
              />

              <Route exact path="/about" element={<AboutPage />} />
            </Routes>
          </Container>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
