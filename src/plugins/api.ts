import { useAuthStore } from '@/stores/auth'

const baseUrl : string = import.meta.env.VITE_HOMELINK;
const auth = useAuthStore();
let response;

async function getRequest(link: string){
  if (auth.isUserAuthenticated){
    response = await fetch(baseUrl + link, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + auth.token
      }
    })
    if (import.meta.env.MODE === 'development')
      console.log("Response Data from a GET Request: " + response);
    return await response.json();
  }
}

async function postRequest(link: string, data: object){
  if (auth.isUserAuthenticated){
    response = await fetch(baseUrl + link, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: 'Bearer ' + auth.token,
        'Content-Type': 'application/json',
      },
    })
  } else {
    response = await fetch(baseUrl + link, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
    if (import.meta.env.MODE === 'development')
      console.log("Response Data from a POST Request: " + response);
  if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Request failed: ${response.status} ${response.statusText} – ${errorText}`)
    }
    return response.json()
}

async function patchRequest(link: string, data: object){
  response = await fetch(baseUrl + link, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      Authorization: "Bearer " + auth.token,
      "Content-Type": "application/json"
    }
  })
    if (import.meta.env.MODE === 'development')
      console.log("Response Data from a PATCH Request: " + response);
}

async function deleteRequest(link: string){
  response = await fetch(baseUrl + link, {
    method: 'DELETE',
    headers: {
      Authorization: "Bearer " + auth.token,
      "Content-Type": "application/json"
  }
})
}

export const API = {
  getRequest, postRequest, patchRequest, deleteRequest
}
