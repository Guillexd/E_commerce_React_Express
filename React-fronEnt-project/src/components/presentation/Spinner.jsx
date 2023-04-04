export default function Spinner() {
  return (
    <div className='w-100 mt-5 d-flex flex-column align-items-center justify-content-center'>
      <div style={{ width: '10rem', height: '10rem' }} className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
        <span style={{ fontSize: '2rem' }}>Loading...</span>
    </div>
  )
}