import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={1044}
    height={1044}
    overflow="hidden"
    {...props}
  >
    <defs>
      <clipPath id="a">
        <path d="M2914 1316h1044v1044H2914z" />
      </clipPath>
    </defs>
    <g clipPath="url(#a)" transform="translate(-2914 -1316)">
      <path
        fill="#ED7D31"
        stroke="#AE5A21"
        strokeMiterlimit={8}
        strokeWidth={4.583}
        d="M2916.5 1318.5h1039v1039h-1039z"
      />
    </g>
  </svg>
)
export default SvgComponent