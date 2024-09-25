<?php

namespace App\Http\Controllers\api\favourite;

use App\Http\Controllers\api\BaseController;
use App\Models\FavouriteModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request){
        $client = $request->user();
        $radios = FavouriteModel::leftJoin("radios","radios.rd_id","=","favourites.fw_radio")
        ->where("favourites.fw_user",$client->id)->get();
        return parent::success("Favori listesi getirildi",$radios);
    }
}