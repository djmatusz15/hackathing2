// import { addDoc, serverTimestamp, collection } from "firebase/firestore";
// import { auth, storage, db } from "./firebase";
// import { useState, useEffect } from "react";
// import { ref, uploadBytesResumable } from "firebase/storage";

// const User = () => {
//   const [imageTitle, setImageTitle] = useState("");
//   const [file, setFile] = useState("");

//   const handleAdd = async (e) => {
//     e.preventDefault();

//     // Get the current user's email
//     const userEmail = auth.currentUser?.email;
//     if (!userEmail) {
//       alert("User not logged in!");
//       return;
//     }

//     await addDoc(collection(db, "image_names"), {
//       user: userEmail, // Use user's email as the name
//       image_title: imageTitle,
//       timeStamp: serverTimestamp(),
//     });

//     setImageTitle("");
//   };

//   useEffect(() => {
//     const uploadFile = () => {
//       const uniqueName = new Date().getTime() + file.name;
//       const storageRef = ref(storage, `images/${uniqueName}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on("state_changed", (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload paused.");
//             break;
//           case "running":
//             console.log("Upload running:", progress, "% done");
//             break;
//           default:
//             break;
//         }
//       });
//     };
//     file && uploadFile();
//   }, [file]);

//   return (
//     <div className="user">
//       <span>Eureka</span>
//       <form onSubmit={handleAdd}>
//         <input
//           placeholder="What is your picture of?"
//           value={imageTitle}
//           onChange={(e) => setImageTitle(e.target.value)}
//         />
//         <button type="submit">Click me to see if I work!</button>
//       </form>

//       <form>
//         <label htmlFor="file">Upload Files Here</label>
//         <input
//           type="file"
//           id="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           style={{ display: "none" }}
//         />
//       </form>
//     </div>
//   );
// };

// export default User;

import {
  addDoc,
  serverTimestamp,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import "./User.css";
import { auth, storage, db } from "./firebase";
import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const User = () => {
  const [imageTitle, setImageTitle] = useState("");
  const [file, setFile] = useState("");
  const [yourImages, setYourImages] = useState([]);
  const [allImages, setAllImages] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();

    const userEmail = auth.currentUser?.email;
    if (!userEmail) {
      alert("User not logged in!");
      return;
    }
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    // This will first put the given image into our storage,
    // with the timestamp first then the image name, just in
    // case two images have the same name
    const uniqueName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, `images/${uniqueName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => console.error("File upload error:", error),
      async () => {
        // Get the link to the image
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // This will add information about the image to
        // a database we set up. The correlated field will
        // have the user who uploaded it, the title of the image
        // that the user gave it, the timestamp for when it was
        // uploaded, and then the download URL to fetch it
        await addDoc(collection(db, "image_names"), {
          user: userEmail,
          image_title: imageTitle,
          timeStamp: serverTimestamp(),
          image_link: downloadURL,
        });

        // Reset input fields
        setImageTitle("");
        setFile(null);
      }
    );
  };

  useEffect(() => {
    // Make sure we have the users email,
    // if we even have a current authorized user
    const userEmail = auth.currentUser?.email;

    // Fetch images uploaded by the user using firebase
    // query. This gets your images based on the email,
    // then fetches the correct snapshots in the storage unit
    // and puts them in the yourImages array
    if (userEmail) {
      const userImagesQuery = query(
        collection(db, "image_names"),
        where("user", "==", userEmail)
      );
      onSnapshot(userImagesQuery, (snapshot) => {
        const images = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setYourImages(images);
      });
    }

    // This one just gets all the images in the collection,
    // and puts them in the allImages array without needing
    // to worry about who uploaded them
    const allImagesQuery = collection(db, "image_names");
    onSnapshot(allImagesQuery, (snapshot) => {
      const images = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllImages(images);
    });
  }, []);

  return (
    <div className="user">
      <h1>Upload an Image</h1>
      <form onSubmit={handleAdd}>
        <input
          placeholder="What is your picture of?"
          value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Submit</button>
      </form>

      <h2>Your Images</h2>
      <div className="image-gallery">
        {yourImages.map((image) => (
          <div key={image.id}>
            <h3>{image.image_title}</h3>
            <img
              src={image.image_link}
              alt={image.image_title}
              style={{ width: "100px" }}
            />
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "200px" }}>All Images</h2>
      <div className="image-gallery">
        {allImages.map((image) => (
          <div key={image.id}>
            <h3>{image.image_title}</h3>
            <img
              src={image.image_link}
              alt={image.image_title}
              style={{ width: "100px" }}
            />
            <p>Uploaded by: {image.user}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
