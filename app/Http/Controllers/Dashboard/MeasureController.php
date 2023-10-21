<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\MeasureRequest;
use App\Repositories\MeasureRepository;

class MeasureController extends Controller
{
    public function __construct(
        private readonly MeasureRepository $measureRespository
    ) {
    }

    public function index()
    {
        return inertia('Dashboard/Measure/Index', [
            'measures' => $this->measureRespository->getAll(),
        ]);
    }

    public function store(MeasureRequest $request)
    {
        $this->measureRespository->store($request->validated());

        return back();
    }

    public function update(MeasureRequest $request, $measure)
    {
        $this->measureRespository->update($measure, $request->validated());

        return back();
    }

    public function destroy($measure)
    {
        $this->measureRespository->destroy($measure);

        return back();
    }
}
