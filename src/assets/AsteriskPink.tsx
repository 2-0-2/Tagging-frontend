import { SVGProps } from "react";

const AsteriskPink = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="145"
      height="142"
      viewBox="0 0 145 142"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.2897 71L0 54.1299L21.5882 16.8702L50.895 33.7111L50.9115 0H94.0885L94.105 33.7111L123.412 16.8702L145 54.1299L115.71 71L145 87.8701L123.412 125.13L94.105 108.289L94.0885 142H50.9115L50.895 108.289L21.5882 125.13L0 87.8701L29.2897 71Z"
        fill="#F8B3B8"
      />
    </svg>
  );
};

export default AsteriskPink;
