import * as React from "react"

export function ChevronRightIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="24px"
      height="24px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 25a1 1 0 01-.71-.29 1 1 0 010-1.42l7.3-7.29-7.3-7.29a1 1 0 111.42-1.42l8 8a1 1 0 010 1.42l-8 8A1 1 0 0112 25z"
        data-name="Layer 2"
      />
      <path fill="none" d="M0 0H32V32H0z" />
    </svg>
  )
}
