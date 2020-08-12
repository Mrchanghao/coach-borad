import { useRef, useEffect } from 'react';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    // Store current value in ref
    ref.current = value;
  }, [value]); // Only re-run if value changes

  return ref.current;
}

export default usePrevious;
