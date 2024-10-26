import logo from "./logo.svg";
import "./App.css";
import Users from "./user";
import { useState, useEffect } from "react";
import axios from "axios";

const GITHUB_REPO_URL =
  "https://api.github.com/repos/Shefali-Dhanvij/electron-updater/commits/main";

function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [latestCommitInfo, setLatestCommitInfo] = useState({});
  const [latestCommitHash, setLatestCommitHash] = useState(""); // Store the latest commit hash locally
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await axios.get(GITHUB_REPO_URL);
        const latestCommit = response.data;
        const commitHash = latestCommit.sha;
        const commitMessage = latestCommit.commit.message;

        // Check if the commit hash is different from the last checked one
        if (latestCommitHash !== commitHash) {
          setLatestCommitInfo({ commitHash, commitMessage });
          setUpdateAvailable(true);
          setLatestCommitHash(commitHash); // Update the latest commit hash
        }
      } catch (error) {
        console.error("Error checking for updates:", error.message);
      }
    };

    checkForUpdates();
  }, [latestCommitHash]); // Dependency on latestCommitHash to check for new updates

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
