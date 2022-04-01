import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../context/authContext";
import Shoutout from "../Models/Shoutout";
import { deleteShoutout, getShoutouts } from "../services/ShoutoutService";
import "./MeRoute.css";
import ShoutoutCard from "./ShoutoutCard";

const MeRoute = () => {
  const { user } = useContext(AuthContext);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const navigate = useNavigate();

  const deleteShoutoutHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getShoutouts({ me: user?.displayName! }).then((response) => {
        setShoutouts(response);
      });
    });
  };

  useEffect(() => {
    if (user) {
      getShoutouts({ me: user.displayName! }).then((response) => {
        setShoutouts(response);
      });
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="MeRoute">
      <ul>
        {shoutouts.map((shoutout) => (
          <ShoutoutCard
            onShow={shoutout}
            onDelete={deleteShoutoutHandler}
            key={shoutout._id}
          />
        ))}
      </ul>
    </div>
  );
};

export default MeRoute;
