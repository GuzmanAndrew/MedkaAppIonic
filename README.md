# bmed-app

Bmed: Aplicación de monitoreo

## Instalación local

Use estos comandos para instalar y probar localmente:

- Instalar Ionic CLI: `npm install -g @ionic/cli`

- Instalar Angular CLI: `npm install -g @angular/cli`

- Clonar repositorio: `git clone https://github.com/angelxehg/medka-app.git`

- Instalar dependencias: `cd medka-app` & `npm install`

- Iniciar servidor de desarrollo: `ionic serve`

## Instalación en dispositivos

Use estos comandos para instalar y compilar en dispositivos:

- Añadir plataforma nativa (si no se ha añadido antes): `ionic cap add [android/ios]`. Posiblemente necesites ejecutar antes `ionic build --prod`

Nota: La plataforma android ya ha sido configurada, asi que puedes pasar al siguiente comando.

- Sincronizar assets y plugins con la plataforma: `ionic cap sync [android/ios] --prod`. Este comando:
  - Compila los assets web (ng build). Usar flag `--prod` para hacerlo en modo producción.
  - Compiar assets web a la plataforma nativa
  - Actualizar Capacitor, plataforma nativa y plugins

- Abre el proyecto nativo (requiere Android Studio o XCode) `ionic cap open [android/ios]`

Nota: Operaciones de compilación, y live-run tambien son posibles desde CLI con [Capacitor 3](https://capacitorjs.com/docs/getting-started/with-ionic)

## Pruebas y calidad

Use estos comandos para verificar la calidad del código:

- Code linting: `ng lint`

- Unit testing: `ng test`

- E2E testing: `ng e2e`
