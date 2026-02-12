import { ImgHTMLAttributes } from "react";

export default function Image({
  alt,
  priority,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) {
  return <img alt={alt} {...props} loading={priority ? "eager" : "lazy"} />;
}
