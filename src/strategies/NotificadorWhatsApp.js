import INotificador from "../interfaces/INotificador.js";

/**
 * Estrategia Concreta: NotificadorWhatsApp
 * Envía notificaciones a través de WhatsApp usando servicios como Twilio o Meta Business API
 */
class NotificadorWhatsApp extends INotificador {
  constructor() {
    super();
    this.apiCredencial = "TWILIO_API_KEY"; // Simula credenciales
  }

  /**
   * Conecta con el servicio externo de WhatsApp
   * @param {string} numeroTelefono - Número del destinatario
   * @param {string} mensaje - Contenido del mensaje
   */
  conectarServicioWhatsApp(numeroTelefono, mensaje) {
    // Simulación de llamada a API externa (Twilio, Meta Business)
    console.log("🔌 Conectando con servicio de WhatsApp...");
    console.log(`📱 Enviando a: ${numeroTelefono}`);
    console.log(`💬 Mensaje: ${mensaje}`);
    return true;
  }

  /**
   * Implementación del método notificar para WhatsApp
   * @param {Notificacion} notificacion - Objeto con los datos de la notificación
   */
  notificar(notificacion) {
    console.log("\n📲 === NOTIFICADOR WHATSAPP ===");
    console.log(`⏰ Fecha: ${notificacion.fecha.toLocaleString()}`);

    const exito = this.conectarServicioWhatsApp(
      notificacion.destinatario,
      notificacion.mensaje
    );

    if (exito) {
      console.log("✅ Mensaje de WhatsApp enviado exitosamente");
    } else {
      console.log("❌ Error al enviar mensaje de WhatsApp");
    }
  }
}

export default NotificadorWhatsApp;
