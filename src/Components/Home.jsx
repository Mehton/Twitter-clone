import { useState, useEffect } from "react";
import supabase from "../client";
import "./Home.css";

const Home = () => {
  const [tweetContent, setTweetContent] = useState("");
  const [tweets, setTweets] = useState([]); // Store tweets in state
  const [isLoading, setIsLoading] = useState(false);

  // Fetch tweets from the Supabase database when the component mounts
  const fetchTweets = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("Twitter-clone") // Ensure the table name is correct
      .select("id, post, firstname, created_at")
      .order("created_at", { ascending: false }); // Latest tweets first

    if (error) {
      console.error("Error fetching tweets:", error);
    } else {
      setTweets(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTweets(); // Fetch tweets when the page loads
  }, []);

  // Handle input change in the tweet box
  const handleTweetChange = (e) => {
    setTweetContent(e.target.value);
  };

  // Handle posting a new tweet
  const handlePostTweet = async (e) => {
    e.preventDefault();

    if (!tweetContent.trim()) return;

    // try {
    //   const { user, error: userError } = await supabase.auth.getUser();
    //   if (userError) throw userError; // Handle error getting the user

    // Insert the new tweet into Supabase table
    const { data, error } = await supabase
      .from("Twitter-clone")
      .insert([
        {
          post: tweets.post,
          id: tweets.id, // User ID from Supabase Auth
        },
      ])
      .single(); // Ensure only one tweet is inserted

    if (error) {
      console.error("Error posting tweet:", error);
    } else {
      setTweets([data, ...tweets]); // Add the new tweet to the front of the feed
      setTweetContent(""); // Clear the tweet box after posting
    }
    // } catch (error) {
    //   console.error("Error handling post tweet:", error);
    // }
  };

  return (
    <div className="home-container">
      <div className="navbar">
        {/* Navbar Content (Logo, Links, Profile Picture, etc.) */}
        <img
          src="twitter-logo.png"
          alt="Twitter"
          style={{ height: 80, width: 80 }}
        />
        <h3>Twitter Clone</h3>
      </div>

      {/* Tweet Box */}
      <div className="tweet-box">
        <textarea
          placeholder="What's happening?"
          value={tweetContent}
          onChange={handleTweetChange}
        />
        <br />
        <button onClick={handlePostTweet} disabled={isLoading}>
          {isLoading ? "Posting..." : "Tweet"}
        </button>
      </div>

      {/* Feed */}
      <div className="feed">
        {tweets.length === 0 ? (
          <p>No tweets yet!</p>
        ) : (
          tweets.map((tweet) => (
            <div className="tweet" key={tweet.id}>
              <h4>{tweet.id}</h4> {/* Replace with actual user data */}
              <p>{tweet.post}</p>
              <div className="actions">
                <button>Like</button>
                <button>Retweet</button>
                <button>Reply</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
