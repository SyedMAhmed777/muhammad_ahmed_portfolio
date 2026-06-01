import { useHashLocation } from "@/hooks/use-hash-location";

const BACK_KEY = "nav_back_to";

/**
 * Returns a `goBack` function and a `setBackDestination` helper.
 * Case study pages call `goBack()` for their "Back" buttons.
 * Pages that link into case studies (AllProjects) call
 * `setBackDestination("/projects")` before navigating.
 */
export function useBackNavigation() {
  const [, navigate] = useHashLocation();

  const setBackDestination = (path: string) => {
    sessionStorage.setItem(BACK_KEY, path);
  };

  const goBack = (defaultPath = "/") => {
    const stored = sessionStorage.getItem(BACK_KEY);
    sessionStorage.removeItem(BACK_KEY);

    if (stored && stored !== defaultPath) {
      // If we came from AllProjects, restore scroll position there too
      if (stored === "/projects") {
        // no extra scroll flag needed – AllProjects always scrolls to top
      }
      navigate(stored);
    } else {
      // Came from Home – restore projects grid scroll
      sessionStorage.setItem("scroll_to_projects", "true");
      navigate(defaultPath);
    }
  };

  return { goBack, setBackDestination };
}
