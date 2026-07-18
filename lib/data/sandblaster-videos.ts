export type SandblasterYouTubeVideo = {
  id: string;
  startSeconds?: number;
  titleKey: "0" | "1" | "2";
};

export const sandblasterYouTubeVideos: SandblasterYouTubeVideo[] = [
  { id: "mW31jh9PMO4", startSeconds: 22, titleKey: "0" },
  { id: "ywS0DvZz7xA", startSeconds: 17, titleKey: "1" },
  { id: "bWD4L2zTlxk", titleKey: "2" },
];

export function getYouTubeEmbedUrl(video: SandblasterYouTubeVideo): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });

  if (video.startSeconds) {
    params.set("start", String(video.startSeconds));
  }

  return `https://www.youtube.com/embed/${video.id}?${params.toString()}`;
}
