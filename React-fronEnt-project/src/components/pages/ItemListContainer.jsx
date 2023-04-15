import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../utils/customHooks/useFetch'
import { urlHelper } from '../../utils/customHooks/helpers';
import Spinner from '../presentation/Spinner';
import ItemList from './ItemList';
import useVerifyLogin from '../../utils/customHooks/useVerifyLogin';

export default function ItemListContainer() {

  //this is to very if you're login
  useVerifyLogin();

  const { category } = useParams();

  const inputRefPrevPage = useRef(null);
  const inputRefNextPage = useRef(null);

  //functions to control pages
  const handlePrevPage = () => {
    if (typeof (data?.products.prevPage) === 'number') setFilters({ ...filters, page: data?.products.prevPage });
  }
  const handleNextPage = () => {
    if (typeof (data?.products.nextPage) === 'number') setFilters({ ...filters, page: data?.products.nextPage });
  }

  //this is to get filters
  const initialState = {
    page: '1',
    limit: '5',
    filter: 'title',
    inputFilter: ''
  }

  const [filters, setFilters] = useState(initialState);

  let data, loading;

  if (category === undefined) {
    //We need to use '/api' becuase of vite proxy configuration
    const filterCategory = urlHelper(null, filters);
    ({ data, loading } = useFetch(`/api/products?${filterCategory}`, null, filters));
  } else {
    const filterCategory = urlHelper(category, filters);
    ({ data, loading } = useFetch(`/api/products?${filterCategory}`, category, filters));
  }

  //to style the nav button
  if (!(data?.products?.hasPrevPage) && !loading) {
    inputRefPrevPage.current.classList.add('disabled');
  } else if (data?.products?.hasPrevPage && !loading) {
    inputRefPrevPage.current.classList.remove('disabled');
  }

  if (!(data?.products?.hasNextPage) && !loading) {
    inputRefNextPage.current.classList.add('disabled');
  } else if (data?.products?.hasNextPage && !loading) {
    inputRefNextPage.current.classList.remove('disabled');
  }

  return (
    <>
      <div>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body row justify-content-between'>
              <div className='col-12 col-md-6 mb-1 mb-md-0'>
                <div
                  className='row g-3 align-items-center justify-content-center'
                >
                  <div className='col-auto'>
                    <label className='col-form-label'>Show</label>
                  </div>
                  <div className='col-auto'>
                    <select
                      className='form-select'
                      onChange={(e) => setFilters({ ...filters, limit: e.target.value, page: 1 })}
                    >
                      <option value='5'>5</option>
                      <option value='10'>10</option>
                      <option value='20'>20</option>
                      <option value='50'>50</option>
                    </select>
                  </div>
                  <div className='col-auto'>
                    <label className='col-form-label'>Products</label>
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-6 col-lg-5'>
                <div className='input-group form-search'>
                  <button className='btn btn-primary' onClick={() => setFilters(initialState)}>Clear filters</button>
                  <select
                    className='form-select select-search'
                    onChange={(e) => setFilters({ ...filters, filter: e.target.value })}
                  >
                    <option value='title'>Title</option>
                  </select>
                  <input
                    onKeyUp={(e) => setFilters({ ...filters, inputFilter: e.target.value, page: 1 })}
                    type='text'
                    className='form-control'
                    v-model='filters.inputSearch'
                    placeholder='type here....'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? <Spinner /> : <ItemList data={data.products} />}

        <nav aria-label='Page navigation example'>
          <ul className='pagination d-flex justify-content-center'>
            <li className='page-item' ref={inputRefPrevPage} style={{ cursor: 'pointer' }} onClick={() => handlePrevPage()}>
              <a className='page-link' aria-label='Previous'>
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            {(data?.products?.hasPrevPage && !loading) && <li className='page-item' style={{ cursor: 'pointer' }} onClick={() => setFilters({ ...filters, page: data?.products.prevPage })}><a className='page-link'>{data?.products.prevPage}</a></li>}
            {(data?.products?.page && !loading) && <li className='page-item'><a className='page-link bg-primary text-black'>{data?.products?.page}</a></li>}
            {(data?.products?.hasNextPage && !loading) && <li className='page-item' style={{ cursor: 'pointer' }} onClick={() => setFilters({ ...filters, page: data?.products.nextPage })}><a className='page-link'>{data?.products.nextPage}</a></li>}
            <li className='page-item' ref={inputRefNextPage} style={{ cursor: 'pointer' }} onClick={() => handleNextPage()}>
              <a className='page-link' aria-label='Next'>
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
