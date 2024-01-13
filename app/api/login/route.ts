import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {

  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');

  // mongoose.connect('mongodb+srv://dsuryavamsi:OYcOCydrwd9Bc400@cluster0.retjlje.mongodb.net/Portfolio?retryWrites=true', {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  // }).then(r => console.log("Connected!!"));

  // Create a schema for access tokens

  // Data to be sent in the POST request
  const postData = {
      code: code,
      client_id: process.env.NEXT_PUBLIC_UPSTOX_CLIENT_ID,
      client_secret:process.env.UPSTOX_CLIENT_SECRET,
      redirect_uri:process.env.NEXT_PUBLIC_UPSTOX_REDIRECT_URI,
      grant_type:'authorization_code'
  };

  let config = {
    method: 'post',
    data:postData,
    maxBodyLength: Infinity,
    url: 'https://api.upstox.com/v2/login/authorization/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  };


  axios(config)
    .then(async (response: { data: { user_id: any; access_token: any; }; }) => {
      console.log(response);
      // const accessTokenDocument = await AccessToken.findOneAndUpdate(
      //   { userId: response.data.user_id },
      //   { token: response.data.access_token },
      //   { new: true, upsert: true }
      // ).exec();
      return NextResponse.redirect("http://localhost:3000/dashboard");
    })
    .catch((error) => {
      console.log(error);
      return NextResponse.json({ error: 'Internal Server Error'}, { status: 500 })    
    });
    return NextResponse.redirect("http://localhost:3000/dashboard");
}