import { useEffect, useRef } from 'react';

function usePreviouse(value) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePreviouse;
