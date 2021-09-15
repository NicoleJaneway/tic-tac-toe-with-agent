import {Link} from "react-router-dom";
import "./styles.css";

export default function Home(){
    const now = new Date();

    function handleTime(sometime) {
        const hours = sometime.getHours()
        if (hours < 5)
           return "Good evening!"
        else if (hours < 12)
          return "Good morning!"
        else if (hours < 17) 
          return "Good afternoon!"
        else if (hours < 25)
          return "Good evening!"
        else 
          return ""
      }

    return <div className="home">
        <p>{handleTime(now)}</p>
        <p>Welcome to tic-tac-toe</p>
        <Link to="/one-player">
            <button>One player</button>
        </Link>
        <span> </span>
        <Link to="/two-player">
            <button>Two players</button>
        </Link>
        <p class="note">Note: one player will allow you to play against the computer, while two player will allow you to play against yourself or a friend</p>
    </div>
}