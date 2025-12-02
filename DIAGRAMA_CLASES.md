# Diagrama de Clases - Motor de Notificaciones ChaMarket

## Diagrama UML Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                      <<interface>>                               │
│                      INotificador                                │
├─────────────────────────────────────────────────────────────────┤
│ + notificar(Notificacion): void                                 │
└────────────────────────────▲────────────────────────────────────┘
                             │
                             │ implements
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         │                   │                   │
┌────────┴──────────┐ ┌──────┴────────┐ ┌───────┴──────────┐
│  WhatsApp         │ │    Email      │ │  PushNotification│
├───────────────────┤ ├───────────────┤ ├──────────────────┤
│ - apiCredencial   │ │ - servidorSMTP│ │ - servicioFirebase│
├───────────────────┤ ├───────────────┤ ├──────────────────┤
│ + notificar()     │ │ + notificar() │ │ + notificar()    │
│ + conectarServ..()│ │ + conectarServ│ │ + conectarGateway│
│                   │ │   icioSMTP()  │ │   Firebase()     │
└───────────────────┘ └───────────────┘ └──────────────────┘




┌─────────────────────────────────────────────────────────────────┐
│                       Notificador                                │
│                       (Contexto)                                 │
├─────────────────────────────────────────────────────────────────┤
│ - estrategias: Map<string, INotificador>                        │
│ - configEventos: Map<string, string[]>                          │
├─────────────────────────────────────────────────────────────────┤
│ + notificar(Notificacion): void                                 │
│ + notificarPorCanales(Notificacion, canales[]): void            │
│ + registrarEstrategia(nombre, estrategia): void                 │
│ + configurarEvento(tipo, canales[]): void                       │
│ + obtenerCanalesParaEvento(tipo): string[]                      │
│ + listarEstrategias(): void                                     │
│ + listarConfiguracionEventos(): void                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ usa
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Notificacion                              │
│                        (Modelo)                                  │
├─────────────────────────────────────────────────────────────────┤
│ - destinatario: string                                          │
│ - mensaje: string                                               │
│ - asunto: string                                                │
│ - tipo: string                                                  │
│ - fecha: Date                                                   │
├─────────────────────────────────────────────────────────────────┤
│ + constructor(destinatario, mensaje, asunto, tipo)              │
└─────────────────────────────────────────────────────────────────┘
```

## Descripción de Componentes

### 1. INotificador (Interfaz)

**Responsabilidad**: Define el contrato que deben cumplir todas las estrategias de notificación.

**Métodos**:

- `notificar(Notificacion): void` - Método abstracto que envía la notificación

**Patrón**: Strategy (Interface)

---

### 2. NotificadorWhatsApp (Estrategia Concreta)

**Responsabilidad**: Implementa el envío de notificaciones por WhatsApp.

**Atributos**:

- `apiCredencial: string` - Credenciales para API de Twilio/Meta

**Métodos**:

- `notificar(Notificacion): void` - Envía mensaje por WhatsApp
- `conectarServicioWhatsApp(telefono, mensaje): boolean` - Conecta con API externa

**Servicios externos**: Twilio, Meta Business API

---

### 3. NotificadorEmail (Estrategia Concreta)

**Responsabilidad**: Implementa el envío de notificaciones por correo electrónico.

**Atributos**:

- `servidorSMTP: string` - Servidor SMTP
- `puerto: number` - Puerto de conexión

**Métodos**:

- `notificar(Notificacion): void` - Envía email
- `conectarServicioSMTP(email, asunto, cuerpo): boolean` - Conecta con SMTP

**Servicios externos**: SendGrid, Mailgun, SMTP genérico

---

### 4. NotificadorPush (Estrategia Concreta)

**Responsabilidad**: Implementa el envío de notificaciones push móviles.

**Atributos**:

- `servicioFirebase: string` - Credenciales de Firebase

**Métodos**:

- `notificar(Notificacion): void` - Envía push notification
- `conectarGatewayFirebase(deviceId, titulo, mensaje): boolean` - Conecta con FCM

**Servicios externos**: Firebase Cloud Messaging, OneSignal

---

### 5. Notificador (Contexto)

**Responsabilidad**: Orquesta el envío de notificaciones, selecciona estrategias y gestiona la configuración.

**Atributos**:

- `estrategias: Map<string, INotificador>` - Registro de estrategias disponibles
- `configEventos: Map<string, string[]>` - Mapeo de eventos a canales

**Métodos principales**:

- `notificar(Notificacion): void` - Envía notificación según configuración de evento
- `notificarPorCanales(Notificacion, canales[]): void` - Envía por canales específicos
- `registrarEstrategia(nombre, estrategia): void` - Agrega nueva estrategia (extensibilidad)
- `configurarEvento(tipo, canales[]): void` - Define canales para un evento
- `obtenerCanalesParaEvento(tipo): string[]` - Consulta configuración
- `listarEstrategias(): void` - Muestra estrategias disponibles
- `listarConfiguracionEventos(): void` - Muestra configuración de eventos

**Patrón**: Strategy (Context)

---

### 6. Notificacion (Modelo)

**Responsabilidad**: Representa los datos de una notificación en el sistema.

**Atributos**:

- `destinatario: string` - Email, teléfono o device ID
- `mensaje: string` - Contenido del mensaje
- `asunto: string` - Título o asunto
- `tipo: string` - Tipo de evento (promocion, stock_minimo, etc.)
- `fecha: Date` - Timestamp de creación

**Métodos**:

- `constructor(destinatario, mensaje, asunto, tipo)` - Inicializa la notificación

---

## Relaciones entre Clases

### Herencia (implements)

```
INotificador
    ↑
    ├── NotificadorWhatsApp
    ├── NotificadorEmail
    └── NotificadorPush
