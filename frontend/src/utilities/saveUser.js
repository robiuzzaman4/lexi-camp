import axios from "axios";

const saveUser = (user) => {
    const currentUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "student"
    }

    axios.post(`https://lexi-camp-server.vercel.app/users`, currentUser)
        .then((res) => {
            res.data;
        })
};

export default saveUser;