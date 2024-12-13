import useSWRMutation from "swr/mutation";

async function login(url, { arg }) {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
}

const useLogin = () => {
  const { isMutating, trigger } = useSWRMutation(`/api/auth/login`, login);

  return { loading: isMutating, login: trigger };
};

export { useLogin };
