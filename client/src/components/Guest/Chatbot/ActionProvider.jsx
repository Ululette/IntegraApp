import supabase from "../../../supabase.config";
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, props) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.states = [];
    this.number = [];
    this.dni = [];
    this.fetchState();
    this.fetchInstitutions();
    this.fetchDNI();
  }
  fetchState = async () => {
    let { data } = await supabase.from("states").select("*");
    this.states.push(data);
  };
  fetchInstitutions = async () => {
    let { data } = await supabase.from("institutions").select("*");
    this.number.push(data);
  };

  fetchDNI = async () => {
    let { data } = await supabase
      .from("partners")
      .select("dni, name, birthdate, plans(id, name, price)");
    this.dni.push(data);
    console.log(this.dni, "data");
  };

  thanks() {
    const message = this.createChatBotMessage(
      "👍¡De nada! Espero haberte ayudado. ¿Te gustaría saber algo mas?",
      {
        widget: "options",
      }
    );
    this.updateChatbotState(message);
  }
  greet() {
    const message = this.createChatBotMessage(
      "¿Como te puedo ayudar? Podés elegir una opción o intentar escribir algo 😁",
      {
        widget: "options",
      }
    );
    this.updateChatbotState(message);
  }
  sorry() {
    const message = this.createChatBotMessage(
      "😔 Perdón, no te entendí. Podes probar con otra palabra o elegir una de las opciones: ",
      {
        widget: "options",
      }
    );
    this.updateChatbotState(message);
  }
  handlePlansList = () => {
    const message = this.createChatBotMessage(
      "👪 Aca podes encontrar toda la información que necesitas sobre planes:",
      {
        widget: "plansLinks",
      }
    );

    this.updateChatbotState(message);
  };
  handleMyPlan = () => {
    const message = this.createChatBotMessage("¿Cual es tu DNI?");

    this.updateChatbotState(message);
  };

  handleDni = (dni) => {
    console.log(typeof dni);
    let allDni = [];
    let selected = [];
    let index = 0
    let dniN = 0;
    allDni = this.dni[0].map((d) => d.dni);
    selected = allDni.filter((d) => {
      console.log(dni, "dni");
      return d == dni;
    });
    if (selected.length > 0) {
      dniN = parseInt(dni);
      console.log(dniN, "n");
     index = allDni.indexOf(dniN);
      let message = this.createChatBotMessage(`Hola ${this.dni[0][index].name}! Tu plan es: ${this.dni[0][index].plans.name}`);
      this.updateChatbotState(message);
    } else {
      let message = "tu plan no se encontro";
      this.updateChatbotState(message);
    }
  };

  handleFAQList = () => {
    const message = this.createChatBotMessage(
      "✔️Aca podes encontrar las preguntas mas frecuentes entre nuestros usuarios:",
      {
        widget: "FAQLinks",
      }
    );

    this.updateChatbotState(message);
  };
  handleFormList = () => {
    const message = this.createChatBotMessage(
      " 🧾Podes llenar este formulario para recibir mas información en tu correo electrónico:",
      {
        widget: "formLinks",
      }
    );

    this.updateChatbotState(message);
  };
  handleEmergencyList = () => {
    const message = this.createChatBotMessage(
      `☎️ El numero de emergencia para todo el pais es:  ${this.number[0].map(
        (n) => n.phone_number
      )}  `
    );

    this.updateChatbotState(message);
  };
  handleStatesList = () => {
    const message = this.createChatBotMessage(
      `📍 Las provincias en las que ofrecemos cobertura son: ${this.states[0].map(
        (s) => ` ${s.name}`
      )}`,
      {
        widget: "StatesLinks",
      }
    );

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
//Si el DNI existe, hacer un find con ese dni, agarrar el indice y fijarse el plans de ese indice

//selected no se llena conel filtrado
