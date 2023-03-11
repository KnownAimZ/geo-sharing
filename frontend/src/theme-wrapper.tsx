import { ThemeToggler } from "./components/theme-toggler";
import { useAppSelector } from "./hooks";

export const ThemeWrapper: React.FC<any> = ({ children }) => {
  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

  return (
    <div className={isDarkTheme ? "dark" : ""}>
      {children}
      <ThemeToggler />
    </div>
  );
};
