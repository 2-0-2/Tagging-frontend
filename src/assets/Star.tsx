import { SVGProps } from "react";

const Star = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="195"
      height="195"
      viewBox="0 0 195 195"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M94.8981 2.31135C95.2641 -0.77045 99.736 -0.77045 100.102 2.31135L103.17 28.1649C107.131 61.5487 133.451 87.8693 166.835 91.8304L192.688 94.8981C195.771 95.2641 195.771 99.736 192.688 100.102L166.835 103.17C133.451 107.131 107.131 133.451 103.17 166.835L100.102 192.688C99.736 195.771 95.2641 195.771 94.8981 192.688L91.8304 166.835C87.8693 133.451 61.5487 107.131 28.1649 103.17L2.31135 100.102C-0.77045 99.736 -0.77045 95.2641 2.31135 94.8981L28.1649 91.8304C61.5487 87.8693 87.8693 61.5487 91.8304 28.1649L94.8981 2.31135Z"
        fill="#F2994A"
      />
    </svg>
  );
};

export default Star;