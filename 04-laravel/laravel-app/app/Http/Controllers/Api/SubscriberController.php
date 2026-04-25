<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IndexSubscriberRequest;
use App\Http\Requests\StoreSubscriberRequest;
use App\Http\Resources\SubscriberResource;
use App\Models\Subscriber;
use App\Services\SubscriberService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SubscriberController extends Controller
{
    public function __construct(
        protected SubscriberService $service
    ) {}

    public function index(IndexSubscriberRequest $request): AnonymousResourceCollection
    {
        $subscribers = $this->service->getSubscribers($request->validated());
        return SubscriberResource::collection($subscribers);
    }

    public function store(StoreSubscriberRequest $request): SubscriberResource
    {
        $subscriber = $this->service->createSubscriber($request->validated());
        return new SubscriberResource($subscriber);
    }


    public function show(Subscriber $subscriber): SubscriberResource
    {
        return new SubscriberResource($subscriber->load('subscriptions'));
    }


    public function update(Request $request, Subscriber $subscriber): SubscriberResource
    {
        $updatedSubscriber = $this->service->updateSubscriber($subscriber, $request->all());
        return new SubscriberResource($updatedSubscriber);
    }

    public function destroy(Subscriber $subscriber)
    {
        $this->service->deleteSubscriber($subscriber);
        return response()->noContent();
    }
}