import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCVhMRFJJt-oXk5Ru31oQMGERgWfb61d2w",
    authDomain: "facebook-clone-b3d11.firebaseapp.com",
    projectId: "facebook-clone-b3d11",
    storageBucket: "facebook-clone-b3d11.appspot.com",
    messagingSenderId: "4066404674",
    appId: "1:4066404674:web:c11fbba43ff2d43e3080db"
}

// initialize firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;