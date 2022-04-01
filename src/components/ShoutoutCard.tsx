import { Link } from "react-router-dom";
import Shoutout from "../Models/Shoutout";
import "./ShoutoutCard.css";

interface Props {
  onShow: Shoutout;
  onDelete: (id: string) => void;
}

const ShoutoutCard = ({ onShow, onDelete }: Props) => {
  return (
    <li className="ShoutoutCard">
      <h2>
        Shout out to{" "}
        <Link className="link" to={`/user/${onShow.to}`}>
          {onShow?.to}
        </Link>
      </h2>

      <p className="from">
        - from <img src={onShow.avatar} alt="avatar" />{" "}
        <Link className="link" to={`/user/${onShow.from}`}>
          {onShow?.from}
        </Link>
      </p>
      <p className="message">{onShow?.text}</p>
      <img className="uploaded-img" src={onShow.image} alt="" />
      <button onClick={() => onDelete(onShow?._id!)}>Delete</button>
    </li>
  );
};

export default ShoutoutCard;
