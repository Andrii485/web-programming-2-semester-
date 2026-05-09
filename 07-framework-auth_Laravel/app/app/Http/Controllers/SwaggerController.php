<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(title: "Products API", version: "1.0.0", description: "API для управління продуктами")]
#[OA\Server(url: "http://localhost:8000", description: "Local server")]
#[OA\SecurityScheme(
    securityScheme: "keycloak_client_credentials",
    type: "oauth2",
    flows: [new OA\Flow(
        flow: "clientCredentials",
        tokenUrl: "http://localhost:8080/realms/master/protocol/openid-connect/token",
        scopes: []
    )]
)]
#[OA\SecurityScheme(
    securityScheme: "keycloak_auth_code",
    type: "oauth2",
    flows: [new OA\Flow(
        flow: "authorizationCode",
        authorizationUrl: "http://localhost:8080/realms/master/protocol/openid-connect/auth",
        tokenUrl: "http://localhost:8080/realms/master/protocol/openid-connect/token",
        scopes: []
    )]
)]
class SwaggerController extends Controller
{
}