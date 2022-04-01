import { useContext } from "react";
import { Link } from "react-router-dom";
// import { Link, useParams, useSearchParams } from "react-router-dom";
import AuthContext from "../context/authContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";

const Header = () => {
  //   const [searchParams] = useSearchParams();
  //   const toParam: string | null = searchParams.get("name");

  //   let toParam: string | undefined = useParams().name;
  //   const [name, setName] = useState<string | undefined>(toParam);
  //   useEffect(() => {}, [name]);

  const { user } = useContext(AuthContext);

  return (
    <header className="Header">
      {/* {name ? (
        <React.Fragment>
          <h1>Shout Outs for {toParam}</h1> */}
      {/* <Link className="link" to="/">
            Back To All Shoutouts
          </Link> */}
      {/* </React.Fragment>
      ) : ( */}
      <h1>Shoutouts</h1>
      <Link to="/me">Me</Link>
      {user ? (
        <div>
          <p>{user.displayName}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign In</button>
      )}
      {/* )} */}
    </header>
  );
};

export default Header;
