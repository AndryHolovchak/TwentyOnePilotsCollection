import { useState, useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate.jsx";

function useTabsSystemListener(tabsSystemInstance) {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    tabsSystemInstance.addActiveTabIndexListener(forceUpdate);
    return () => {
      tabsSystemInstance.removeActiveTabIndexListener(forceUpdate);
    };
  }, []);
}

export { useTabsSystemListener };
