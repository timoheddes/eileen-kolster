const Contact = () => {
  return (
    <div className="flex-center">
      <div className="gradient-border column p-1">
        <p className="flex-center-align">
          Instagram:
          <a
            href="https://www.instagram.com/eileenkolster/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @eileenkolster
          </a>
        </p>
      </div>
      <div className="gradient-border column p-1">
        {/* <h2>Get in touch</h2> */}
        <p className="flex-center-align">
          Email:
          <a href="mailto:eileen@eileen.kolster@gmail.com">
            eileen.kolster@gmail.com
          </a>
        </p>
        <p className="flex-center-align">
          Soundcloud:
          <a
            href="https://soundcloud.com/ai-ling-kolster"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eileen Kolster
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
