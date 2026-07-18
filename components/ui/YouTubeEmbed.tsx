import { getYouTubeEmbedUrl, type SandblasterYouTubeVideo } from "@/lib/data/sandblaster-videos";

type YouTubeEmbedProps = {
  video: SandblasterYouTubeVideo;
  title: string;
  className?: string;
};

export function YouTubeEmbed({ video, title, className }: YouTubeEmbedProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-black/30 ring-1 ring-white/10 ${className ?? ""}`}
    >
      <div className="relative aspect-video">
        <iframe
          src={getYouTubeEmbedUrl(video)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
