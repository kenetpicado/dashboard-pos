<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\UserRequest;
use App\Repositories\UserRepository;

class UserController extends Controller
{
    public function __construct(
        private readonly UserRepository $userRepository
    ) {
    }

    public function index()
    {
        return inertia('Dashboard/User/Index', [
            'users' => $this->userRepository->getAll(),
        ]);
    }

    public function store(UserRequest $request)
    {
        $this->userRepository->store($request->validated());

        return redirect()->route('dashboard.users.index');
    }

    public function update(UserRequest $request, $user)
    {
        $this->userRepository->update($user, $request->validated());

        return back();
    }

    public function destroy($user)
    {
        $this->userRepository->destroy($user);

        return back();
    }
}
