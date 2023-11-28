import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "~/styles/global.css";
import { Nav, Navigation } from "./nav";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Trail Marker Bingo",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>

        <Nav />

        <div style={{ display: 'flex', gap: '16px' }}>
          <div id="column-1">
            <Navigation />
          </div>
          <div id="column-2">
            <Outlet />
          </div>
          <div id="column-3"></div>
        </div>

        <div id='portals' />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body >
    </html >
  );
}
