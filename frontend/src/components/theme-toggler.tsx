import { setTheme } from "../feature/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export const ThemeToggler = () => {
  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);
  const dispatch = useAppDispatch();

  const toggleDarkTheme = () => {
    dispatch(setTheme(!isDarkTheme));
  };

  return (
    <button
      className="fixed bottom-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg"
      onClick={toggleDarkTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-700 dark:text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isDarkTheme ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M12 5l7 7-7 7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 17l5-5m0 0l-5-5m5 5h-12"
          />
        )}
      </svg>
    </button>
  );
};
