import { useEffect } from "react";
import { Link } from "@remix-run/react";

export default function Index() {
  useEffect(() => {
    console.log("I'm hydrated now, baby!");
  });

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome</h1>
      <ul>
        <li>
          <Link reloadDocument to="bingo">
            Bingo
          </Link>
        </li>
      </ul>
    </div>
  );
}
