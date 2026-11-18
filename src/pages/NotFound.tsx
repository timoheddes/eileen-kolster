import Button from '../components/Button/Button';

const NotFound = () => {
  return (
    <section id="not-found">
      <title>Page not found | Eileen Kolster</title>
      <meta name="robots" content="noindex" />
      <h2>This page has wandered off</h2>
      <p className="font-size-1-2">
        The page you are looking for does not exist.
      </p>
      <div className="font-size-1-5 flex gap-1 mt-1">
        <Button href="/work">See my work</Button>
        <Button href="/" variant="secondary">
          Home
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
