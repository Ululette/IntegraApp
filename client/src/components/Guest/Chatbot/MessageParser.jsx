class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase()
      
      if (lowerCaseMessage.includes("hola") || lowerCaseMessage.includes("buenos dias") ||  lowerCaseMessage.includes("buenas")) {
        this.actionProvider.greet()
      }
      if (lowerCaseMessage.includes("emergencia") || lowerCaseMessage.includes("numeros")) {
        this.actionProvider.handleEmergencyList()
      }
      if (lowerCaseMessage.includes("planes") || lowerCaseMessage.includes("comprar") || lowerCaseMessage.includes("plan") ||  lowerCaseMessage.includes("familia")) {
        this.actionProvider.handlePlansList()      
      }
      if (lowerCaseMessage.includes("pregunta") || lowerCaseMessage.includes("duda")) {
        this.actionProvider.handleFAQList() 
      }
      if (lowerCaseMessage.includes("cobertura") || lowerCaseMessage.includes("lugar") || lowerCaseMessage.includes("lugares") || lowerCaseMessage.includes("donde")) {
        this.actionProvider.handleStatesList()
      }
      if (lowerCaseMessage.includes("asociarme") || lowerCaseMessage.includes("informacion")|| lowerCaseMessage.includes("contacto")) {
        this.actionProvider.handleFormList()
      }
      if(lowerCaseMessage.includes("gracias")) {
        this.actionProvider.thanks()
      }
/*       else {
        this.actionProvider.sorry()
      } */
     
    }
  }
  
  export default MessageParser