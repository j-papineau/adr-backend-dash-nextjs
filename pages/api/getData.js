import mysql from "mysql2/promise";
import axios from "axios";
//import { post } from "jquery";




export default async function handler(req, res){


        
    // });
const url = 'https://adrstagingreal.wpengine.com/Joel-Dash/php/pullAllTracking.php'
//const url = 'https://adrstagingreal.wpengine.com/Joel-Dash/php/pullRegionInfo.php'
//const url = 'https://adrstagingreal.wpengine.com/Joel-Dash/php/test.php'



   

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

    // var params = {
    //     test: "hello"
    // }

    // axios.post(url, params).then(function(response){
    //     console.log(response.data)
    // })
    let res;

    axios.post(url, {
        test: "hello",
    }).then(function (res) {
        
    })
    .catch(function(error){ 
        console.log(error);
    })

  // res.status(200).json({name : "John Doe"});
   
}