import { ArrowLeft, Bug, Cloud, Droplets, Lightbulb, MessageCircle, Mic, Send } from "lucide-react";
import React, { CSSProperties, FC, useEffect, useRef, useState } from "react";
// Assuming 'Link' from 'wouter' or a similar router is available globally or mocked
// We'll use a placeholder for Link behavior

// --- Type Definitions ---
type MessageType = 'user' | 'ai';

interface Message {
  id: number;
  type: MessageType;
  text: string;
  timestamp: string;
}

interface QuickQuestion {
  icon: FC<{ style?: CSSProperties }>;
  title: string;
  question: string;
}

interface InlineButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  type?: "default" | "ghost" | "icon" | "primary" | "outline" | "sm";
  className?: string;
}

// --- Component Mockups (with Inline Styles) ---

const InlineButton: FC<InlineButtonProps> = ({ children, onClick, style = {}, type = "default" }) => {
  const baseStyle: CSSProperties = {
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.15s, border-color 0.15s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid transparent',
    fontSize: '14px',
    fontWeight: 500,
    gap: '8px',
    whiteSpace: 'nowrap',
  };

  let specificStyle: CSSProperties = {};

  if (type === "ghost") {
    specificStyle = { backgroundColor: 'transparent', color: '#1a202c', border: 'none' };
  } else if (type === "icon") {
    specificStyle = { backgroundColor: 'transparent', color: '#1a202c', padding: '8px', borderRadius: '9999px', width: '40px', height: '40px', flexShrink: 0 };
  } else if (type === "primary" || type === "default") {
    specificStyle = { backgroundColor: '#3b82f6', color: 'white' };
  } else if (type === "outline") {
    specificStyle = { backgroundColor: 'white', color: '#1a202c', borderColor: '#e2e8f0', boxShadow: 'none' };
  }

  if (type === "sm") {
    specificStyle = { ...specificStyle, padding: '6px 12px', fontSize: '12px', height: '30px' };
  }
  
  // Custom hover effect for outline button used in the sidebar
  if (type === "outline" && style.flexDirection === 'column') {
    specificStyle = { ...specificStyle, ...{ transition: 'background-color 0.2s', '&:hover': { backgroundColor: '#3b82f60d' } } as any };
  }

  return (
    <button
      onClick={onClick}
      style={{ ...baseStyle, ...specificStyle, ...style }}
    >
      {children}
    </button>
  );
};

const Card: FC<{ children: React.ReactNode; style?: CSSProperties }> = ({ children, style = {} }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    overflow: 'hidden', // to contain children like CardContent without overflow
    ...style,
  }}>
    {children}
  </div>
);
const CardHeader: FC<{ children: React.ReactNode; style?: CSSProperties }> = ({ children, style = {} }) => (
  <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', ...style }}>
    {children}
  </div>
);
const CardTitle: FC<{ children: React.ReactNode; style?: CSSProperties }> = ({ children, style = {} }) => (
  <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0, ...style }}>{children}</h2>
);
const CardContent: FC<{ children: React.ReactNode; style?: CSSProperties }> = ({ children, style = {} }) => (
  <div style={{ padding: '16px', ...style }}>
    {children}
  </div>
);

const InlineInput: FC<any> = ({ value, onChange, onKeyPress, placeholder, style = {} }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
    style={{
      flex: 1,
      padding: '10px 14px',
      borderRadius: '6px',
      border: '1px solid #e2e8f0',
      outline: 'none',
      fontSize: '16px',
      backgroundColor: 'white',
      minHeight: '44px',
      ...style,
    }}
  />
);

