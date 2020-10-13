


const handleImageUrl = (Clarifai,fs)=>(req,res)=>{
    const apiClarifai = new Clarifai.App({
        apiKey: process.env.clarifaiApiKey
    });
    apiClarifai.models.predict("e466caa0619f444ab97497640cefc4dc",req.body.clarifaiImageURL,{language:req.body.locale})
    //連接名人辨識模組api
    //前面的長碼是名人辨識的模組代碼，clarifaiImageURL是要辨識的網路圖片來源的網址
    //backendFileName是前端傳過來，後端圖片檔案名稱
    .then(response => {
        if(req.body.backendFileName){
            fs.unlink(
                `./upload/${req.body.backendFileName}`,
                err=>{
                    console.log('delete file error',err);
                }
            )
        }
        //如果clarifai有回傳了，不管回傳什麼，都把後端對應的圖片刪除
        //把clarifai的結果傳給前端
        res.json(response)
    })
    .catch(err=>{res.status(500).json('fetch api failed')})
}

module.exports= {
    handleImageUrl:handleImageUrl
}

//en,es,zh-TW
// app.models.predict(Clarifai.GENERAL_MODEL, "https://samples.clarifai.com/metro-north.jpg", {language: 'zh-TW'}).then(
//   function(response) {
//     // do something with response
//   },
//   function(err) {
//     // there was an error
//   }
// );

// {
//     "status": {
//       "code": 10000,
//       "description": "Ok"
//     },
//     "outputs": [
//       {
//         "id": "b9f3c12f1534440fa984dc463e491780",
//         "status": {
//           "code": 10000,
//           "description": "Ok"
//         },
//         "created_at": "2017-01-31T20:59:27Z",
//         "model": {
//           "name": "general-v1.3",
//           "id": "aaa03c23b3724a16a56b629203edc62c",
//           "created_at": "2016-03-09T17:11:39Z",
//           "app_id": null,
//           "output_info": {
//             "message": "Show output_info with: GET /models/{model_id}/output_info",
//             "type": "concept"
//           },
//           "model_version": {
//             "id": "aa9ca48295b37401f8af92ad1af0d91d",
//             "created_at": "2016-07-13T01:19:12Z",
//             "status": {
//               "code": 21100,
//               "description": "Model trained successfully"
//             }
//           }
//         },
//         "input": {
//           "id": "b9f3c12f1534440fa984dc463e491780",
//           "data": {
//             "image": {
//               "url": "https://samples.clarifai.com/metro-north.jpg"
//             }
//           }
//         },
//         "data": {
//           "concepts": [
//             {
//               "id": "ai_HLmqFqBf",
//               "name": "铁路列车",
//               "app_id": null,
//               "value": 0.9989112
//             },
//             {
//               "id": "ai_fvlBqXZR",
//               "name": "铁路",
//               "app_id": null,
//               "value": 0.9975532
//             },
//             {
//               "id": "ai_Xxjc3MhT",
//               "name": "运输系统",
//               "app_id": null,
//               "value": 0.9959158
//             },
//             {
//               "id": "ai_6kTjGfF6",
//               "name": "站",
//               "app_id": null,
//               "value": 0.992573
//             },
//             {
//               "id": "ai_RRXLczch",
//               "name": "火车",
//               "app_id": null,
//               "value": 0.992556
//             },
//             {
//               "id": "ai_VRmbGVWh",
//               "name": "旅游",
//               "app_id": null,
//               "value": 0.98789215
//             },
//             {
//               "id": "ai_SHNDcmJ3",
//               "name": "地铁",
//               "app_id": null,
//               "value": 0.9816359
//             },
//             {
//               "id": "ai_jlb9q33b",
//               "name": "通勤",
//               "app_id": null,
//               "value": 0.9712483
//             },
//             {
//               "id": "ai_46lGZ4Gm",
//               "name": "铁路",
//               "app_id": null,
//               "value": 0.9690325
//             },
//             {
//               "id": "ai_tr0MBp64",
//               "name": "交通",
//               "app_id": null,
//               "value": 0.9687052
//             },
//             {
//               "id": "ai_l4WckcJN",
//               "name": "模煳",
//               "app_id": null,
//               "value": 0.9667078
//             },
//             {
//               "id": "ai_2gkfMDsM",
//               "name": "平台",
//               "app_id": null,
//               "value": 0.9624243
//             },
//             {
//               "id": "ai_CpFBRWzD",
//               "name": "城市的",
//               "app_id": null,
//               "value": 0.960752
//             },
//             {
//               "id": "ai_786Zr311",
//               "name": "沒有人",
//               "app_id": null,
//               "value": 0.95864904
//             },
//             {
//               "id": "ai_6lhccv44",
//               "name": "商业",
//               "app_id": null,
//               "value": 0.95720303
//             },
//             {
//               "id": "ai_971KsJkn",
//               "name": "跑道",
//               "app_id": null,
//               "value": 0.9494642
//             },
//             {
//               "id": "ai_WBQfVV0p",
//               "name": "城市",
//               "app_id": null,
//               "value": 0.94089437
//             },
//             {
//               "id": "ai_dSCKh8xv",
//               "name": "快速的",
//               "app_id": null,
//               "value": 0.9399334
//             },
//             {
//               "id": "ai_TZ3C79C6",
//               "name": "马路",
//               "app_id": null,
//               "value": 0.93121606
//             },
//             {
//               "id": "ai_VSVscs9k",
//               "name": "终点站",
//               "app_id": null,
//               "value": 0.9230834
//             }
//           ]
//         }
//       }
//     ]
//   }

