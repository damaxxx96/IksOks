import axios from "axios";
import { getToken } from "./HttpService";

export const LobbyService = {
  getLobby: async (): Promise<string[]> => {
    const token = getToken();

    const { data }: any = await axios
      .get(`http://localhost:8000/lobby/`, {
        headers: { Authorization: `${token}` },
      })
      .catch((reason: any) => {
        throw reason;
      });

    return data.usernames;
  },
  isChallenged: async (user: any): Promise<any> => {
    const token = getToken();

    const { data }: any = await axios
      .get(`http://localhost:8000/challenge/is-challenged/${user}`, {
        headers: { Authorization: `${token}` },
      })
      .catch((reason: any) => {
        throw reason;
      });

    return data;
  },

  challenge: async (challenger: any, opponent: string): Promise<any> => {
    const token = getToken();

    const { data }: any = await axios
      .post(
        `http://localhost:8000/challenge/`,
        { challenger: challenger, opponent: opponent },
        {
          headers: { Authorization: `${token}` },
        }
      )
      .catch((reason: any) => {
        throw reason;
      });
  },
  challengeDecision: async (
    challengeId: number,
    decision: boolean
  ): Promise<any> => {
    const token = getToken();

    const { data }: any = await axios
      .patch(
        `http://localhost:8000/challenge/challenge-decision/`,
        { id: challengeId, decision: decision },
        {
          headers: { Authorization: `${token}` },
        }
      )
      .catch((reason: any) => {
        throw reason;
      });
  },
  challengeResult: async (challengeId: number): Promise<any> => {
    const token = getToken();

    const { data }: any = await axios
      .delete(
        `http://localhost:8000/challenge/challenge-result/${challengeId}`,
        {
          headers: { Authorization: `${token}` },
        }
      )
      .catch((reason: any) => {
        throw reason;
      });
  },
};
