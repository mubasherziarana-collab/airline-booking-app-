import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, MessageSquare, Compass, MapPin, Plane, ArrowRight } from 'lucide-react';

const destinationGuides = {
  paris: {
    title: 'Paris, France',
    code: 'CDG',
    tagline: 'The City of Light',
    highlights: [
      'Top Attractions: Eiffel Tower, Louvre Museum, Notre-Dame, Montmartre',
      'Food & Dining: Fresh croissants at local boulangeries, steak frites, macarons at Ladurée',
      'Hidden Gem: Canal Saint-Martin for quiet strolls and vintage boutique shopping',
      'Best Time to Visit: May to September or late November for the Christmas lights'
    ]
  },
  london: {
    title: 'London, United Kingdom',
    code: 'LON',
    tagline: 'Historic Majesty & Global Culture',
    highlights: [
      'Top Attractions: Tower of London, British Museum (Free!), London Eye, Big Ben',
      'Food & Dining: Traditional Sunday roast, Borough Market street food, afternoon tea at The Ritz',
      'Hidden Gem: Neal’s Yard in Covent Garden for colorful alleys and artisan cafes',
      'Best Time to Visit: Late spring (May/June) or autumn when city parks turn golden'
    ]
  },
  dubai: {
    title: 'Dubai, UAE',
    code: 'DXB',
    tagline: 'Futuristic Luxury & Desert Adventure',
    highlights: [
      'Top Attractions: Burj Khalifa, Dubai Mall Fountain Show, Palm Jumeirah, Museum of the Future',
      'Things to Do: Sunset Desert 4x4 Safari, Marina yacht cruise, Old Dubai gold souk abra ride',
      'Food & Dining: World-class rooftop fine dining, authentic shawarma and mandi in Deira',
      'Best Time to Visit: November to March for pleasant 24°C-28°C sunny weather'
    ]
  },
  istanbul: {
    title: 'Istanbul, Turkey',
    code: 'IST',
    tagline: 'Where East Meets West',
    highlights: [
      'Top Attractions: Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar',
      'Things to Do: Bosphorus sunset cruise between Europe and Asia, Turkish hammam spa',
      'Food & Dining: Fresh simit with tea, authentic kebabs in Kadiköy, baklava at Karaköy Güllüoğlu',
      'Best Time to Visit: April to May and September to November for mild temperatures'
    ]
  },
  tokyo: {
    title: 'Tokyo, Japan',
    code: 'TYO',
    tagline: 'Ultra-Modern Wonders & Ancient Traditions',
    highlights: [
      'Top Attractions: Shibuya Crossing, Senso-ji Temple in Asakusa, TeamLab Planets, Akihabara',
      'Food & Dining: Authentic ramen alleys in Shinjuku, Tsukiji outer market sushi, matcha desserts',
      'Hidden Gem: Yanaka Ginza for an authentic old-town Tokyo neighborhood vibe',
      'Best Time to Visit: Late March to April (Cherry Blossoms) or November (Fall foliage)'
    ]
  },
  lahore: {
    title: 'Lahore, Pakistan',
    code: 'LHE',
    tagline: 'The Cultural Heart of South Asia',
    highlights: [
      'Top Attractions: Badshahi Mosque, Lahore Fort (Shahi Qila), Shalimar Gardens, Minar-e-Pakistan',
      'Food & Dining: Gawalmandi Food Street, Fort Road rooftop dining with mosque views, authentic karahi',
      'Things to Do: Wagah Border flag ceremony, shopping for handcrafted textiles in Anarkali Bazaar',
      'Best Time to Visit: November to March for cool, pleasant winter weather'
    ]
  }
};

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hi! I’m your MyFlyOra Travel AI Assistant. ✈️ Looking for top things to do, hidden spots, or food recommendations? Ask me about any destination!'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate AI reasoning
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matchedKey = null;

      for (const key of Object.keys(destinationGuides)) {
        if (lower.includes(key)) {
          matchedKey = key;
          break;
        }
      }

      let aiResponse;
      if (matchedKey) {
        const guide = destinationGuides[matchedKey];
        aiResponse = {
          sender: 'ai',
          text: `Here is your quick curated guide for **${guide.title}** (${guide.tagline})! ✨`,
          guide: guide
        };
      } else if (lower.includes('cheap') || lower.includes('flight') || lower.includes('deal')) {
        aiResponse = {
          sender: 'ai',
          text: `To discover the lowest rates, check our **🔥 Low Fare Calendar** tab on MyFlyOra! You can also compare hundreds of airlines on our **Flights** tab with zero added booking fees.`
        };
      } else if (lower.includes('call') || lower.includes('phone') || lower.includes('agent')) {
        aiResponse = {
          sender: 'ai',
          text: `Need to book with a live specialist? Our 24/7 US flight reservation desk is available toll-free at **1-888-298-2636**!`
        };
      } else {
        aiResponse = {
          sender: 'ai',
          text: `That sounds like an amazing trip! To find the best activities and hidden gems for "${query}", I recommend exploring local food markets, historic old towns, and booking activities early. You can check live flights and hotel deals for this destination right now on MyFlyOra.com!`
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickPrompt = (city) => {
    handleSend(`What are the top things to do in ${city}?`);
  };

  const handleBookFlight = (destCode, cityName) => {
    const event = new CustomEvent('setDestination', {
      detail: { code: destCode, name: `${cityName} (${destCode})` }
    });
    window.dispatchEvent(event);
    setIsOpen(false);
  };

  return (
    <div className="ai-chat-root">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          className="ai-chat-toggle-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Travel Assistant"
        >
          <div className="toggle-inner">
            <Sparkles size={20} className="sparkle-icon" />
            <span className="toggle-label">Ask Travel AI</span>
          </div>
          <span className="pulse-indicator"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window animate-scale-up">
          {/* Header */}
          <div className="chat-header">
            <div className="header-info">
              <div className="bot-avatar">
                <Sparkles size={18} color="white" />
              </div>
              <div>
                <h3 className="bot-name">MyFlyOra Travel AI</h3>
                <span className="bot-status">● Destination & Things-to-Do Guide</span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="quick-suggestions">
            <span className="quick-label">Popular:</span>
            {['Paris', 'Dubai', 'London', 'Istanbul', 'Tokyo', 'Lahore'].map((city) => (
              <button 
                key={city} 
                className="suggestion-chip"
                onClick={() => handleQuickPrompt(city)}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message-bubble-wrapper ${msg.sender}`}>
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  
                  {msg.guide && (
                    <div className="guide-card">
                      <div className="guide-header">
                        <MapPin size={16} color="#0b57d0" />
                        <strong>{msg.guide.title} Highlights</strong>
                      </div>
                      <ul className="guide-list">
                        {msg.guide.highlights.map((h, idx) => (
                          <li key={idx}>{h}</li>
                        ))}
                      </ul>
                      <button 
                        className="guide-action-btn"
                        onClick={() => handleBookFlight(msg.guide.code, msg.guide.title.split(',')[0])}
                      >
                        <Plane size={15} />
                        <span>Search Flights to {msg.guide.title.split(',')[0]}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-bubble-wrapper ai">
                <div className="message-bubble typing">
                  <span>Thinking</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form 
            className="chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input 
              type="text" 
              placeholder="Ask about things to do, food, spots..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" disabled={!inputValue.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        .ai-chat-root {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: inherit;
        }

        .ai-chat-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, #0b57d0 0%, #1e40af 100%);
          color: white;
          border: none;
          padding: 0.85rem 1.4rem;
          border-radius: 9999px;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.95rem;
          box-shadow: 0 10px 25px rgba(11, 87, 208, 0.4);
          transition: all 0.25s ease;
          position: relative;
        }

        .ai-chat-toggle-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 14px 30px rgba(11, 87, 208, 0.5);
        }

        .toggle-inner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sparkle-icon {
          color: #fde047;
          animation: spin-pulse 3s infinite;
        }

        @keyframes spin-pulse {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(15deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        .pulse-indicator {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background: #22c55e;
          border-radius: 50%;
          border: 2px solid white;
        }

        .ai-chat-window {
          width: 380px;
          height: 540px;
          max-width: calc(100vw - 32px);
          max-height: calc(100vh - 48px);
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.08);
          animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .chat-header {
          background: linear-gradient(135deg, #0b57d0 0%, #1e40af 100%);
          color: white;
          padding: 1rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .bot-avatar {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bot-name {
          font-size: 1rem;
          font-weight: 700;
          margin: 0;
        }

        .bot-status {
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .close-btn {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .close-btn:hover {
          opacity: 1;
        }

        .quick-suggestions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 0.85rem;
          background: #f8fafc;
          border-bottom: 1px solid #edf2f7;
          overflow-x: auto;
          white-space: nowrap;
          scrollbar-width: none;
        }

        .quick-label {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 600;
        }

        .suggestion-chip {
          background: white;
          border: 1px solid #e2e8f0;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s;
        }

        .suggestion-chip:hover {
          background: #eff6ff;
          border-color: #93c5fd;
          color: #0b57d0;
        }

        .chat-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: #ffffff;
        }

        .message-bubble-wrapper {
          display: flex;
          width: 100%;
        }

        .message-bubble-wrapper.user {
          justify-content: flex-end;
        }

        .message-bubble-wrapper.ai {
          justify-content: flex-start;
        }

        .message-bubble {
          max-width: 85%;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .message-bubble-wrapper.user .message-bubble {
          background: #0b57d0;
          color: white;
          border-bottom-right-radius: 2px;
        }

        .message-bubble-wrapper.ai .message-bubble {
          background: #f1f5f9;
          color: #1e293b;
          border-bottom-left-radius: 2px;
        }

        .message-bubble p {
          margin: 0;
        }

        .guide-card {
          margin-top: 0.65rem;
          padding-top: 0.65rem;
          border-top: 1px solid #e2e8f0;
        }

        .guide-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: #0b57d0;
          margin-bottom: 0.4rem;
        }

        .guide-list {
          margin: 0;
          padding-left: 1.1rem;
          font-size: 0.82rem;
          color: #475569;
          line-height: 1.45;
        }

        .guide-list li {
          margin-bottom: 0.35rem;
        }

        .guide-action-btn {
          margin-top: 0.65rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background: #0b57d0;
          color: white;
          border: none;
          padding: 0.55rem 0.85rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }

        .guide-action-btn:hover {
          background: #0945a5;
        }

        .chat-input-bar {
          display: flex;
          padding: 0.75rem 1rem;
          background: white;
          border-top: 1px solid #edf2f7;
          gap: 0.5rem;
        }

        .chat-input-bar input {
          flex: 1;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          padding: 0.65rem 1.15rem;
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .chat-input-bar input:focus {
          border-color: #0b57d0;
        }

        .chat-input-bar button {
          background: #0b57d0;
          color: white;
          border: none;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .chat-input-bar button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .dot {
          animation: blink 1.2s infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

export default AIChatAssistant;
