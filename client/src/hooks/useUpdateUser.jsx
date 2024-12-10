import useSWRMutation from "swr/mutation";

async function updateUser(url, { arg }) {
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
}

const useUpdateUser = id => {
  const { isMutating, trigger } = useSWRMutation(
    `/api/resume/${id}`,
    updateUser
  );

  return { loading: isMutating, updateUser: trigger };
};

export { useUpdateUser };
