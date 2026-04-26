# OAuth2 Authorization Testing Report

## Environment

- Authorization Server: Keycloak
- Base URL: http://localhost:8080
- Realm: Andrey

---

## 1. Authorization Code Flow

Client: auth-code-client

### Step 1 - Отримати code

GET /realms/Andrey/protocol/openid-connect/auth

#### Query parameters
- client_id=auth-code-client
- response_type=code
- scope=openid
- redirect_uri=https://oauth.pstmn.io/v1/callback

#### Response


### Step 2 - Обміняти code на токен

POST /realms/Andrey/protocol/openid-connect/token

#### Body parameters
- grant_type=authorization_code
- client_id=auth-code-client
- client_secret=<secret>
- code=<code_from_redirect>
- redirect_uri=https://oauth.pstmn.io/v1/callback

#### Response
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJTM1luNUROMk03T2Iyb0s1Y0dCVFVmX010MVl2NkhQUWNuNW8xdjRJZXlVIn0.eyJleHAiOjE3NzcxODQxMDMsImlhdCI6MTc3NzE4MzgwMywiYXV0aF90aW1lIjoxNzc3MTgyODAyLCJqdGkiOiJvbnJ0YWM6MGI5NTFkZGItNDQ1Yi01MjRjLTY5YWItMWM5ZDNjN2RkOTUyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9BbmRyZXkiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZGI3YzIyYTYtNTVmNi00YTI3LTg3N2EtOTEyY2IzZDVlYTI4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYXV0aC1jb2RlLWNsaWVudCIsInNpZCI6ImdhWkFMT2JiTzhMbXhKbWtXd0N5TElFaSIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWFuZHJleSIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IlRlc3QgVXNlciIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3R1c2VyIiwiZ2l2ZW5fbmFtZSI6IlRlc3QiLCJmYW1pbHlfbmFtZSI6IlVzZXIiLCJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIn0.fKNi3g-IqlWVTO3ihQisRUvgGFpwjCXKRmrh5VmemIZ7sDIzBhyYVWvbbYja4VY1gK_pHn-fVy82jYluwXWDr-4pv0HIQlxxMU6KqXDzeJWJfv5RlqARZYbwuTavph-1YUUQtI_Vz_Y5dzG1p-JZ43WJDuY0ZQcKBa4aEnx1KPlIyRZdxc7-4Ai4eNBasH_GptoSYxPXPuPlkCZLWAVmP8LskZPYln7MCjAqsGJ7MfiFM4ktbRCEV_Jax5D1jVJ3aGL190Kns_hhapV6cFpCjpe73B_slCVeTvoJ2MXsRcCdZbvgqsmKZ8CzVYywDMJ5xcakvPCo8JUrdCp4aRFjmg",
  "expires_in": 299,
  "refresh_expires_in": 1799,
  "refresh_token": "",
  "token_type": "Bearer",
  "id_token": "",
  "not-before-policy": 0,
  "session_state": "",
  "scope": "openid profile email"
}
```

---

## 2. Implicit Flow

Client: implicit-client

GET /realms/Andrey/protocol/openid-connect/auth

#### Query parameters
- client_id=implicit-client
- response_type=token
- scope=openid
- redirect_uri=https://oauth.pstmn.io/v1/callback

#### Response


---

## 3. Resource Owner Password Credentials Flow

Client: password-client

POST /realms/Andrey/protocol/openid-connect/token

#### Body parameters
- grant_type=password
- client_id=password-client
- client_secret=<secret>
- username=testuser
- password=<password>

#### Response
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJTM1luNUROMk03T2Iyb0s1Y0dCVFVmX010MVl2NkhQUWNuNW8xdjRJZXlVIn0.eyJleHAiOjE3NzcxOTkwNTAsImlhdCI6MTc3NzE5ODc1MCwianRpIjoib25ydHJvOjNjMDc3YjIyLWRkZWUtYzUzNS0wZDg3LTI5MzRiYmM5MTEwYSIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvQW5kcmV5IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImRiN2MyMmE2LTU1ZjYtNGEyNy04NzdhLTkxMmNiM2Q1ZWEyOCIsInR5cCI6IkJlYXJlciIsImF6cCI6InBhc3N3b3JkLWNsaWVudCIsInNpZCI6IkxVUjRBVlVLbWhzZnQxVHNySkxQcFFkVSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtYW5kcmV5IiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiVGVzdCBVc2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdHVzZXIiLCJnaXZlbl9uYW1lIjoiVGVzdCIsImZhbWlseV9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20ifQ.eQEOLgh1ZV1xydQNQAPak83D1RKpcmXzr-V3Q2gTwceUZwb-iHBtcqDMSyti2WSd9d6tfkJ3LIPIly6HaG5gB1Zw92k3XJ30cBttmj7QyiIm8KYxV4eUugICEgX1CJQ0TczgwGYBDeaEgQp0jTUvw1opIXl8X_I4XWfwnCMVGPKqDvalhqydk4TM_n8WebMBJi4fskmHAPLVev2DYOumlyUbXbMxKA3ZP_3J-2DZmBjj-hRNPEta_1hMUbsMnPP8-PUnn6uTB1n792fDq9DhijekLc-JeFjLFUHeIivDtpMq042ttifxutm4Z2GnnAnOe2b_Ioxs__himy6128P7Eg",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "",
  "token_type": "Bearer",
  "not-before-policy": 0,
  "session_state": "",
  "scope": "openid profile email"
}
```

