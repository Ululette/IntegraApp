import supabase from '../../../supabase.config';
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, props) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.states = [];
        this.number = [];
        this.dni = [];
        this.ok = [];
        this.fetchState();
        this.fetchInstitutions();
        this.fetchDNI();
    }
    fetchState = async () => {
        let { data } = await supabase.from('states').select('*');
        this.states.push(data);
    };
    fetchInstitutions = async () => {
        let { data } = await supabase.from('institutions').select('*');
        this.number.push(data);
    };

    fetchDNI = async () => {
        let { data } = await supabase
            .from('partners')
            .select(
                'dni, name, birthdate, phone_number, plans(id, name, price)'
            );
        this.dni.push(data);
        console.log(this.dni, 'data');
    };

    thanks() {
        const message = this.createChatBotMessage(
            '👍¡De nada! Espero haberte ayudado. ¿Te gustaría saber algo mas?',
            {
                widget: 'options',
            }
        );
        this.updateChatbotState(message);
    }
    greet() {
        const message = this.createChatBotMessage(
            '¿Como te puedo ayudar? Podés elegir una opción o intentar escribir algo 😁',
            {
                widget: 'options',
            }
        );
        this.updateChatbotState(message);
    }
    sorry() {
        const message = this.createChatBotMessage(
            '😔 Perdón, no te entendí. Podes probar con otra palabra o elegir una de las opciones: ',
            {
                widget: 'options',
            }
        );
        this.updateChatbotState(message);
    }
    handlePlansList = () => {
        const message = this.createChatBotMessage(
            '👪 Aca podes encontrar toda la información que necesitas sobre planes:',
            {
                widget: 'plansLinks',
            }
        );

        this.updateChatbotState(message);
    };
    handleMyPlan = () => {
        const message = this.createChatBotMessage('¿Cual es tu DNI?');

        this.updateChatbotState(message);
    };

    auxiliar = (dni) => {};

    handleDni = (dni) => {
        let allDni = [];
        let selected = [];
        let index = 0;
        let dniN = 0;
        console.log(dni.length, 'length');
        if (dni.length < 7) {
            console.log('enntre');
            let message = this.createChatBotMessage(
                'Tu DNI es demasiado corto'
            );
            this.updateChatbotState(message);
        } else {
            allDni = this.dni[0].map((d) => d.dni);
            selected = allDni.filter((d) => {
                console.log(dni, 'dni');
                //eslint-disable-next-line
                return d == dni;
            });
            if (selected.length > 0) {
                dniN = parseInt(dni);
                console.log(dniN, 'n');
                index = allDni.indexOf(dniN);
                let message = this.createChatBotMessage(
                    `Hola ${this.dni[0][index].name}! Tu plan es: ${this.dni[0][index].plans.name} y el precio es: ${this.dni[0][index].plans.price}`
                );
                this.ok.push(index);
                this.updateChatbotState(message);
            } else {
                let message = this.createChatBotMessage(
                    'Tu plan no se encontro'
                );
                this.updateChatbotState(message);
            }
        }
    };

    handlePhoneNumber = (num) => {
        let aux = 0;
        aux = this.ok[1];
        console.log(this.ok, 'this.ok');
        if (
            this.dni[0][aux].phone_number[
                this.dni[0][aux].phone_numberphone_number.length
            ] === num[2] &&
            this.dni[0][aux].phone_number[
                this.dni[0][aux].phone_numberphone_number.length - 1
            ] === num[1] &&
            this.dni[0][aux].phone_number[
                this.dni[0][aux].phone_numberphone_number.length
            ] -
                2 ===
                num[0]
        ) {
            let message = this.createChatBotMessage(
                `Hola ${this.dni[0][aux].name}! Tu plan es: ${this.dni[0][aux].plans.name} y el precio es: ${this.dni[0].this.ok[1].plans.price}`
            );
            this.updateChatbotState(message);
        } else {
            let message = 'tu plan no se encontro';
            this.updateChatbotState(message);
        }
    };

    handleFAQList = () => {
        const message = this.createChatBotMessage(
            '✔️Aca podes encontrar las preguntas mas frecuentes entre nuestros usuarios:',
            {
                widget: 'FAQLinks',
            }
        );

        this.updateChatbotState(message);
    };
    handleFormList = () => {
        const message = this.createChatBotMessage(
            ' 🧾Podes llenar este formulario para recibir mas información en tu correo electrónico:',
            {
                widget: 'formLinks',
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
                widget: 'StatesLinks',
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
