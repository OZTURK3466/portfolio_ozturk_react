import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Options de réponse prédéfinies
  const botResponses = {
    greeting: [
      "Bonjour ! Je suis l'assistant virtuel de ce portfolio. Comment puis-je vous aider aujourd'hui ?",
      "Vous pouvez me poser des questions sur mes compétences, projets, ou disponibilité pour de nouvelles opportunités."
    ],
    skills: [
      "Je maîtrise plusieurs technologies dont React, Node.js, et le développement web en général.",
      "Vous pouvez consulter la section Compétences de mon portfolio pour plus de détails."
    ],
    projects: [
      "J'ai travaillé sur divers projets allant des sites vitrines aux applications web complexes.",
      "Consultez la section Projets pour voir des exemples concrets de mon travail."
    ],
    contact: [
      "Vous pouvez me contacter par email à votre.email@exemple.com",
      "Ou remplir le formulaire dans la section Contact pour démarrer une conversation."
    ],
    availability: [
      "Je suis actuellement disponible pour de nouveaux projets.",
      "N'hésitez pas à me contacter pour discuter de votre projet et de mes disponibilités."
    ],
    default: [
      "Je ne suis pas sûr de comprendre votre demande. Pouvez-vous préciser ?",
      "Vous pouvez me poser des questions sur mes compétences, projets, ou comment me contacter."
    ]
  };
  
  // Message initial au chargement
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            text: botResponses.greeting[0],
            sender: 'bot'
          },
          {
            text: botResponses.greeting[1],
            sender: 'bot'
          }
        ]);
      }, 500);
    }
  }, [isOpen, messages.length]);
  
  // Défiler automatiquement vers le bas lors de nouveaux messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage = {
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simuler une réponse du bot après un court délai
    setTimeout(() => {
      const responseType = getResponseType(inputValue.toLowerCase());
      const botMessage = {
        text: botResponses[responseType][Math.floor(Math.random() * botResponses[responseType].length)],
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  // Déterminer le type de réponse à donner
  const getResponseType = (message) => {
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return 'greeting';
    } else if (message.includes('compétence') || message.includes('savoir faire') || message.includes('technologie') || message.includes('skills')) {
      return 'skills';
    } else if (message.includes('projet') || message.includes('réalisation') || message.includes('portfolio')) {
      return 'projects';
    } else if (message.includes('contact') || message.includes('email') || message.includes('téléphone') || message.includes('joindre')) {
      return 'contact';
    } else if (message.includes('disponible') || message.includes('disponibilité') || message.includes('embauche') || message.includes('recrute')) {
      return 'availability';
    } else {
      return 'default';
    }
  };
  
  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      <button className="chat-toggle" onClick={toggleChat}>
        {isOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <>
            <i className="fas fa-comment-alt"></i>
            <span className="chat-badge">1</span>
          </>
        )}
      </button>
      
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-title">
            <div className="chat-avatar">
              <img src="https://via.placeholder.com/40" alt="Avatar" />
            </div>
            <div>
              <h3>Assistant Portfolio</h3>
              <span className="status-indicator">En ligne</span>
            </div>
          </div>
        </div>
        
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.sender === 'bot' && (
                <div className="message-avatar">
                  <img src="https://via.placeholder.com/30" alt="Bot" />
                </div>
              )}
              <div className="message-bubble">
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">
                <img src="https://via.placeholder.com/30" alt="Bot" />
              </div>
              <div className="message-bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Posez une question..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit" disabled={!inputValue.trim()}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;