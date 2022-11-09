const express = require('express');
const router = express.Router();
const cloudinary = require("cloudinary").v2;
require('dotenv');

const options = {
      secure:true,
      cloud_name: process.env.C_NAME, 
      api_key: process.env.C_KEY, 
      api_secret: process.env.C_SECRET,
      folder: 'renegade'
}
cloudinary.config(options);

const signuploadform = () => {
  const timestamp = Math.round((new Date).getTime()/1000);

  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    folder: 'renegade'
  }, 
    process.env.C_SECRET);

  return { timestamp, signature }
}

  // using this API should require authentication
  router.get('/signature', function (req, res, next) {
    const sig = signuploadform()
    res.json({
      signature: sig.signature,
      timestamp: sig.timestamp,
      cloudname: process.env.C_NAME,
      apikey: process.env.C_KEY
    })
  })

  
  router.post('/',async (req, res) => {
    try{
      //await runMiddleware(myUploadMiddleware,req,res);
      let cldRes = await uploadDefault(req.file, res);
      res.status(200).json(cldRes);
    }catch(error){
      console.log(error);
      res.status(500).send({
        message: error.message
      })
    }
  
  });
  

module.exports = router;