---

## 4. Client Credentials Flow

Client: client-credentials-client

POST /realms/Andrey/protocol/openid-connect/token

#### Body parameters
- grant_type=client_credentials
- client_id=client-credentials-client
- client_secret=<secret>

#### Response
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJTM1luNUROMk03T2Iyb0s1Y0dCVFVmX010MVl2NkhQUWNuNW8xdjRJZXlVIn0.eyJleHAiOjE3NzcxOTk1MzIsImlhdCI6MTc3NzE5OTIzMiwianRpIjoidHJydGNjOjdmNzI1Y2Q2LTljYmQtZjJmMy0xYzRjLWY4YThkYzNkM2JjZSIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvQW5kcmV5IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImJkNjc3YzdkLTIxMWUtNGM1Zi04NTRhLTlmY2MyMzNjZDA4ZiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNsaWVudC1jcmVkZW50aWFscy1jbGllbnQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWFuZHJleSIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjE3Mi4xNy4wLjEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtY2xpZW50LWNyZWRlbnRpYWxzLWNsaWVudCIsImNsaWVudEFkZHJlc3MiOiIxNzIuMTcuMC4xIiwiY2xpZW50X2lkIjoiY2xpZW50LWNyZWRlbnRpYWxzLWNsaWVudCJ9.hQbMYroum3K6lH174qM722UTAFMK-aF9_CCZO_L4NEgR3zS7APYLfOEQtHxXccnNeOpYWqVL2OBOCj9LiNBK3boXWoqRQzEb1hMrf7GvABAYnG4EyHePKySxaEoqOdibj7HoG-WFWY-SuzNadTopvHeyP8CKOkjJWSZ0AvRC4YjuAC_w0t8g86AB-Y-BeokLwqRL_txnLr9HJhAsh7j2m9BPn-1Wh1afrFxpaO5cra2hU-93wHZR_p5QuMtr47n7Sdkca1WY7YpmqNyvf93iRVVzBExB-ZXJBHMcq4K5-13ZYNQ9v5QrONzTIEgjIfIau8poYsSavZ6J874tU0LgDw",
  "expires_in": 299,
  "refresh_expires_in": 0,
  "token_type": "Bearer",
  "not-before-policy": 0,
  "scope": "openid profile email"
}
```

Note: Refresh token is absent - this is expected for Client Credentials Flow

---

## Summary

| Flow | Client | Refresh Token | User Required |
|---|---|---|---|
| Authorization Code | auth-code-client | yes | yes |
| Implicit | implicit-client | no | yes |
| Password | password-client | yes | yes |
| Client Credentials | client-credentials-client | no | no |