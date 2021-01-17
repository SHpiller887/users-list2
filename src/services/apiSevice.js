class ApiService {

    serverApiUrl1 = 'https://jsonplaceholder.typicode.com';



    constructor() {
    }

    runApiServer1(url = 'users') {
        return new Promise( (resolve, reject) => {
            let axios = require('axios');
            axios.get(this.serverApiUrl1+'/'+url)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                })
                .then(function () {
                });
        })
    }

    runApiServerMoc(url = 'users', paramers) {
        return new Promise( (resolve) => {
            let response = new class {status; message}
            response.message = url+' '+paramers+'all is ok and MOC';
            response.status = 200;
            resolve(response);

        })
    }

    // runApiServer1(url = 'users',) {
    //     return new Promise( (resolve) => {
    //         const xhr = new XMLHttpRequest();
    //         console.log('start')
    //         xhr.open("GET", (this.serverApiUrl1+'/'+url), true);
    //         xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    //         // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //
    //         xhr.onreadystatechange = () => {
    //             if (xhr.readyState === 4) {
    //                 var serverApiResponse = JSON.parse(xhr.responseText);
    //                 serverApiResponse.status = xhr.status;
    //                 console.log('responce from api service: ',serverApiResponse);
    //                 resolve(serverApiResponse);
    //             }
    //         };
    //         xhr.send();
    //     })
    // }



}

export default new ApiService();

