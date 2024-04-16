import { useState } from "react";

export const useFetchError = () => {
  const [_, setError] = useState<Error | null>(null);

  const handleFetchError = (error: Error) => {
    setError(() => {
      throw error;
    });
  };

  return {
    handleFetchError,
  };
};
