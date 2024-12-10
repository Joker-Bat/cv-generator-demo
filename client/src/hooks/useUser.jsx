import useSWR from "swr";

const fetcher = async url => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error(await res.text());
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const useUser = id => {
  const { data, error, isLoading } = useSWR(
    id ? `/api/resume/${id}` : null,
    fetcher
  );

  return {
    user: data?.data,
    isLoading,
    isError: error,
  };
};

export { useUser };
