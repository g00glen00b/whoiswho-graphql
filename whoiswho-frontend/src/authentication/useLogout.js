import {useApolloClient} from '@apollo/react-hooks';
import {useState, useEffect} from 'react';

export function useLogout() {
  const client = useApolloClient();
  const [done, setDone] = useState(false);
  const [loading, logout] = useState(false);
  useEffect(() => {
    async function clearStore() {
      if (loading) {
        await client.clearStore();
        await client.cache.reset();
        await client.resetStore();
        setDone(true);
        logout(false);
      }
    }

    clearStore();
  }, [client, loading, setDone]);
  return {done, loading, logout};
}
