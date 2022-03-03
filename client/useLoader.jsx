import { useEffect, useState } from "react";

export function useLoader(fun) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function reload() {
    setError(undefined);
    setLoading(true);
    try {
      setData(await fun());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(reload, []);

  return { reload, loading, error, data };
}
