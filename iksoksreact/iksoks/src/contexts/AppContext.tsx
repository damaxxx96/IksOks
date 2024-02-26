import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AppContextInterface {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  game: number | null;
  setGame: React.Dispatch<React.SetStateAction<number | null>>;
}

export const AppContext = createContext<AppContextInterface>({
  user: null,
  setUser: () => {},
  game: null,
  setGame: () => {},
});

interface AppProviderProps {
  children?: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
}: AppProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [game, setGame] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser, game, setGame }}>
      {children}
    </AppContext.Provider>
  );
};