const KrishiMa: FC = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // State Initialization
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: "ai", text: "नमस्ते! मैं KrishiMa हूँ, आपकी खेती की दादी। मैं आपकी हर समस्या का समाधान दूंगी। आज आपकी फसल कैसी है?", timestamp: "10:30 AM" },
    { id: 2, type: "ai", text: "Hello! I'm KrishiMa, your farming grandmother. I'll help solve all your agricultural problems. How are your crops today?", timestamp: "10:30 AM" }
  ]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const quickQuestions: QuickQuestion[] = [
    { icon: Bug, title: "Pest Control", question: "How do I identify and treat pest problems in my crops?" },
    { icon: Droplets, title: "Irrigation", question: "What's the best watering schedule for my crops?" },
    { icon: Cloud, title: "Weather", question: "How will the weather affect my farming this week?" },
    { icon: Lightbulb, title: "Tips", question: "Give me a sustainable farming tip for today" }
  ];

  // Helper Functions
  const getAIResponse = (question: string): string => {
    const responses: string[] = [
      "इस समस्या का समाधान है - नीम के तेल का प्रयोग करें। यह प्राकृतिक और सुरक्षित है।",
      "Weather conditions suggest moderate rainfall this week. Good time for sowing monsoon crops.",
      "For better irrigation, try drip irrigation system. It saves 40% water and increases yield by 20%.",
      "Today's tip: Mix cow dung compost with soil. It improves soil health naturally and reduces fertilizer cost.",
      "आपकी मिट्टी के लिए जैविक खाद सबसे अच्छी है। रासायनिक उर्वरक कम करें।"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = (): void => {
    if (!currentMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      type: "user",
      text: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: "ai",
        text: getAIResponse(currentMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string): void => {
    setCurrentMessage(question);
  };

  // Scroll to bottom effect
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    // Global container matching the screenshot background
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', // Light gray/off-white background
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
    }}>
      {/* Header and Main Content Container to mimic screen width */}
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        height: '100vh', // Ensure page height is 100% of viewport
        display: 'flex', 
        flexDirection: 'column'
      }}>
        {/* Header - Fixed/Sticky at the top */}
        <header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0, // Prevent shrinking
          width: '100%'
        }}>
          <InlineButton type="ghost" style={{ width: '32px', height: '32px', padding: '0', color: '#4b5563' /* Gray icon */ }}>
            <ArrowLeft style={{ height: '16px', width: '16px' }} />
          </InlineButton>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px',
              background: 'linear-gradient(to right, #10b981, #34d399)', // Green gradient (simulating the screenshot's logo color)
              borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <MessageCircle style={{ height: '20px', width: '20px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981', margin: 0, lineHeight: 1.2 }}>KrishiMa</h1>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>Your AI farming assistant</p>
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '9999px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
              <span style={{ color: '#16a34a', fontWeight: 500 }}>• Online</span>
            </div>
          </div>
        </header>

        {/* Main Content Area - Grid Layout */}
        <div style={{
          flex: 1, // Takes up remaining vertical space
          display: 'grid',
          gridTemplateColumns: '300px 1fr', // Approximate ratio for sidebar and chat
          gap: '0', // No gap needed between sidebar card and chat card
          overflow: 'hidden', // Crucial for full height layout
        }}>
          {/* Quick Questions Sidebar */}
          <div style={{ height: '100%', padding: '24px 16px 24px 16px', backgroundColor: 'white', borderRight: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Quick Questions Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0, paddingBottom: '4px' }}>Quick Questions</h3>
                {quickQuestions.map((item, index) => (
                  <InlineButton
                    key={index}
                    type="outline"
                    onClick={() => handleQuickQuestion(item.question)}
                    style={{
                      width: '100%', height: 'auto', padding: '10px 12px',
                      flexDirection: 'column', alignItems: 'flex-start', gap: '4px',
                      backgroundColor: 'white', borderColor: 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                      <item.icon style={{ height: '16px', width: '16px', color: '#10b981' }} />
                      <span style={{ fontWeight: 500, color: '#1a202c', fontSize: '14px' }}>{item.title}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'left', lineHeight: '1.2', paddingLeft: '24px' }}>
                      {item.question}
                    </span>
                  </InlineButton>
                ))}
              </div>

              {/* Language Toggle */}
              <div style={{ paddingTop: '16px', borderTop: '1px solid #e2e8f0', marginTop: '4px' }}>
                <h3 style={{ fontWeight: 500, marginBottom: '8px', fontSize: '14px' }}>Language / भाषा</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
                  <InlineButton type="outline" style={{ padding: '6px 12px', fontSize: '12px', borderColor: '#34d399', backgroundColor: '#ecfdf5', color: '#10b981' }}>English</InlineButton>
                  <InlineButton type="outline" style={{ padding: '6px 12px', fontSize: '12px' }}>हिंदी</InlineButton>
                </div>
              </div>

              {/* Voice Feature */}
              <div style={{ marginTop: '16px', padding: '12px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #d1fae5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Mic style={{ height: '16px', width: '16px', color: '#10b981' }} />
                  <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>Voice Support</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                  Speak in Hindi, English, or your local language
                </p>
              </div>

            </div>
          </div>

          {/* Chat Area */}
          <div style={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: 'white', 
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)', // Subtle shadow
          }}>
            {/* Messages (ScrollArea Simulation) */}
            <div ref={scrollAreaRef} style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    style={{ display: 'flex', justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start' }}
                  >
                    <div style={{
                      maxWidth: '70%',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      backgroundColor: message.type === 'user' ? '#10b981' : '#f0fdf4', // Primary vs Light Green Muted
                      color: message.type === 'user' ? 'white' : '#1a202c',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    }}>
                      <p style={{ fontSize: '0.9rem', margin: 0 }}>{message.text}</p>
                      <p style={{
                        fontSize: '0.75rem', marginTop: '4px',
                        color: message.type === 'user' ? 'rgba(255, 255, 255, 0.8)' : '#64748b',
                        textAlign: 'right', 
                      }}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div style={{ borderTop: '1px solid #e2e8f0', padding: '16px', backgroundColor: 'white', flexShrink: 0 }}>
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                alignItems: 'center',
                backgroundColor: '#f9fafb', // Very light background for the input zone
                borderRadius: '8px',
                padding: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <InlineInput
                  placeholder="Ask KrishiMa anything about farming... (English/Hindi)"
                  value={currentMessage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage()}
                  style={{ 
                    border: 'none', 
                    backgroundColor: 'transparent',
                    padding: '0 8px',
                    minHeight: '28px',
                  }}
                />
                <InlineButton type="icon" style={{ width: '36px', height: '36px', color: '#64748b' }}>
                  <Mic style={{ height: '18px', width: '18px' }} />
                </InlineButton>
                <InlineButton onClick={handleSendMessage} type="primary" style={{ width: '36px', height: '36px', padding: '0', backgroundColor: '#10b981' }}>
                  <Send style={{ height: '16px', width: '16px', color: 'white' }} />
                </InlineButton>
              </div>

              <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
                KrishiMa speaks Hindi, English, and understands local dialects • Available 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KrishiMa;