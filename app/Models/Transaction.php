<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id', 'type', 'client', 'discount', 'currency', 'total', 'note', 'goal', 'status',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity', 'value', 'measure', 'discount', 'total');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function scopeWhenUser($query, $request)
    {
        return $query->when(isset($request['user_id']), function ($query) use ($request) {
            $query->where('user_id', $request['user_id']);
        });
    }

    public function scopeWhenFromTo($query, $request)
    {
        return $query->when(isset($request['from']), function ($query) use ($request) {
            $query->where(function ($query) use ($request) {
                $query->whereDate('created_at', '>=', $request['from'])
                    ->orWhereHas('payments', function ($query) use ($request) {
                        $query->whereDate('created_at', '>=', $request['from']);
                    });
            });
        }, function ($query) {
            $query->where(function ($query) {
                $query->whereDate('created_at', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
                    ->orWhereHas('payments', function ($query) {
                        $query->whereDate('created_at', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'));
                    });
            });
        })->when(isset($request['to']), function ($query) use ($request) {
            $query->where(function ($query) use ($request) {
                $query->whereDate('created_at', '<=', $request['to'])
                    ->orWhereHas('payments', function ($query) use ($request) {
                        $query->whereDate('created_at', '<=', $request['to']);
                    });
            });
        });
    }

    public function scopeWhenStatus($query, $status)
    {
        return $query->when($status, function ($query) use ($status) {
            $query->where('status', $status);
        });
    }
}
