import { axiosInstance } from '@/lib';

export const getAllCountries = async () =>
  axiosInstance('/api/countries').then((res) => res.data);

export const getFootballData = async ({ queryKey }: { queryKey: string[] }) =>
  axiosInstance.get(queryKey[1]).then((res) => res.data);
