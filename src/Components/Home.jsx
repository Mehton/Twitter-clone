import { useState } from "react";
import "./Home.css";
// import SignUpPage from "./SignUp";

const Home = () => {
  const [tweetContent, setTweetContent] = useState("");

  const handleTweetChange = (e) => {
    setTweetContent(e.target.value);
  };

  const handlePostTweet = (e) => {
    e.preventDefault();
    if (tweetContent) {
      console.log("New Tweet: ", tweetContent);
      setTweetContent(""); // Reset after posting
    }
  };

  return (
    <>
      <div className="home-container">
        <div className="navbar">
          {/* Navbar Content (Logo, Links, Profile Picture, etc.) */}
          <h3>Twitter Clone</h3>
        </div>

        <div className="tweet-box">
          <textarea
            placeholder="What's happening?"
            value={tweetContent}
            onChange={handleTweetChange}
          />
          <button onClick={handlePostTweet}>Tweet</button>
        </div>

        <div className="feed">
          {/* Map through the tweets here */}
          <div className="tweet">
            <h4>User Name</h4>
            <p>Tweet Content...</p>
            <div className="actions">
              <button>Like</button>
              <button>Retweet</button>
              <button>Reply</button>
            </div>
          </div>
        </div>
      </div>
      {/* <SignUpPage /> */}
    </>
  );
};

export default Home;
