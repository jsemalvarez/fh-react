## Configuraciones iniciales

[Documentacion](https://jestjs.io/es-ES/)

Instalar Jest
```
npm install --save-dev jest
```

Agregar scripts a tu package.json:
```
{
  "scripts": {
    "test": "jest"
  }
}
```

Type definitions para que VSCode nos suguiera opciones de sintaxis y evitar errores 
```
npm install --save-dev @types/jest
```

Configurar Babel para solucionar problemas de sintaxis moderna, ejemplo import y export:
```
npm install --save-dev babel-jest @babel/core @babel/preset-env
```
Configura Babel para tu versión actual de Node creando un fichero babel.config.js en la raíz de tu proyecto:
```
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```