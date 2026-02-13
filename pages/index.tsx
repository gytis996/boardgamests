import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "../styles/Card.module.css";

interface RawGame {
  _id: string;
  title: string;
  imgUrl: string;
  minAvailableForPeopleNumber: number;
  maxAvailableForPeopleNumber: number;
}

interface Game {
  id: string;
  title: string;
  img: string;
  players: string;
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios.get("/api/game?limit=80").then((res) => {
      const transformed: Game[] = res.data.map((g: RawGame) => ({
        id: g._id,
        title: g.title.toUpperCase(),
        img: g.imgUrl,
        players: `${g.minAvailableForPeopleNumber}-${g.maxAvailableForPeopleNumber} žm.`,
      }));
      setGames(transformed);
    });
  }, []);

  return (
    <div className={styles.container}>
      {games.map((game) => (
        <div key={game.id} className={styles.card}>
          <Image src={game.img} alt={game.title} width={200} height={200} />
          <h3>{game.title}</h3>
          <p>👥 {game.players}</p>
        </div>
      ))}
    </div>
  );
}
