<?php

namespace App\Services;

use App\Models\Subscriber;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SubscriberService
{
  
    public function getSubscribers(array $params): LengthAwarePaginator
    {
        $sortBy = $params['sort_by'] ?? 'created_at';
        $sortOrder = $params['sort_order'] ?? 'desc';
        $perPage = $params['per_page'] ?? 10;

        return Subscriber::with('subscriptions')
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage);
    }

    public function createSubscriber(array $data): Subscriber
    {
        return Subscriber::create($data);
    }

public function updateSubscriber(Subscriber $subscriber, array $data): Subscriber {
    $subscriber->update($data);
    return $subscriber;
}

public function deleteSubscriber(Subscriber $subscriber): void {
    $subscriber->delete();
}
}