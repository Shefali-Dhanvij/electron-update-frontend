import logo from "./logo.svg";
import "./App.css";
import Users from "./user";
import { useState, useEffect } from "react";
import axios from "axios";

const repositoryOwner = "Shefali-Dhanvij"; // Your GitHub username
const repositoryName = "electron-update-frontend"; // Your repository name
const branch = "main";

function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [latestCommitInfo, setLatestCommitInfo] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/commits/${branch}`
        );
        const latestCommit = response.data;

        const commitHash = latestCommit.sha;
        const commitMessage = latestCommit.commit.message;

        setLatestCommitInfo({ commitHash, commitMessage });
        setUpdateAvailable(true); // Show notification when update is available
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    };

    // Call the function on component mount
    checkForUpdates();
  }, []);

  const handleUpdateConfirmation = () => {
    setUpdateMessage(
      `Update available! Commit: ${latestCommitInfo.commitHash} - ${latestCommitInfo.commitMessage}`
    );
    // Here, you could implement additional logic to handle the update
  };

  {
    updateMessage && <div className="update-message">{updateMessage}</div>;
  }

  {
    /* If an update is available, show a modal */
  }
  {
    updateAvailable && (
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
    );
  }

  return (
    <div className="App">
      <Users />
    </div>
  );
}

export default App;
