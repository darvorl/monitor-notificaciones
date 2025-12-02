# 🏪 Motor de Notificaciones - ChaMarket

Sistema de notificaciones escalable y flexible para plataforma de ecommerce, implementado usando el **Patrón Strategy** y principios SOLID.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Patrones de Diseño](#patrones-de-diseño)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Canales Disponibles](#canales-disponibles)
- [Instalación y Uso](#instalación-y-uso)
- [Flujo del Sistema](#flujo-del-sistema)
- [Extensibilidad](#extensibilidad)
- [Ejemplos de Uso](#ejemplos-de-uso)

## 🎯 Descripción

Motor de notificaciones diseñado para **ChaMarket**, que permite enviar mensajes a bodegueros a través de múltiples canales de comunicación. El sistema es escalable, mantenible y sigue las mejores prácticas de diseño de software.

### Características principales:

✅ **Múltiples canales**: WhatsApp, Email, Push Notifications  
✅ **Combinación de canales**: Un evento puede usar varios canales simultáneamente  
✅ **Extensible**: Agregar nuevos canales sin modificar código existente  
✅ **Sin if/else gigantes**: Configuración declarativa de eventos  
✅ **Patrón Strategy**: Intercambio dinámico de algoritmos de notificación  
✅ **Principio Open/Closed**: Abierto para extensión, cerrado para modificación

## 🏗️ Patrones de Diseño

### Patrón Strategy

El patrón Strategy permite definir una familia de algoritmos (estrategias de notificación), encapsular cada uno y hacerlos intercambiables.

**Componentes:**

1. **Interfaz Strategy** (`INotificador`)

   - Define el contrato común para todas las estrategias
   - Método: `notificar(notificacion)`

2. **Estrategias Concretas**

   - `NotificadorWhatsApp`: Envía mensajes por WhatsApp
   - `NotificadorEmail`: Envía correos electrónicos
   - `NotificadorPush`: Envía notificaciones push

3. **Contexto** (`Notificador`)
   - Orquesta el envío de notificaciones
   - Selecciona las estrategias según el tipo de evento
   - Permite registro dinámico de nuevas estrategias

## 📁 Estructura del Proyecto

```
motor-notificaciones/
│
├── src/
│   ├── interfaces/
│   │   └── INotificador.js          # Interfaz base (Strategy)
│   │
│   ├── models/
│   │   └── Notificacion.js          # Modelo de datos
│   │
│   ├── strategies/
│   │   ├── NotificadorWhatsApp.js   # Estrategia WhatsApp
│   │   ├── NotificadorEmail.js      # Estrategia Email
│   │   └── NotificadorPush.js       # Estrategia Push
│   │
│   ├── core/
│   │   └── Notificador.js           # Contexto (orquestador)
│   │
│   └── app.js                       # Aplicación de demostración
│
├── index.html                       # Interfaz web interactiva
├── README.md                        # Este archivo
└── DIAGRAMA_CLASES.md              # Diagrama UML del sistema
```

## 📡 Canales Disponibles

### 1. 📱 WhatsApp

- **Uso**: Comunicaciones comerciales externas
- **Requiere**: Número de teléfono del bodeguero
- **Servicio**: Twilio, Meta Business API
- **Ideal para**: Promociones, confirmaciones rápidas

### 2. 📧 Email

- **Uso**: Documentos, mensajes extensos, información oficial
- **Requiere**: Dirección de correo electrónico
- **Servicio**: SMTP, SendGrid, Mailgun
- **Ideal para**: Reportes, mantenimiento, confirmaciones formales

### 3. 🔔 Push Notification

- **Uso**: Alertas operativas directas a la app
- **Requiere**: Device ID del dispositivo móvil
- **Servicio**: Firebase Cloud Messaging, OneSignal
- **Ideal para**: Stock mínimo, nuevos pedidos, alertas urgentes

## 🚀 Instalación y Uso

### Opción 1: Interfaz Web Interactiva

1. Abre `index.html` en un navegador moderno
2. Usa el formulario para enviar notificaciones
3. Observa los logs en la consola de la interfaz

```bash
# En Windows con VS Code
start index.html
```

### Opción 2: Consola de Node.js

```bash
# Ejecutar el archivo de demostración
node src/app.js
```

### Opción 3: Importar en tu proyecto

```javascript
import Notificador from "./src/core/Notificador.js";
import Notificacion from "./src/models/Notificacion.js";

// Crear motor
const motor = new Notificador();

// Crear notificación
const notif = new Notificacion(
  "+51987654321",
  "Mensaje de prueba",
  "Asunto",
  "promocion"
);

// Enviar
motor.notificar(notif);
```

## 🔄 Flujo del Sistema

### 1. Creación de Notificación

```javascript
const notificacion = new Notificacion(
  destinatario, // Email, teléfono o device ID
  mensaje, // Contenido
  asunto, // Título
  tipo // Tipo de evento
);
```

### 2. Selección de Estrategias

El `Notificador` consulta su configuración interna:

```javascript
configEventos = {
  promocion: ["whatsapp", "email"],
  stock_minimo: ["push"],
  mantenimiento: ["email", "push"],
};
```

### 3. Ejecución de Estrategias

Para cada canal configurado:

- Obtiene la estrategia correspondiente
- Ejecuta `estrategia.notificar(notificacion)`
- Registra el resultado

### 4. Diagrama de Flujo

```
Usuario crea Notificacion
        ↓
Notificador.notificar()
        ↓
Consulta configEventos[tipo]
        ↓
Obtiene lista de canales: ['whatsapp', 'email']
        ↓
Para cada canal:
  ├─→ estrategias['whatsapp'].notificar()
  └─→ estrategias['email'].notificar()
        ↓
Registro de éxito/error
```

## 🔧 Extensibilidad

### ¿Cómo agregar un nuevo canal SIN modificar código existente?

**Ejemplo: Agregar canal SMS**

#### Paso 1: Crear la nueva estrategia

```javascript
import INotificador from "./interfaces/INotificador.js";

class NotificadorSMS extends INotificador {
  constructor() {
    super();
    this.apiSMS = "SMS_GATEWAY_KEY";
  }

  notificar(notificacion) {
    console.log("📱 Enviando SMS...");
    // Lógica de envío
    console.log(`A: ${notificacion.destinatario}`);
    console.log(`Mensaje: ${notificacion.mensaje}`);
  }
}
```

#### Paso 2: Registrar la estrategia

```javascript
const motor = new Notificador();

// Registrar nuevo canal (sin modificar código existente)
motor.registrarEstrategia("sms", new NotificadorSMS());
```

#### Paso 3: Configurar eventos que usen SMS

```javascript
// Agregar SMS a eventos existentes
motor.configurarEvento("promocion", ["whatsapp", "email", "sms"]);

// O crear nuevos eventos
motor.configurarEvento("codigo_verificacion", ["sms"]);
```

### Otros canales posibles:

- 📲 **In-App Message**: Mensajes dentro de la aplicación
- 🌐 **Web Banner**: Banners en la interfaz web
- 📟 **Telegram**: Mensajes por Telegram Bot
- 💬 **Slack**: Notificaciones en workspace de Slack
- 🔔 **Desktop Notification**: Notificaciones de escritorio

## 📝 Ejemplos de Uso

### Ejemplo 1: Promoción (WhatsApp + Email)

```javascript
const notif = new Notificacion(
  "+51987654321",
  "¡Mega oferta! 30% de descuento en todas las bebidas.",
  "Promoción Especial",
  "promocion"
);

motor.notificar(notif);
// Enviará por WhatsApp Y Email automáticamente
```

### Ejemplo 2: Stock Mínimo (Push)

```javascript
const notif = new Notificacion(
  "device_id_123",
  "ALERTA: Stock bajo de Coca Cola 1.5L (3 unidades)",
  "Stock Mínimo",
  "stock_minimo"
);

motor.notificar(notif);
// Enviará solo por Push Notification
```

### Ejemplo 3: Modo Manual (canales personalizados)

```javascript
const notif = new Notificacion(
  "bodeguero@chamarket.com",
  "Mensaje personalizado",
  "Prueba",
  "custom"
);

// Especificar canales manualmente
motor.notificarPorCanales(notif, ["email", "push"]);
```

### Ejemplo 4: Agregar nuevo canal SMS

```javascript
import NotificadorSMS from "./strategies/NotificadorSMS.js";

// Registrar SMS
motor.registrarEstrategia("sms", new NotificadorSMS());

// Configurar evento
motor.configurarEvento("codigo_verificacion", ["sms"]);

// Usar
const notif = new Notificacion(
  "+51987654321",
  "Tu código es: 123456",
  "Verificación",
  "codigo_verificacion"
);

motor.notificar(notif);
```

## 🎯 Ventajas del Diseño

### ✅ Sin if/else gigantes

❌ **Antes (código acoplado):**

```javascript
function enviarNotificacion(tipo, mensaje) {
  if (tipo === "promocion") {
    enviarWhatsApp(mensaje);
    enviarEmail(mensaje);
  } else if (tipo === "stock_minimo") {
    enviarPush(mensaje);
  } else if (tipo === "mantenimiento") {
    enviarEmail(mensaje);
    enviarPush(mensaje);
  }
  // ... más if/else
}
```

✅ **Ahora (configuración declarativa):**

```javascript
const configEventos = {
  promocion: ["whatsapp", "email"],
  stock_minimo: ["push"],
  mantenimiento: ["email", "push"],
};
```

### ✅ Principio Open/Closed

- **Abierto para extensión**: Agregar nuevos canales con `registrarEstrategia()`
- **Cerrado para modificación**: No se modifica código existente

### ✅ Single Responsibility

- Cada estrategia tiene UNA responsabilidad: su canal
- El contexto solo orquesta, no implementa lógica de envío

### ✅ Dependency Inversion

- Todas las estrategias dependen de la abstracción `INotificador`
- El contexto trabaja con la interfaz, no con implementaciones concretas

## 🧪 Testing

Para probar el sistema:

1. **Interfaz Web**: Abre `index.html` y usa los formularios
2. **Consola**: Ejecuta `node src/app.js`
3. **Ejemplos rápidos**: Usa los botones de ejemplo en la interfaz

## 📊 Diagrama UML

Ver archivo `DIAGRAMA_CLASES.md` para el diagrama completo de clases.

```
┌─────────────────────┐
│   <<interface>>     │
│    INotificador     │
├─────────────────────┤
│ + notificar()       │
└──────────▲──────────┘
           │
           │ implements
     ┌─────┴─────┬─────────┐
     │           │         │
┌────┴────┐ ┌───┴────┐ ┌──┴─────┐
│WhatsApp │ │ Email  │ │  Push  │
└─────────┘ └────────┘ └────────┘
```

## 👨‍💻 Autor

Proyecto desarrollado como ejercicio práctico de patrones de diseño para ChaMarket.

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

---

**¿Preguntas?** Consulta la documentación o revisa los ejemplos en `src/app.js` 🚀
