import { useState, useEffect } from 'react';

export function useFetch(url, category = null, filters = null){
  //hook to obtain data from my server
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  //hook to control data just when is Mounted
  //We need to use '/api' becuase of vite proxy settings, you can try it with axios, if works it's nice 
  useEffect(()=>{
    setLoading(true);
    fetch('/api'+url)
    .then(response => response.json())
    .then(response => {
      setLoading(false)
      setData(response)
    })
  }, [category, filters])

  return { data, loading };
}
