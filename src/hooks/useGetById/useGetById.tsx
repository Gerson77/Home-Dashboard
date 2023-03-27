import { useCallback, useEffect, useState } from "react";
import { useApi } from "../useApi/useApi";
import { EditUser } from "../../types/EditUser";
import { useSelector } from "react-redux";
import { RootState } from "../../main";

export default function useGetById(route: string) {
  const api = useApi();
  const [result, setData] = useState<EditUser | null>();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: RootState) => state.token);

  const getByIdData = useCallback(async () => {
    setLoading(true);

    return await api
      .getById(route, token)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getByIdData();
  }, []);

  return { result, loading };
}
