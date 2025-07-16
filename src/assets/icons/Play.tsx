export const PlayIcon = ({
  size = 24,
}: {
  size?: number | string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-play-icon lucide-play"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
};
