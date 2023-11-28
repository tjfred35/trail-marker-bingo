import * as React from 'react'
import { useLoaderData } from "@remix-run/react";

import styles from "~/styles/bingo.css";

import { cardOne } from '~/cards/cardOne'
import { cardTwo } from '~/cards/cardTwo'
import { cardThree } from '~/cards/cardThree'
import { cardFour } from '~/cards/cardFour'
import type { Card } from '~/cards/Card';
import { TrailMarkerBingo } from '~/bingo/Game';

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader() {
  const cards: Record<string, Card> = {
    [cardOne.id]: cardOne,
    [cardTwo.id]: cardTwo,
    [cardThree.id]: cardThree,
    [cardFour.id]: cardFour
  }
  return Promise.resolve(cards);
}

export default function Component() {
  let cards = useLoaderData<Record<string, Card>>();

  return <TrailMarkerBingo cards={cards} />
}

