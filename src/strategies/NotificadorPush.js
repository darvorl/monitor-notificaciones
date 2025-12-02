import INotificador from "../interfaces/INotificador.js";

/**
 * Estrategia Concreta: NotificadorPush
 * Envía notificaciones push a la aplicación móvil del bodeguero
 */
class NotificadorPush extends INotificador {
  constructor() {
    super();
    this.servicioFirebase = "FCM_API_KEY"; // Firebase Cloud Messaging
  }

  /**
   * Conecta con el gateway de notificaciones push (Firebase, OneSignal, etc.)
   * @param {string} deviceId - ID del dispositivo del destinatario
   * @param {string} titulo - Título de la notificación
   * @param {string} mensaje - Contenido del mensaje
   */
  conectarGatewayFirebase(deviceId, titulo, mensaje) {
    // Simulación de envío mediante Firebase Cloud Messaging
    console.log("🔌 Conectando con Firebase Cloud Messaging...");
    console.log(`📱 Device ID: ${deviceId}`);
    console.log(`🔔 Título: ${titulo}`);
    console.log(`💬 Mensaje: ${mensaje}`);
    return true;
  }

  /**
   * Implementación del método notificar para Push Notifications
   * @param {Notificacion} notificacion - Objeto con los datos de la notificación
   */
  notificar(notificacion) {
    console.log("\n🔔 === NOTIFICADOR PUSH ===");
    console.log(`⏰ Fecha: ${notificacion.fecha.toLocaleString()}`);

    const exito = this.conectarGatewayFirebase(
      notificacion.destinatario,
      notificacion.asunto,
      notificacion.mensaje
    );

    if (exito) {
      console.log("✅ Notificación Push enviada exitosamente");
    } else {
      console.log("❌ Error al enviar notificación Push");
    }
  }
}

export default NotificadorPush;
