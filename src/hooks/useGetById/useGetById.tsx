import { useCallback, useContext, useEffect, useState } from "react";
import { useApi } from "../useApi/useApi";
import { EditUser } from "../../types/EditUser";

export default function useGetById(route: string) {
  const api = useApi();
  const [result, setData] = useState<EditUser | null>();
  const [loading, setLoading] = useState(false);

  const getByIdData = useCallback(async () => {
    setLoading(true)

    return await api
      .getById(route)
      .then((res) => {
        setData(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  useEffect(() => {
    getByIdData();
  }, []);

  return { result, loading };
}
