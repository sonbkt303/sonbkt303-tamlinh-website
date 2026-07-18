import { MDXRemote } from "next-mdx-remote/rsc";

type MarkdownContentProps = {
  source: string;
  className?: string;
};

export function MarkdownContent({ source, className = "" }: MarkdownContentProps) {
  return (
    <div className={`prose prose-lg max-w-none text-gray-700 ${className}`}>
      <MDXRemote source={source} />
    </div>
  );
}
