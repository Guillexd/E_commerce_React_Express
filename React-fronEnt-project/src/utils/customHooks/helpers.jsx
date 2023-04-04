export async function fetchBody(url, method, body) {
  try {
    //We need to use '/api' becuase of vite proxy settings, you can try it with axios, if works it's nice 
    const order = await fetch('/api' + url, {
      method: method, // 'POST' or 'PUT'
      body: JSON.stringify(body), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await order.json()
    return data;
  } catch (err) {
    return
  } finally {
    console.log('Succesfully');
  }
}

// export async function fetchLogin(url, body) {
//   try {
//     const login = await fetch(url, {
//       method: 'POST', 
//       body: JSON.stringify(body), // data can be `string` or {object}!
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     const data = await login.json()
//     return data;
//   } catch (err) {
//     return err;
//   } finally {
//     console.log('Succesfully');
//   }
// }

export function urlHelper(category = null, { page, limit, filter, inputFilter }) {
  let newUrl = new URLSearchParams({ page, limit });
  if (category) newUrl.append('category', category);
  if (filter !== '' && inputFilter !== '') {
    newUrl.append('filter', filter);
    newUrl.append('inputFilter', inputFilter);
  }
  return newUrl.toString();
}