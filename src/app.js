import Notificador from "./core/Notificador.js";
import Notificacion from "./models/Notificacion.js";

/**
 * Archivo principal para demostración del Motor de Notificaciones
 * Ejemplos de uso de los diferentes escenarios
 */

console.log("🏪 SISTEMA DE NOTIFICACIONES - CHAMARKET 🏪\n");

// Crear instancia del motor de notificaciones
const motorNotificaciones = new Notificador();

// Mostrar configuración inicial
motorNotificaciones.listarEstrategias();
motorNotificaciones.listarConfiguracionEventos();

// ========== EJEMPLO 1: Promoción (WhatsApp + Email) ==========
console.log("\n\n📣 CASO DE USO 1: Promoción de productos");
console.log("-".repeat(60));

const notifPromocion = new Notificacion(
  "+51987654321",
  "¡Mega oferta! 30% de descuento en todas las bebidas. Solo por hoy.",
  "Promoción Especial del Día",
  "promocion"
);

motorNotificaciones.notificar(notifPromocion);

// ========== EJEMPLO 2: Stock Mínimo (Push) ==========
console.log("\n\n⚠️ CASO DE USO 2: Alerta de Stock Mínimo");
console.log("-".repeat(60));

const notifStockMinimo = new Notificacion(
  "device_id_bodeguero_123",
  'ALERTA: El producto "Coca Cola 1.5L" tiene stock bajo (solo 3 unidades)',
  "Stock Mínimo Alcanzado",
  "stock_minimo"
);

motorNotificaciones.notificar(notifStockMinimo);

// ========== EJEMPLO 3: Mantenimiento (Email + Push) ==========
console.log("\n\n🔧 CASO DE USO 3: Mantenimiento Programado");
console.log("-".repeat(60));

const notifMantenimiento = new Notificacion(
  "bodeguero@chamarket.com",
  "El sistema estará en mantenimiento mañana de 2:00 AM a 4:00 AM. No se podrán procesar pedidos durante ese periodo.",
  "Mantenimiento Programado - Sistema ChaMarket",
  "mantenimiento"
);

motorNotificaciones.notificar(notifMantenimiento);

// ========== EJEMPLO 4: Nuevo Pedido (WhatsApp + Push) ==========
console.log("\n\n🛒 CASO DE USO 4: Nuevo Pedido Recibido");
console.log("-".repeat(60));

const notifNuevoPedido = new Notificacion(
  "+51987654321",
  "Tienes un nuevo pedido #12345. Cliente: Juan Pérez. Total: S/. 125.50",
  "Nuevo Pedido Recibido",
  "nuevo_pedido"
);

motorNotificaciones.notificar(notifNuevoPedido);

// ========== EJEMPLO 5: Modo Manual - Canales Personalizados ==========
console.log("\n\n🎯 CASO DE USO 5: Envío Manual con Canales Específicos");
console.log("-".repeat(60));

const notifPersonalizada = new Notificacion(
  "bodeguero@chamarket.com",
  "Mensaje de prueba enviado solo por email",
  "Prueba de Canal Específico",
  "personalizado"
);

motorNotificaciones.notificarPorCanales(notifPersonalizada, ["email"]);

// ========== EJEMPLO 6: PLUS - Agregar Nuevo Canal (SMS) ==========
console.log("\n\n🎁 CASO DE USO 6 (PLUS): Extensibilidad - Nuevo Canal SMS");
console.log("-".repeat(60));

// Crear nueva estrategia SMS sin modificar código existente
import INotificador from "./interfaces/INotificador.js";

class NotificadorSMS extends INotificador {
  constructor() {
    super();
    this.apiSMS = "SMS_API_KEY";
  }

  notificar(notificacion) {
    console.log("\n📱 === NOTIFICADOR SMS ===");
    console.log(`⏰ Fecha: ${notificacion.fecha.toLocaleString()}`);
    console.log("🔌 Conectando con servicio SMS...");
    console.log(`📞 Enviando a: ${notificacion.destinatario}`);
    console.log(`💬 Mensaje: ${notificacion.mensaje}`);
    console.log("✅ SMS enviado exitosamente");
  }
}

// Registrar la nueva estrategia
motorNotificaciones.registrarEstrategia("sms", new NotificadorSMS());

// Configurar un evento para usar SMS
motorNotificaciones.configurarEvento("codigo_verificacion", ["sms"]);

// Usar el nuevo canal
const notifSMS = new Notificacion(
  "+51987654321",
  "Tu código de verificación es: 123456",
  "Código de Verificación",
  "codigo_verificacion"
);

motorNotificaciones.notificar(notifSMS);

// ========== EJEMPLO 7: Combinación de todos los canales ==========
console.log("\n\n🌟 CASO DE USO 7: Alerta Crítica (Todos los Canales)");
console.log("-".repeat(60));

const notifCritica = new Notificacion(
  "+51987654321",
  "URGENTE: Detectamos actividad inusual en tu cuenta. Por favor verifica tu información.",
  "Alerta de Seguridad",
  "alerta_seguridad"
);

motorNotificaciones.notificar(notifCritica);

console.log("\n\n✨ Demostración completada ✨\n");
