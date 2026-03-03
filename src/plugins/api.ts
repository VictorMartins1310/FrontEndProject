import { useAuthStore } from '@/stores/auth'

const baseUrl : string = import.meta.env.VITE_HOMELINK;

function setBodyData(method: string, token: string | null, data: object | null){
  let newBodyData = {
    method: method,
    headers: {
      Authorization: "Bearer " + token,
      'Content-Type': 'application/json',
    }
  }
  if (method === 'GET' || method === 'DELETE')
    return newBodyData;

return {
  method: method,
  body: JSON.stringify(data),
  headers: {
    Authorization: "Bearer " + token,
    'Content-Type': 'application/json',
  }
}
}

async function getRequest(link: string){
  const auth = useAuthStore();
  const body = setBodyData('GET', auth.token, null);
  const response  = await fetch(baseUrl + link, body);
  const json = await response.json();
  if (import.meta.env.MODE === 'development'){
    console.log("Response Data from a GET Request: ", response, "\nResponse Data:", json);
  }
  return await json;
}

async function postRequest(link: string, data: object){
  const auth = useAuthStore();
  const bodyData = setBodyData('POST', auth.token, data);
  const response = await fetch(baseUrl + link, bodyData);
  if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Request failed: ${response.status} ${response.statusText} – ${errorText}`)
    }
  const json = await response.json();
  if (import.meta.env.MODE === 'development'){
    console.log("Response Data from a POST Request: ", response, "\nResponse Data:", json);
  }
  return await json;
}

async function patchRequest(link: string, data: object){
  const auth = useAuthStore();
  const bodyData = setBodyData('PATCH', auth.token, data);
  const response = await fetch(baseUrl + link, bodyData);
  const json = await response.json();
  if (import.meta.env.MODE === 'development'){
    console.log("Response Data from a PATCH Request: ", response, "\nResponse Data:", json);
  }
  return await json;
}

async function deleteRequest(link: string){
  const auth = useAuthStore();
  const bodyData = setBodyData('DELETE', auth.token, null);
  const response = await fetch(baseUrl + link, bodyData);
  const json = await response.json();
  if (import.meta.env.MODE === 'development'){
    console.log("Response Data from a DELETE Request: ", response, "\nResponse Data:", json);
  }
  return await json;
}

export const API = {
  getRequest, postRequest, patchRequest, deleteRequest
}
