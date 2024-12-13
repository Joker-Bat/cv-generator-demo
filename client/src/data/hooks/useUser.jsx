import useSWR from "swr";
import { LOCALSTORAGE_KEYS } from "../../utils";

const fetcher = async url => {
  const id = localStorage.getItem(LOCALSTORAGE_KEYS.USER_ID);

  const res = await fetch(url, {
    headers: {
      USER_ID: id,
    },
  });

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error(await res.text());
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const useUser = () => {
  const { data, error, isLoading } = useSWR("/api/user", fetcher);

  return {
    userDetails: data?.data,
    isLoading,
    isError: error,
    notFound: error?.status === 404,
  };
};

export { useUser };
