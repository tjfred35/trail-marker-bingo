import * as React from "react"

export function ChevronLeftIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      height="24px"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 25a1 1 0 01-.71-.29l-8-8a1 1 0 010-1.42l8-8a1 1 0 111.42 1.42L13.41 16l7.3 7.29a1 1 0 010 1.42A1 1 0 0120 25z"
        data-name="Layer 2"
      />
      <path fill="none" d="M0 0H32V32H0z" />
    </svg>
  )
}
