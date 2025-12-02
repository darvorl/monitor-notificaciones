/**
 * Modelo de Notificación
 * Representa los datos de una notificación en el sistema
 */
class Notificacion {
  /**
   * @param {string} destinatario - Email, teléfono o ID del destinatario
   * @param {string} mensaje - Contenido del mensaje
   * @param {string} asunto - Asunto o título de la notificación
   * @param {string} tipo - Tipo de evento (promocion, stock_minimo, mantenimiento, etc.)
   */
  constructor(destinatario, mensaje, asunto = "", tipo = "") {
    this.destinatario = destinatario;
    this.mensaje = mensaje;
    this.asunto = asunto;
    this.tipo = tipo;
    this.fecha = new Date();
  }
}

export default Notificacion;
