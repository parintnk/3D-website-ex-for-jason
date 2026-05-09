export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 188 48"
      fill="none"
      {...props}
    >
      <rect width="48" height="48" fill="#111827" rx="10" />
      <path
        fill="#01A7E1"
        d="M11 13h26l-3.7 7.6H14.7L11 13Z"
      />
      <path
        fill="#FFA631"
        d="M17.7 21.9h12.6L24 35.8l-6.3-13.9Z"
      />
      <text
        x="60"
        y="33"
        fill="#01A7E1"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="29"
        fontWeight="800"
        letterSpacing="0"
      >
        Vapor
      </text>
    </svg>
  );
}
