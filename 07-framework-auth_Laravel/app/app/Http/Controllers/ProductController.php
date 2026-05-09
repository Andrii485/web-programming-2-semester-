<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

class ProductController extends Controller
{
    #[OA\Get(
        path: "/api/products",
        summary: "Список всіх продуктів",
        security: [["keycloak_client_credentials" => []], ["keycloak_auth_code" => []]],
        responses: [
            new OA\Response(response: 200, description: "OK"),
            new OA\Response(response: 401, description: "Unauthorized"),
            new OA\Response(response: 403, description: "Forbidden - немає ролі ProductsApiViewer")
        ]
    )]
    public function index(): JsonResponse
    {
        return response()->json([
            ['id' => 1, 'name' => 'Product A', 'price' => 100],
            ['id' => 2, 'name' => 'Product B', 'price' => 200],
        ]);
    }

    #[OA\Get(
        path: "/api/products/{id}",
        summary: "Отримати один продукт",
        security: [["keycloak_client_credentials" => []], ["keycloak_auth_code" => []]],
        parameters: [new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))],
        responses: [
            new OA\Response(response: 200, description: "OK"),
            new OA\Response(response: 401, description: "Unauthorized"),
            new OA\Response(response: 403, description: "Forbidden - немає ролі ProductsApiViewer")
        ]
    )]
    public function show(int $id): JsonResponse
    {
        return response()->json(['id' => $id, 'name' => 'Product A', 'price' => 100]);
    }

    #[OA\Post(
        path: "/api/products",
        summary: "Створити продукт",
        security: [["keycloak_client_credentials" => []], ["keycloak_auth_code" => []]],
        responses: [
            new OA\Response(response: 201, description: "Created"),
            new OA\Response(response: 401, description: "Unauthorized"),
            new OA\Response(response: 403, description: "Forbidden - немає ролі ProductsApiWriter")
        ]
    )]
    public function store(): JsonResponse
    {
        return response()->json(['message' => 'Product created'], 201);
    }

    #[OA\Put(
        path: "/api/products/{id}",
        summary: "Оновити продукт",
        security: [["keycloak_client_credentials" => []], ["keycloak_auth_code" => []]],
        parameters: [new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))],
        responses: [
            new OA\Response(response: 200, description: "OK"),
            new OA\Response(response: 401, description: "Unauthorized"),
            new OA\Response(response: 403, description: "Forbidden - немає ролі ProductsApiWriter")
        ]
    )]
    public function update(int $id): JsonResponse
    {
        return response()->json(['message' => "Product $id updated"]);
    }

    #[OA\Delete(
        path: "/api/products/{id}",
        summary: "Видалити продукт",
        security: [["keycloak_client_credentials" => []], ["keycloak_auth_code" => []]],
        parameters: [new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))],
        responses: [
            new OA\Response(response: 200, description: "OK"),
            new OA\Response(response: 401, description: "Unauthorized"),
            new OA\Response(response: 403, description: "Forbidden - немає ролі ProductsApiWriter")
        ]
    )]
    public function destroy(int $id): JsonResponse
    {
        return response()->json(['message' => "Product $id deleted"]);
    }
}