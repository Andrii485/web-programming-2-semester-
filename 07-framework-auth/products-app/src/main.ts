import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setVersion('1.0')
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          clientCredentials: {
            tokenUrl: 'http://localhost:8080/realms/Andrey/protocol/openid-connect/token',
            scopes: { openid: 'OpenID' },
          },
          authorizationCode: {
            authorizationUrl: 'http://localhost:8080/realms/Andrey/protocol/openid-connect/auth',
            tokenUrl: 'http://localhost:8080/realms/Andrey/protocol/openid-connect/token',
            scopes: { openid: 'OpenID' },
          },
        },
      },
      'oauth2',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();