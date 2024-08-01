const Footer = () => {
  return (
    <div className="h-1/6 flex flex-col">
      {/* <div className="flex justify-center items-center gap-2 mb-2 mt-auto">
        <a href="https://github.com/Ajeet1606/roast-github">
          <img src="/github.png" alt="github logo" className="w-6 mb-2" />
        </a>
        <a href="https://twitter.com/iampatelajeet">
          <img src="/twitter.png" alt="" className="w-5" />
        </a>
      </div> */}
      <h1 className="text-center text-sm mb-3 mt-auto">
        Handcrafted in India with ❤️ by{" "}
        <span className="font-bold">
          <a href="https://twitter.com/iampatelajeet">Ajeet Patel</a>
        </span>
      </h1>
    </div>
  );
};

export default Footer;
