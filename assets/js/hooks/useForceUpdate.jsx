import React, { useCallback, useState } from "react";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  const callback = useCallback(() => setValue((value) => ++value));
  return callback;
}

export { useForceUpdate };
