# Roast Github

It's a fun and interactive tool that fetches GitHub profile details based on a user's GitHub username and then generates a roast message using the Gemini API. The roast message is streamed as a response, adding a touch of humor to your experience.


## Tech Stack 🚀

- ReactJS
- Tailwind CSS
- Github API for getting the profile details
- Gemini API for generating the roast message

## Features ⭐
- Fetches GitHub profile details using the GitHub API.
- Generates a roast message with the Gemini API.
- Streams the roast message for an interactive experience.

## Installation 🛠️
To get started with RoastGithub, follow these steps:

### Prerequisites
- Node.js: Ensure that you have Node.js installed. You can download it from nodejs.org.
- pnpm: A package manager to install dependencies.

## Clone the Repository
```
git clone https://github.com/Ajeet1606/roast-github.git
cd roast-github
```

## Install Dependencies
```
pnpm install
```

## Configuration ⚙️
Before running the application, you need to configure the environment variables:

Create a .env file in the root of the project directory.
Add your GitHub API token and Gemini API key to the .env file:
```
VITE_GITHUB_TOKEN=
VITE_GITHUB_GRAPHQL_API=https://api.github.com/graphql
VITE_GEMINI_API_KEY=
VITE_GEMINI_MODEL=gemini-1.5-flash
```

Once you have installed the dependencies and configured the environment variables, you can start the application using the following command:
```
pnpm dev
```

## Contributing 🤝
We welcome contributions to RoastGithub! If you would like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and ensure that they are well-tested.
4. Submit a pull request with a clear description of your changes.

## Acknowledgments 🙏
- GitHub API
- Gemini API