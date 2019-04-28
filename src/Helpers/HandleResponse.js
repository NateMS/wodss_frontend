// import { authenticationService } from './../Services/Authentication.service';
import { toast } from 'react-toastify';

export function handleResponse(response) {
    if (response.ok) {
        return response.json()
    } else {
        const error = response.text()
        error.then(e => {
            console.log(e)
            let message = e
            try {
                let json = JSON.parse(e)
                if (json.hasOwnProperty('message')) {
                    message = json.message
                } else if (json.hasOwnProperty('error')) {
                    message = json.error
                }
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
}