export function LogoMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 398 398"
      fill="none"
      {...props}
    >
      <rect width="398" height="398" fill="#111827" rx="88" />
      <path
        fill="#01A7E1"
        d="M84 106h230l-39 82H123l-39-82Z"
      />
      <path
        fill="#FFA631"
        d="M140 205h118l-59 124-59-124Z"
      />
      <path
        fill="#fff"
        d="M164 132h70l-13 28h-44l-13-28Z"
        opacity=".92"
      />
    </svg>
  );
}
