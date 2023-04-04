import { useParams, Navigate } from 'react-router-dom';
import { useFetch } from '../../utils/customHooks/useFetch';
import ItemDetail from './ItemDetail';
import Spinner from '../presentation/Spinner';

export default function ItemDetailContainer(){

  //Hook for '/product/:id'
  const { id } = useParams();
  
  const { data, loading } = useFetch(`/api/products/${id}`);
  
  return (
    <>
      {loading ? <Spinner/> : <ItemDetail product={data.product} id={id} />}
      {data?.state === 0 && <Navigate to='/' />}
    </>
  )
}