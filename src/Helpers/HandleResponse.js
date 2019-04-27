// import { authenticationService } from './../Services/Authentication.service';
import toastr from 'toastr'

export function handleResponse(response) {
    console.log(response)
    if(response.ok){
        return response.json()
    } else {
        const error = response.text();
        console.log(error)
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }


        toastr.error("Are you the six fingered man?", "Error")
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