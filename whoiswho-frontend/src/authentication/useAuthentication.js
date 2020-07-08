import {useQuery} from '@apollo/react-hooks';
import {authenticationQuery} from './queries';

export function useAuthentication() {
  const {data: {authentication = {}} = {}} = useQuery(authenticationQuery, {fetchPolicy: 'cache-first'});
  return {...authentication};
}
