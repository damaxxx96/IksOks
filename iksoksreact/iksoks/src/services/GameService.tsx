import axios from "axios";
import { getToken } from "./HttpService";

export const GameService = {
  move: async (move: any, game: number): Promise<any> => {
    const token = getToken();

    const response: any = await axios
      .patch(
        `http://localhost:8000/game/move/`,
        { move: move, game: game },
        {
          headers: { Authorization: `${token}` },
        }
      )
      .catch((reason: any) => {
        throw reason;
      });

    return response;
  },
  getMove: async (gameId: number): Promise<any> => {
    const token = getToken();

    const { data }: any = await axios
      .get(
        `http://localhost:8000/game/${gameId}`,

        {
          headers: { Authorization: `${token}` },
        }
      )
      .catch((reason: any) => {
        throw reason;
      });

    return data;
  },
};
