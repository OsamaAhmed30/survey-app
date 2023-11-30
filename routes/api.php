<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\DashboardController;
use App\Http\Controllers\api\SurveyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function(){
Route::get('/me' , [AuthController::class , 'me']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::apiResource('survey',SurveyController::class);
Route::get('/dashboard' , [DashboardController::class , 'index']);
Route::get('survey/answer/{survey:id}',[SurveyController::class,'showAnswer']);
});


Route::post('/signup' , [AuthController::class , 'signup']);
Route::post('/login' , [AuthController::class , 'login']);
Route::get('survey/get-by-slug/{survey:slug}' , [SurveyController::class , 'getBySlug']);
Route::post('/survey/{survey}/answer' , [SurveyController::class , 'storeAnswer']);
