import { useQuery } from '@tanstack/react-query';
import { getDeepgramKey } from '../voice';

export function useDeepgramKey() {
  return useQuery({
    queryKey: ['deepgramKey'],
    queryFn: getDeepgramKey,
    enabled: false,
    retry: 1,
  });
}
