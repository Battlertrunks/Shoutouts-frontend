import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import QueryStringParams from "../Models/QueryStringParams";
import Shoutout from "../Models/Shoutout";
import {
  addShoutout,
  deleteShoutout,
  getShoutouts,
} from "../services/ShoutoutService";
import "./ShoutoutByNameRouter.css";
import ShoutoutCard from "./ShoutoutCard";
import ShoutoutForm from "./ShoutoutForm";

const ShoutoutByNameRouter = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const name: string | undefined = useParams().name;

  const getAndSetShoutouts = (params: QueryStringParams): void => {
    getShoutouts(params).then((response) => setShoutouts(response));
  };

  const deleteShoutoutPost = (id: string): void => {
    deleteShoutout(id).then(() => getAndSetShoutouts({ to: name }));
  };

  const addShoutoutPost = (shoutoutToAdd: Shoutout): void => {
    addShoutout(shoutoutToAdd).then(() => {
      getAndSetShoutouts({ to: name });
    });
  };

  useEffect(() => {
    getAndSetShoutouts({ to: name });
  }, [name]);

  return (
    <div className="ShoutoutByNameRouter">
      <h2>Shoutouts by {name}</h2>
      <Link to="/">Back to All Shoutouts</Link>
      <ul>
        {shoutouts.map((post) => (
          <ShoutoutCard
            onShow={post}
            onDelete={deleteShoutoutPost}
            key={post._id}
          />
        ))}
      </ul>
      <ShoutoutForm onAdd={addShoutoutPost} name={name!} />
    </div>
  );
};

export default ShoutoutByNameRouter;
