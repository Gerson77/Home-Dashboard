import { useCallback, useEffect, useState } from "react";
import { useApi } from "../useApi/useApi";
import { ResultData } from "../../types/ResultData";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { setLogout } from '../../state'

export default function useGetAll(route: string) {
  const api = useApi();
  const [result, setData] = useState<ResultData[]>([]);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state: any) => state.token)
  const dispatch = useDispatch();

  const getAllData = useCallback(async () => {
    setLoading(true)

    return await api
      .getAllData(route, token)
      .then((res) => {
        setData(res.data);
        setLoading(false)
      })
      .catch((err) => {
        dispatch(setLogout())
      });
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

  return { result, loading };
}
