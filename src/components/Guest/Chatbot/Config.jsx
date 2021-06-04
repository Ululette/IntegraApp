import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import LinkList from "./LinkList";

import Options from "./Options";

const Config = {
    customStyles: {
        botMessageBox: {
          backgroundColor: "#41aea9",
        },
        chatButton: {
          backgroundColor: "#41aea9",
        },
    },
  botName: "Integra Bot",
  initialMessages: [
    createChatBotMessage("Hola, soy Inti 👋. ¿En que te puedo ayudar?", {
    }),
  ],

  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "plansLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [{
        text: "Comparativa de planes",
        url: "https://integra-platform.web.app/plandetails",
        id: 1,
        }]
      },
    },
    {
        widgetName: "formLinks",
        widgetFunc: (props) => <LinkList {...props} />,
        props: {
          options: [{
          text: "Asociate",
          url: "https://integra-platform.web.app/#contact",
          id: 4,
          }]
        },
      },
      {
        widgetName: "FAQLinks",
        widgetFunc: (props) => <LinkList {...props} />,
        props: {
          options: [{
          text: "Preguntas frecuentes",
          url: "https://integra-platform.web.app/faqs",
          id: 4,
          }]
        },
      },
  ],
};
export default Config;
