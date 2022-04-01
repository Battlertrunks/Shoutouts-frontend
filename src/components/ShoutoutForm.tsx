import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FormEvent, useContext, useRef, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import AuthContext from "../context/authContext";
import { storage } from "../firebaseConfig";
import Shoutout from "../Models/Shoutout";
import "./ShoutoutForm.css";

interface Props {
  onAdd: (shoutoutPostToAdd: Shoutout) => void;
  name: string;
}

const ShoutoutForm = ({ onAdd, name }: Props) => {
  //   const [searchParams] = useSearchParams();
  //   const toParam: string | null = searchParams.get("to");

  const { user } = useContext(AuthContext);

  const [to, setTo] = useState(name); //toParam ? toParam : ""
  const [from, setFrom] = useState(user?.displayName || "Anonymous");
  const [message, setMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  //   useEffect(() => {
  //     setTo(toParam ? toParam : "");
  //     setFrom("");
  //     setMessage("");
  //   }, [toParam]);

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();

    const shoutout: Shoutout = {
      to,
      from,
      text: message,
      ...(user?.photoURL ? { avatar: user.photoURL } : {}),
    };

    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0];
      const storageRef = ref(storage, file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          shoutout.image = url;
          onAdd(shoutout);
        });
      });
    } else {
      onAdd(shoutout);
    }

    setTo("");
    setFrom("");
    setMessage("");
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} className="ShoutoutForm" onSubmit={submitHandler}>
      <h3>Leave a Shout Out</h3>
      <label htmlFor="to">To</label>
      <input
        type="text"
        name="to"
        id="to"
        value={to}
        required
        onChange={(e) => setTo(e.target.value)}
      />
      <label htmlFor="from">From</label>
      <input
        type="text"
        name="from"
        id="from"
        value={from}
        disabled
        required
        onChange={(e) => setFrom(e.target.value)}
      />
      <label htmlFor="message">Shout Out</label>
      <textarea
        name="message"
        id="message"
        value={message}
        required
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <input ref={fileInputRef} type="file" name="" id="" />
      <button>Submit Shout Out!</button>
    </form>
  );
};

export default ShoutoutForm;
