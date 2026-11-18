export type Track = {
  title: string;
  file: string;
  /** One or two sentences: what the piece was written for and the feeling it aims at. */
  description?: string;
  /** Slug of the project in src/data/projects.tsx this piece belongs to, if any. */
  projectSlug?: string;
  hidden?: boolean;
};
