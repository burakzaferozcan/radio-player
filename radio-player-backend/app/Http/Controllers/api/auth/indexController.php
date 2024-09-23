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

    public function register(Request $request){
        $data=$request->except("_token","password_confirmation");
        $data["password"] = Hash::make($data["password"]);
        $create=User::create($data);
        if( $create ){
            return parent::success("Kullanıcı kayıt işlemi başarılı",[$create],201);
        }else{
            return parent::error("Kullanıcı Kayıt işleminde hata oluştu",404);
        }
    }

    public function profile(Request $request){
        $client=$request->user();

        return parent::success("Kullanıcı bilgileri getirildi.",["user"=>$client]);
    }

    public function update(Request $request){
        $client=$request->user();
        $data=$request->except("_token");
        $update=User::where("id",+$client->id)->update([
            "url"=> $data["url"],
            "channel"=> $data["channel"],
        ]);
        if($update){
            $token=$client->createToken("radio")->accessToken;
            return response()->json([
                "success"=> true,
                "title"=> "Başarılı",
                "text"=> "İşlem başarılı",
                "isLoggedIn"=> true,
                "data"=>[
                    "id"=> $client->id,
                    "name"=> $client->name,
                    "email"=> $client->email,
                    "url"=> $data["url"],
                    "channel"=> $data["channel"],
                    "token_type"=> "Bearer",
                    "token"=> $token,
                ],
            ]);
        }else{
            return response()->json([
                "success"=> false,
                "title"=> "Hata",
                "text"=> "İşlem Başarısız",
            ]);
        }
    }
    public function check(Request $request){
        $client=$request->user();

        if($client){
            $token=$client->createToken("radio")->accessToken;
            return response()->json([
                "success"=> true,
                "isLoggedIn"=> true,
                "data"=>[
                    "id"=> $client->id,
                    "name"=> $client->name,
                    "email"=> $client->email,
                    "url"=> $client->url,
                    "channel"=> $client->channel,
                    "token_type"=> "Bearer",
                    "token"=> $token,
                ]
            ]);

        }else{
            return response()->json([
                "success"=>false,
                "isLoggedIn"=>false,
            ]);
        }

    }
}
