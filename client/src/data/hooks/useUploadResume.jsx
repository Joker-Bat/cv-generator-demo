import useSWRMutation from "swr/mutation";
import { LOCALSTORAGE_KEYS } from "../../utils";

async function upload(url, { arg }) {
  const id = localStorage.getItem(LOCALSTORAGE_KEYS.USER_ID);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      USER_ID: id,
    },
    body: arg,
  });

  if (!res.ok) {
    const error = new Error(await res.text());
    error.status = res.status;
    throw error;
  }
}

const useUploadResume = () => {
  const { isMutating, trigger } = useSWRMutation(`/api/user/upload`, upload);

  return { loading: isMutating, upload: trigger };
};

export { useUploadResume };
