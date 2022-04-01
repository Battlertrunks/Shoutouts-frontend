import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuthContext from "../context/authContext";
import { signInWithGoogle } from "../firebaseConfig";
import QueryStringParams from "../Models/QueryStringParams";
import Shoutout from "../Models/Shoutout";
import {
  addShoutout,
  deleteAllShoutouts,
  deleteShoutout,
  getShoutouts,
} from "../services/ShoutoutService";
import "./MainPageRoute.css";
import ShoutoutCard from "./ShoutoutCard";
import ShoutoutForm from "./ShoutoutForm";

const MainPageRouter = () => {
  const [shoutoutPost, setShoutoutPose] = useState<Shoutout[]>([]);

  const { user } = useContext(AuthContext);

  const [searchParams] = useSearchParams();
  const to: string | null = searchParams.get("to");

  const queryStringParams: QueryStringParams = {
    ...(to ? { to } : {}),
  };

  const getAndSetShoutouts = (params: QueryStringParams): void => {
    getShoutouts(params).then((response) => setShoutoutPose(response));
  };

  const addShoutoutPost = (shoutoutToAdd: Shoutout): void => {
    addShoutout(shoutoutToAdd).then(() =>
      getAndSetShoutouts(queryStringParams)
    );
  };

  const deleteShoutoutPost = (id: string): void => {
    deleteShoutout(id).then(() => getAndSetShoutouts(queryStringParams));
  };

  const deleteAllShoutoutPost = (): void => {
    deleteAllShoutouts().then(() => getAndSetShoutouts(queryStringParams));
  };

  useEffect(() => {
    getAndSetShoutouts(queryStringParams);
  }, [to, queryStringParams]);

  return (
    <div className="MainPageRouter">
      <h2>All Shoutouts</h2>
      <button
        className="delete-all-btn"
        onClick={() => deleteAllShoutoutPost()}
      >
        Delete All Shoutouts
      </button>
      <ul>
        {shoutoutPost.map((post) => (
          <ShoutoutCard
            onShow={post}
            onDelete={deleteShoutoutPost}
            key={post._id}
          />
        ))}
      </ul>
      {user ? (
        <ShoutoutForm onAdd={addShoutoutPost} name={""} />
      ) : (
        <div>
          <p>Sign In to leave a shoutout.</p>
          <button onClick={signInWithGoogle}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default MainPageRouter;
