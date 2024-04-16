import { useCallback, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";

import { useFetchError } from "../fetchError/useFetchError";

export const useFetch = <Params extends string, Result>(
  params: Params,
  fetch: (p: Params, config?: AxiosRequestConfig) => Promise<Result>,
  config?: AxiosRequestConfig,
) => {
  const [_promise, _setPromise] = useState<Promise<void>>();
  const [_status, _setStatus] = useState<"pending" | "fulfilled" | "error">(
    "pending",
  );
  const [_result, _setResult] = useState<Result | null>(null);

  const { handleFetchError } = useFetchError();

  const promiseResolve = useCallback((result: Result) => {
    _setStatus("fulfilled");
    _setResult(result);
  }, []);

  useEffect(() => {
    _setStatus("pending");
    _setPromise(
      fetch(params, config)
        .then(promiseResolve)
        .catch((e) => handleFetchError(e)),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (_status === "pending" && _promise) {
    throw _promise;
  }

  return _result;
};
