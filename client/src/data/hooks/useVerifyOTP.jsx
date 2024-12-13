import useSWRMutation from "swr/mutation";

async function verify(url, { arg }) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const error = new Error(await res.text());
    error.status = res.status;
    throw error;
  }

  return res.json();
}

const useVerifyOTP = () => {
  const { isMutating, trigger } = useSWRMutation(`/api/auth/verify`, verify);

  return { loading: isMutating, verifyOTP: trigger };
};

export { useVerifyOTP };
