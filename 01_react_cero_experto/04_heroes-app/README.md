# HEROES APP

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

2. Actualizar los scripts del __package.json__
```
"scripts: {
    ...
    "test": "jest",
    "test:watch": "jest --watchAll",
}
```

3. Crear la configuración de babel __babel.config.js__
```
module.exports = {
    presets: [
        [ '@babel/preset-env', { targets: { esmodules: true } } ],
        [ '@babel/preset-react', { runtime: 'automatic' } ],
    ],
};
```

4. Opcional, pero eventualmente necesario, crear Jest config y setup:

__jest.config.js__
```
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
}
```