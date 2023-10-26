<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProfileRequest;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Profile/Index', [
            'profile' => auth()->user(),
            'settings' => Setting::all(['key', 'value']),
        ]);
    }

    public function update(ProfileRequest $request)
    {
        $user = User::find(auth()->id());

        $user->fill([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        if ($request->settings) {
            foreach ($request->settings as $key => $value) {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value]
                );
            }
        }

        return redirect()->route('dashboard.index');
    }
}
