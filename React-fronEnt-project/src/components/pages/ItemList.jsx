import Item from './Item';

function ItemList({ data }) {

  return (
    <div className='d-flex flex-wrap justify-content-center'>
      {data?.payload?.map((product, index) => <Item data={product} key={index} />)}
    </div>
  )
}
export default ItemList;