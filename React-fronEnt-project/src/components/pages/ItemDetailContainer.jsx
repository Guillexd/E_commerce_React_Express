import { useParams } from 'react-router-dom';
import { useFetch } from '../../utils/customHooks/useFetch';
import ItemDetail from './ItemDetail';
import Spinner from '../presentation/Spinner';
import useVerifyLogin from '../../utils/customHooks/useVerifyLogin';

export default function ItemDetailContainer(){

  //this is to very if you're login
  useVerifyLogin();

  //Hook for '/product/:id'
  const { id } = useParams();
  
  const { data, loading } = useFetch(`/api/products/${id}`);
  
  return (
    <>
      {loading ? <Spinner/> : <ItemDetail product={data.product} id={id} />}
    </>
  )
}