// import { authenticationService } from './../Services/Authentication.service';
import { toast } from 'react-toastify';

export function handleResponse(response) {
    console.log(response)
    if(response.ok){
        return response.json()
    } else {
        const error = response.text()
        error.then(e => {
            console.log(e)
            let message = e
            try {
                let json = JSON.parse(e)
                if(json.hasOwnProperty('message')) message = json.message
            } catch (e) {
            }

            
            toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            })
        })
        

        return Promise.reject(error);
    }
    
    // return response.json().then(data => {
    //     // const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         // if ([401, 403].indexOf(response.status) !== -1) {
    //         //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    //         //     authenticationService.logout();
    //         //     window.location.reload(true);
    //         // }
            
    //         const error = (data && data.error) || response.statusText;
    //         return Promise.reject(error);
    //     }

    //     return data;
    // });
}