// import { authenticationService } from './../Services/Authentication.service';
import { toast } from 'react-toastify';

export function handleResponse(response) {
    let toastSettings = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    }

    if (response.ok) {
        if (response.status === 204) {
            toast.success("Successfully deleted!", toastSettings)
            return true;
        }

        let json = response.json().then(json => {
            if (response.status === 201) {
                toast.success("Successfully created!", toastSettings)
            }
            return json
        });
        
        return json
    } else {
        const error = response.text()
        console.log(error);
        error.then(e => {
            let message = e
            if (!message) message = response.status + " - " + response.statusText
            try {
                let json = JSON.parse(e)
                if (json.hasOwnProperty('message')) {
                    message = json.message
                } else if (json.hasOwnProperty('error')) {
                    message = json.error
                }
            } catch (e) {
                console.log(e)
            }

            toast.error(message, toastSettings)
        })

        return Promise.reject(error);
    }
}