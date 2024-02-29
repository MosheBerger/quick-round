import React from "react";

function HeartIcon({amount, color=true, ...props}) {


  return (
    <svg {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="73.309"
      height="67.766"
      viewBox="280.454 94.861 73.309 67.766"
    >
      <g>
        <path
          fill={color ?"#db0a28" : '#520f11'}
          d="M64.8 120.71c3.68 0 32.11-24.18 48.7-44.07 15.96-19.14 10.2-41.74 6.69-48.03-4.15-7.43-56.94 17.01-56.94 17.01S14.07 17.99 10.39 23.99C5.4 32.13-1.59 53.54 12.52 73.45 27.5 94.6 60.85 120.71 64.8 120.71z"
          transform="matrix(.61107 0 0 .6044 277.898 89.67)"
        ></path>
        <path
          fill= {color ?"#ff262e" : '#750717'}
          d="M64.55 114.2s52.26-38.68 56.75-62.3c4.25-22.37-4.45-33.22-15.16-38.45C78.99.19 65.29 26.21 64 26.21S49.95.14 23.7 11.42C9.24 17.63 3.18 34.53 8.91 53.57c8.41 27.94 55.64 60.63 55.64 60.63z"
          transform="matrix(.61107 0 0 .6044 277.898 89.67)"
        ></path>
      </g>
      <text
        style={{ lineHeight: 29.0113, whiteSpace: "pre" }}
        x="213.519"
        y="164.825"
        fill="#FF262E"
        stroke="#FFF"
        strokeLinecap="round"
        strokeMiterlimit="4.22"
        strokeWidth="3.659"
        fontFamily="Berlin Sans FB"
        fontSize="28.124"
        fontStyle="italic"
        fontWeight="700"
        paintOrder="stroke"
        textAnchor="middle"
        transform="matrix(1.0265 0 0 .9671 108.716 -3.562)"
      >
        {amount}
      </text>
    </svg>
  );
}

export default HeartIcon;
