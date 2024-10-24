import logo from "./logo.svg";
import "./App.css";
import Users from "./user";
import { useState, useEffect } from "react";
import axios from "axios";

const GITHUB_REPO_URL =
  "https://api.github.com/repos/Shefali-Dhanvij/electron-update-frontend/commits/main"; // Adjust your repo URL
const GITHUB_TOKEN =
  "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";

function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [latestCommitInfo, setLatestCommitInfo] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await axios.get(GITHUB_REPO_URL, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`, // Use your token for authentication
          },
        });

        const latestCommit = response.data;
        const commitHash = latestCommit.sha;
        const commitMessage = latestCommit.commit.message;

        // Here you can check if the current version is different from the latest commit version
        // For simplicity, let's assume you always consider it as an update.
        setLatestCommitInfo({ commitHash, commitMessage });
        setUpdateAvailable(true);
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    };

    checkForUpdates();
  }, []);

  const handleUpdateConfirmation = () => {
    // Logic for handling update confirmation (e.g., pull the latest code)
    setUpdateAvailable(false);
    setUpdateMessage(
      `Update completed! Commit: ${latestCommitInfo.commitHash}`
    );
  };

  return (
    <div className="App">
      {updateMessage && <div className="update-message">{updateMessage}</div>}

      {updateAvailable && (
        <div className="update-modal">
          <p>
            A new update is available!
            <br />
            Commit: {latestCommitInfo.commitHash}
            <br />
            Message: {latestCommitInfo.commitMessage}
          </p>
          <button onClick={handleUpdateConfirmation}>Update Now==</button>
        </div>
      )}
      <Users />
    </div>
  );
}

export default App;