```

Las tres estrategias concretas implementan la interfaz `INotificador`.

### Composición (usa/tiene)

```
Notificador
    ├── contiene → Map<INotificador>
    └── usa → Notificacion
```

El `Notificador` contiene un registro de estrategias y recibe objetos `Notificacion`.

### Dependencia

```
Notificador → INotificador
```

El contexto depende de la abstracción, no de implementaciones concretas (Dependency Inversion Principle).

---

## Flujo de Interacción

### Secuencia de envío de notificación:

```
    Usuario                Notificador              INotificador
       │                        │                        │
       │  notificar(notif)      │                        │
       ├───────────────────────>│                        │
       │                        │                        │
       │                        │ obtenerCanales(tipo)   │
       │                        ├──────────┐             │
       │                        │<─────────┘             │
       │                        │                        │
       │                        │  estrategias['whatsapp'].notificar()
       │                        ├───────────────────────>│
       │                        │                        │
       │                        │  estrategias['email'].notificar()
       │                        ├───────────────────────>│
       │                        │                        │
       │      resultado         │                        │
       │<───────────────────────┤                        │
```

---

## Configuración de Eventos (Ejemplo)

| Tipo de Evento      | Canales               |
| ------------------- | --------------------- |
| promocion           | whatsapp, email       |
| stock_minimo        | push                  |
| mantenimiento       | email, push           |
| nuevo_pedido        | whatsapp, push        |
| confirmacion_compra | email, whatsapp       |
| alerta_seguridad    | email, push, whatsapp |

Esta configuración es **declarativa** y permite cambios sin modificar código.

---

## Extensibilidad - Agregar Nuevo Canal

### Ejemplo: Agregar SMS

1. **Crear nueva estrategia**:

```javascript
class NotificadorSMS extends INotificador {
  notificar(notificacion) {
    // Implementación
  }
}
```

2. **Registrar en el sistema**:

```javascript
motor.registrarEstrategia("sms", new NotificadorSMS());
```

3. **Configurar eventos**:

```javascript
motor.configurarEvento("codigo_verificacion", ["sms"]);
```

**NO se modifica ninguna clase existente** ✅ (Open/Closed Principle)

---

## Principios SOLID Aplicados

### ✅ Single Responsibility Principle (SRP)

- Cada estrategia tiene UNA responsabilidad: su canal específico
- El contexto solo orquesta, no implementa lógica de envío

### ✅ Open/Closed Principle (OCP)

- Abierto para extensión: `registrarEstrategia()`
- Cerrado para modificación: No se editan clases existentes

### ✅ Liskov Substitution Principle (LSP)

- Cualquier estrategia puede reemplazar a otra sin romper el sistema

### ✅ Interface Segregation Principle (ISP)

- Interfaz mínima: solo `notificar()`
- No se fuerza a implementar métodos innecesarios

### ✅ Dependency Inversion Principle (DIP)

- El contexto depende de `INotificador` (abstracción)
- No depende de implementaciones concretas

---

## Ventajas del Diseño

✅ **Escalable**: Agregar canales sin modificar código  
✅ **Mantenible**: Responsabilidades claras y separadas  
✅ **Testeable**: Cada estrategia se puede probar aisladamente  
✅ **Flexible**: Combinación dinámica de canales  
✅ **Sin acoplamiento**: Estrategias independientes entre sí

---

**Fin del Diagrama de Clases**
