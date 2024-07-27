import { useState } from "react";
import { ProfileSchema, getProfileDetails } from "../utils/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Main = () => {
  const [inputUserName, setInputUserName] = useState("");
  const [roastMessage, setRoastMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function getRoastMessage(e: any) {
    e.preventDefault();
    if (inputUserName === "") {
      setErrorMessage("Please enter a username.");
      setRoastMessage("");
      return;
    }
    const userDetails: ProfileSchema = await getProfileDetails(inputUserName);

    if (!userDetails) {
      setErrorMessage(`Github Profile not found.`);
      setRoastMessage("");
      return;
    }

    const prompt = `Here's a GitHub profile for you:
            - Name: ${userDetails.name}
            - Bio: ${userDetails.bio}
            - Avatar URL: ${userDetails.avatarUrl}
            - Repositories: ${userDetails.repositories.totalCount}
            - Followers: ${userDetails.followers.totalCount}
            - Following: ${userDetails.following.totalCount}
            - Starred Repositories: ${userDetails.starredRepositories.totalCount}
            - Total Commits: ${userDetails.contributionsCollection.totalCommitContributions} in this year.
        
            Go ahead and give a satire roast of this GitHub user! Keep it in around 100 words. If they've done really great, appreaciate them as well.`;
    return await getRoastResponse(prompt);
  }

  async function getRoastResponse(prompt: string) {
    try {
      setRoastMessage("Loading...");
      setErrorMessage("");
      const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY!;
      const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL!;
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: GEMINI_MODEL,
        systemInstruction: "Act as a satire and sarcastic person.",
      });

      const result = await model.generateContentStream(prompt);
      setRoastMessage("");
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        setRoastMessage((prevData) => prevData + chunkText);
      }
    } catch (error) {
      //   console.error("Error calling Gemini API:", error);
      setErrorMessage("An error occurred. Please try again later.");
      return error;
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInputUserName(e.target.value);
  }

  return (
    <div className="w-10/12 md:w-1/2 flex flex-col justify-center mx-auto">
      <form action="" className="w-full" onSubmit={getRoastMessage}>
        <div className="w-full flex flex-col">
          <input
            type="text"
            placeholder="Enter Your GitHub username"
            className="w-full rounded-md p-2 mb-4 border-white outline-none"
            onChange={handleInputChange}
          />
          <button
            className="w-full rounded-md p-2 border border-white"
            type="submit"
          >
            Get Roasted
          </button>
        </div>
      </form>

      <div className="w-full mt-4">
        <p className="text-center">{roastMessage}</p>
        {
          errorMessage && <p className="text-center text-red-500">{errorMessage}</p>
        }
      </div>
    </div>
  );
};

export default Main;
