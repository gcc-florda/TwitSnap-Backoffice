export const API_USER_BASE_URL = ""
export const API_TWITSNAP_BASE_URL = process.env.NEXT_PUBLIC_API_TWITSNAP_BASE_URL || 'https://api-twitsnaps-78063251e6a3.herokuapp.com';

export const stdFetch = async (url: string, config = {}) => {
    try {
        const response = await fetch(url, config);

        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch');
        }
    } catch (error) {
        console.error('Error during request:', error);
        throw error;
    }
};

export const post = (url: string, body: object, token?: string) => {
  return stdFetch(url, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: token 
      ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } 
      : { 'Content-Type': 'application/json' }
  });
}

export const get = async (url: string, token?: string) =>  {
  return stdFetch(url, {
    method: 'GET',
    headers: token
      ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } 
      : { 'Content-Type': 'application/json' }
  });
}


export const put = async (url: string, body: object, token?: string) => {
  return stdFetch(url, {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: token
      ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      : { 'Content-Type': 'application/json' }
  });
};


export const del = (url: string, token?: string) => {
  return stdFetch(url, {
      method: 'DELETE',
      headers: token 
          ? { 'Authorization': `Bearer ${token}` } 
          : { 'Content-Type': 'application/json' }
  });
};
