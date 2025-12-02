import INotificador from "../interfaces/INotificador.js";

/**
 * Estrategia Concreta: NotificadorEmail
 * Envía notificaciones por correo electrónico usando SMTP o servicios como SendGrid
 */
class NotificadorEmail extends INotificador {
  constructor() {
    super();
    this.servidorSMTP = "smtp.chamarket.com";
    this.puerto = 587;
  }

  /**
   * Conecta con el servidor SMTP para enviar correos
   * @param {string} emailDestinatario - Email del destinatario
   * @param {string} asunto - Asunto del correo
   * @param {string} cuerpo - Contenido del correo
   */
  conectarServicioSMTP(emailDestinatario, asunto, cuerpo) {
    // Simulación de conexión SMTP (SendGrid, Mailgun, etc.)
    console.log("🔌 Conectando con servidor SMTP...");
    console.log(`📧 Para: ${emailDestinatario}`);
    console.log(`📋 Asunto: ${asunto}`);
    console.log(`📄 Cuerpo: ${cuerpo}`);
    return true;
  }

  /**
   * Implementación del método notificar para Email
   * @param {Notificacion} notificacion - Objeto con los datos de la notificación
   */
  notificar(notificacion) {
    console.log("\n📧 === NOTIFICADOR EMAIL ===");
    console.log(`⏰ Fecha: ${notificacion.fecha.toLocaleString()}`);

    const exito = this.conectarServicioSMTP(
      notificacion.destinatario,
      notificacion.asunto,
      notificacion.mensaje
    );

    if (exito) {
      console.log("✅ Email enviado exitosamente");
    } else {
      console.log("❌ Error al enviar email");
    }
  }
}

export default NotificadorEmail;
