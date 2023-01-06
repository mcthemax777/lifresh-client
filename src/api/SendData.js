import axios from "axios";

// const url = 'http://127.0.0.1:8000/api/';
const url = 'http://lifresh.me/api/';
const isOnline = false;

function SendData(api, data, callback, err) {

    console.log("send data - " + data.mainCategoryList);

    if(isOnline) {
        // 서버 전송 후 로그인 처리
        axios.post(

            url + api,
            data,
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then((response) => {
            callback(response)
        }).catch((response) => {
            err(response)
        });
    } else {
        const data = {
            resultCode:100,
            resultMsg:"success",
        }

        if(api === "getMoneyTaskList")
        {
            data.moneyTaskList = [];
        }

        const result = {
            data:data
        }

        callback(result);
    }

}

export default SendData;
