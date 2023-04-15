import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomContext } from "../context/ContextTasks";

//this function isn't optimal. I mean this doesn't allow you to refresh page and stay in the same page that you were a moment ago
export default function useVerifyLogin() {
  const { login } = useCustomContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(login);
    if (!login) navigate('/')
  }, [])
}