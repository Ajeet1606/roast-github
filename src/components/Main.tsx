import { useState } from "react";
import { toPng } from "html-to-image";

const Main = () => {
  const [inputUserName, setInputUserName] = useState<string>("");
  const [roastMessage, setRoastMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [avtarUrl, setAvtarUrl] = useState<string>("");

  console.log("Hello, World!", avtarUrl);

  console.log("Hello, World!", loading);

  async function getRoastMessage(e: any) {
    e.preventDefault();
    if (inputUserName === "") {
      setErrorMessage("Please enter a username.");
      setRoastMessage("");
      return;
    }
    const trimmedInput = inputUserName.trim();
    //https://roast-github.up.railway.app
    const URL = "https://roast-github.up.railway.app/api/v1/roast/" + trimmedInput;

    setErrorMessage("");
    setRoastMessage("");
    setLoading(true);
    setAvtarUrl("");
    try {
      const eventSource = new EventSource(URL);
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "image") {
          setAvtarUrl(data.url);
        } else if (data.type === "roast") {
          setRoastMessage((prevMessages) => prevMessages + data.content);
        } else if(data.type === 'error'){
          setErrorMessage(data.content);
        }
        else if (data.type === "end") {
          eventSource.close();
          setLoading(false);
        }
      };
      eventSource.onerror = (err) => {
        if (err.eventPhase === EventSource.CLOSED) {
          fetch(URL)
            .then(async (response) => {
              // Check if the response status is not OK (i.e., status code is not in the range 200-299)
              if (!response.ok) {
                // If the response is not OK, read the response body as text
                const text = await response.text();
                // Throw an error with the response text
                throw new Error(text);
              }
              // If the response is OK, read the response body as text and return it
              return response.text();
            })
            .then((message) => {
              // Handle the successful response text
              console.log("Successful response:", message);
              // Optionally update your state with the successful message
              setErrorMessage(message);
            })
            .catch((error) => {
              // Handle any errors that were thrown
              console.error("Error fetching fallback response:", error);
              setErrorMessage(error.message); // Set the error message in the state
            })
            .finally(() => setLoading(false));
        }
        eventSource.close();
        setLoading(false);
        console.error("EventSource failed:", err);
      };
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
      setRoastMessage("");
      setLoading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInputUserName(e.target.value);
  }

  async function downloadImage() {
    setDownloading(true);
    try {
      const dataUrl = await toPng(document.body, { quality: 1 });

      // Create a link element and trigger a download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `roast-${inputUserName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(false);
    } catch (error) {
      console.log(error);
      setDownloading(false);
    }
  }

  return (
    <div className="w-10/12 md:w-1/2 flex flex-col justify-center mx-auto">
      <form action="" className="w-full" onSubmit={getRoastMessage}>
        <div className="w-full flex flex-col">
          <input
            type="text"
            placeholder="Enter Your GitHub username"
            className="w-full rounded-md p-2 mb-4 border-white outline-none text-center"
            onChange={handleInputChange}
          />
          <button
            className={`w-full rounded-md p-2 border ${
              loading ? "text-gray-400 border-gray-400" : "border-white"
            }`}
            type="submit"
            disabled={loading}
          >
            Get Roasted
          </button>
        </div>
      </form>

      <div className="w-full mt-4">
        {roastMessage === "Github Profile not found." ? (
          <p className="text-center text-red-500">{roastMessage}</p>
        ) : (
          <div>
            <img
              src={avtarUrl}
              alt="profile-avatar"
              className={`${
                avtarUrl === "" ? "w-0 h-0" : "w-10 h-10 mr-3 mb-3 rounded-full float-left"
              }`}
            />
            <p className="text-base leading-relaxed">{roastMessage}</p>
          </div>
        )}

        {errorMessage && (
          <p className="text-center text-red-500">{errorMessage}</p>
        )}

        {errorMessage === "" &&
          roastMessage != "" &&
          roastMessage != "Github Profile not found." && (
            <div className="mt-2 w-full flex justify-center items-center">
              <button
                className={`mt-2 rounded-md p-2 border mx-auto ${
                  downloading
                    ? "text-gray-400 border-gray-400"
                    : "border-green-400 text-green-400"
                }`}
                onClick={downloadImage}
                disabled={downloading}
              >
                Download Image
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Main;
