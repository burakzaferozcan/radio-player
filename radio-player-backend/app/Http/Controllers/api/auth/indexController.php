<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class indexController extends BaseController
{
    public function login(Request $request){
        $data =$request->except("_token");
        $client=User::where("email",$request->$data["email"])->first();

        if($client&&Hash::check($data["password"],$client->password)){
            $token=$client->createToken("radio")->accessToken;
            return parent::success("Kullanıcı girişi gerçekleştirildi",[
                "id"=> $client->id,
                "name"=> $client->name,
                "email"=> $client->email,
                "url"=> $client->url,
                "channel"=> $client->channel,
                "token_type"=> "Bearer",
                "token"=> $token,
            ]);
        }else{
            return parent::error("Kullanıcı bilgileri hatalı",404);
        }
    }


}
