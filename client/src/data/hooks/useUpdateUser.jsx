import useSWRMutation from "swr/mutation";
import { LOCALSTORAGE_KEYS } from "../../utils";

async function updateUser(url, { arg }) {
  const id = localStorage.getItem(LOCALSTORAGE_KEYS.USER_ID);

  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      USER_ID: id,
    },
    body: JSON.stringify(arg),
  });
}

const useUpdateUser = () => {
  const { isMutating, trigger } = useSWRMutation("/api/user/edit", updateUser);

  return { loading: isMutating, updateUser: trigger };
};

export { useUpdateUser };
