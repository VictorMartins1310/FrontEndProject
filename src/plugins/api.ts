import { useAuthStore } from '@/stores/auth'

const baseUrl : string = import.meta.env.VITE_HOMELINK;

async function getRequest(link: string){
  const auth = useAuthStore();
  if (!auth.isTokenExpired()){
    const data = await fetch(baseUrl + link, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + auth.token
      }
    })
    return await data.json();
  }
}

async function postRequest(link: string, data: object){
  const auth = useAuthStore();
  const response = await fetch(baseUrl + link, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: "Bearer " + auth.token,
      "Content-Type": "application/json"
    }
  })

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${response.status} ${response.statusText} – ${errorText}`);
  }


  return response.json();
}

export const API = {
  getRequest, postRequest
}
