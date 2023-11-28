import * as React from "react"

export function CloseIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg viewBox="0 0 32 32" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <style>
          {
            ".cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
          }
        </style>
      </defs>
      <g id="cross">
        <path className="cls-1" d="M7 7L25 25" />
        <path className="cls-1" d="M7 25L25 7" />
      </g>
    </svg>
  )
}
