# HOOKS APP

## Instalación
```
npm install
```

## SCRIPTS
```
"scripts: {
    "dev": "vite",
    "build": "vite build",
}
```

## Instalación y configuracion de Jest + React Testing Library en proyectos de React + Vite

1. Instalaciones:
```
npm add --dev jest babel-jest @babel/preset-env @babel/preset-react 
npm add --dev @testing-library/react @types/jest jest-environment-jsdom
```

2. Opcional: Si usamos Fetch API en el proyecto
Si usamos fetch, tenemos que tener en cuenta que es nativo en node a partir de la version 18. Cuando estamos desarrollando en React, como la app corre en el navegador funciona bien fecth, proque en el navegar en nativo. Pero los test se corren en el servidor, por eso esta configuracion

```
npm add --dev whatwg-fetch
```

3. Actualizar los scripts del __package.json__
```
"scripts: {
    ...
    "test": "jest",
    "test:watch": "jest --watchAll",
}
```

4. Crear la configuración de babel __babel.config.js__
```
module.exports = {
    presets: [
        [ '@babel/preset-env', { targets: { esmodules: true } } ],
        [ '@babel/preset-react', { runtime: 'automatic' } ],
    ],
};
```

5. Opcional, pero eventualmente necesario, crear Jest config y setup:

__jest.config.js__
```
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js']
}
```

__jest.setup.js__
```
// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- npm i whatwg-fetch
```