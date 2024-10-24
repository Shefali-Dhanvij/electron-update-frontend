import logo from "./logo.svg";
import "./App.css";
import Users from "./user";
import { useState, useEffect } from "react";
import axios from "axios";

const GITHUB_REPO_URL =
  "https://api.github.com/repos/Shefali-Dhanvij/electron-update-frontend/commits/main";

function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [latestCommitInfo, setLatestCommitInfo] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");

  console.log("upadte message--", updateMessage);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await axios.get(GITHUB_REPO_URL);
        const latestCommit = response.data;
        const commitHash = latestCommit.sha;
        const commitMessage = latestCommit.commit.message;

        console.log("Latest Commit Hash:", commitHash);
        console.log("Latest Commit Message:", commitMessage);

        // Logic to determine if an update is available
        // For demo purposes, we assume there's always an update
        setLatestCommitInfo({ commitHash, commitMessage });
        setUpdateAvailable(true);
      } catch (error) {
        console.error("Error checking for updates:", error.message);
      }
    };

    checkForUpdates();
  }, []);

  // Handle update confirmation
  const handleUpdateConfirmation = () => {
    // Logic to handle the update (this could be a redirect or other action)
    setUpdateMessage("Update completed! The app will restart.");
    // Reset update available status
    setUpdateAvailable(false);
  };

  return (
    <div className="App">
      {updateAvailable && (
        <div className="update-modal">
          <p>
            A new update is available!
            <br />
            Commit: {latestCommitInfo.commitHash}
            <br />
            Message: {latestCommitInfo.commitMessage}
          </p>
          <button onClick={handleUpdateConfirmation}>Update Now</button>
        </div>
      )}

      {/* Display update message after confirmation */}
      {updateMessage && <div className="update-message">{updateMessage}</div>}

      <Users />
    </div>
  );
}

export default App;
