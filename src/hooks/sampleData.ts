import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useSampleClients = () => {
  const { data, error } = useSWR('/dardoc/data-sources/clients.json', fetcher);

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSampleBookings = () => {
  const { data, error } = useSWR('/dardoc/data-sources/bookings.json', fetcher);

  return {
    bookings: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSampleTransactions = () => {
  const { data, error } = useSWR('/dardoc/data-sources/history.json', fetcher);

  return {
    transactions: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
};
