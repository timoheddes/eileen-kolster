import './PlayPauseButton.css';

const PlayPauseButton = ({
  status,
  onClick,
}: {
  status: string;
  onClick: () => void;
}) => {
  return (
    <button className="play-button" onClick={onClick}>
      <svg
        id="playIcon"
        style={{ display: status === 'playing' ? 'none' : 'block' }}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 5.13989V18.8601L19 12L8 5.13989Z"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <svg
        id="pauseIcon"
        style={{ display: status === 'playing' ? 'block' : 'none' }}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 4H6V20H10V4Z"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M18 4H14V20H18V4Z"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </button>
  );
};

export default PlayPauseButton;
