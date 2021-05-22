class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase()
      
      if (lowerCaseMessage.includes("ja") || lowerCaseMessage.includes("hola") || lowerCaseMessage.includes("buenos dias") ||  lowerCaseMessage.includes("buenas")) {
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
     if(lowerCaseMessage && !lowerCaseMessage.includes("gracias") && !lowerCaseMessage.includes("asociarme") &&!lowerCaseMessage.includes("informacion")&&
     !lowerCaseMessage.includes("contacto") &&!lowerCaseMessage.includes("cobertura") &&!lowerCaseMessage.includes("lugar") &&
     !lowerCaseMessage.includes("lugares") &&!lowerCaseMessage.includes("donde") &&!lowerCaseMessage.includes("pregunta") &&!lowerCaseMessage.includes("duda")
     &&!lowerCaseMessage.includes("planes") &&!lowerCaseMessage.includes("comprar") &&!lowerCaseMessage.includes("plan") && !lowerCaseMessage.includes("familia")
     &&!lowerCaseMessage.includes("emergencia") &&!lowerCaseMessage.includes("numeros")
     &&!lowerCaseMessage.includes("hola") &&!lowerCaseMessage.includes("buenos dias") && !lowerCaseMessage.includes("buenas")  && !lowerCaseMessage.includes("ja")) {
        this.actionProvider.sorry()
      }  
     
    }
  }
  
  export default MessageParser