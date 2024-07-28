const ServerDown = () => {
  return (
    <div className="w-10/12 md:w-1/2 flex flex-col justify-center mx-auto text-red-600">
      <h1 className="text-center">
        Sorry for the inconvenience, we've hit the limits of Gemini API quota,
        we'll be back soon, once it's fixed. Please come back after some time.
      </h1>
      <h1 className="text-center">Thank you for your patience!!</h1>
    </div>
  );
};

export default ServerDown;
