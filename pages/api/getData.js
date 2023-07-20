import mysql from "mysql2/promise";
import axios from "axios";
//import { post } from "jquery";




export default async function handler(req, res){


        
    // });
const url = 'https://adrstagingreal.wpengine.com/Joel-Dash/php/pullAllTracking.php'
//const url = 'https://adrstagingreal.wpengine.com/Joel-Dash/php/pullRegionInfo.php'



    const postBody = {
        count: 5
    }

    const requestMetaData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    }

    // fetch(url, requestMetaData)
    // .then(res => console.log(res))
    // .then(data => console.log(data))

    // axios({
    //     method: 'post',
    //     url: url,
    //     data: {
    //         count: 5
    //     }
    // })
    // .then(res => console.log(res.data))

    axios.post(url, {
        count: 3
    }).then(function (res) {
        console.log(res.data)
    })
    .catch(function(error){ 
        console.log(error);
    })



    



   res.status(200).json({name : "John Doe"});
   
}