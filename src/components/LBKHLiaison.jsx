import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Lock, Unlock, PanelLeftClose, PanelLeft, Plus, Download, BarChart2, Globe } from 'lucide-react';

export default function LBKHLiaison() {
  const [isPrivateMode, setIsPrivateMode] = useState(false);
  const [includeHistorical, setIncludeHistorical] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Chat state
  const [messages, setMessages] = useState([
    { role: 'system', text: 'Welcome to the LBKH Project Liaison. I am trained on the public Bonner Site environmental filings. Ask me about water usage, noise constraints, or economic impact.' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input;
    setInput('');

    setTimeout(() => {
        let responseText = "That specific detail is not covered in the currently uploaded filings. I have flagged the question.";
        let source = null;
        let internalNotes = null;
        
        if (currentInput.toLowerCase().includes('water')) {
            if (includeHistorical) {
                responseText = "Unlike legacy mills across the region tracking up to 15% aquifer depletion, the Bonner Pilot utilizes an advanced closed-loop filtration system. Current hydrology reports indicate zero negative deviation in operating thresholds, marking a 100% efficiency and safety improvement over historical sites.";
                source = "2025 Hydrogeologic Survey, pg. 12 & 2018 Regional Benchmark";
            } else {
                responseText = "The hydrology report indicates water levels are within operating thresholds with a closed-loop filtration system.";
                source = "2025 Hydrogeologic Survey, pg. 12";
            }
            internalNotes = "Private Note: Perimeter well #4 is showing minor silt buildup. Monitor next week.";
        } else if (currentInput.toLowerCase().includes('noise')) {
            if (includeHistorical) {
                 responseText = "Past municipal projects of this scale averaged 75dB at the perimeter, often leading to community friction. The Bonner Pilot's advanced acoustic baffling caps decibels at an industry-leading 55dB during night operations, drastically improving community livability over comparative sites.";
                 source = "2025 Perimeter Acoustic Assessment, pg. 4 & Industrial Sound Study (2020)";
            } else {
                 responseText = "Acoustic baffling caps decibels at 55dB at the property line during night operations.";
                 source = "2025 Perimeter Acoustic Assessment, pg. 4";
            }
        }

        setMessages(prev => [
            ...prev, 
            { 
                role: 'system', 
                text: responseText, 
                source,
                internalNotes: isPrivateMode ? internalNotes : null
            }
        ]);
    }, 600);
  };

  const sources = [
    { title: "2025 Hydrogeologic Survey", type: "PDF", isPublic: true },
    { title: "Perimeter Acoustic Assessment", type: "PDF", isPublic: true },
    { title: "Local Economic Impact", type: "Report", isPublic: true },
    { title: "Internal Operations Memo", type: "Doc", isPublic: false },
  ];

  if (includeHistorical) {
      sources.push({ title: "Global Industry Benchmark (2018-2023)", type: "Dataset", isPublic: true });
      sources.push({ title: "Past Regional Projects Review", type: "Report", isPublic: true });
  }

  const visibleSources = isPrivateMode ? sources : sources.filter(s => s.isPublic);

  return (
    <div className="h-screen w-full bg-carbon text-gray-100 flex overflow-hidden font-sans relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-smokyTeal/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Sidebar - NotebookLM Style */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-smokyTeal/20 bg-black/40 flex flex-col z-10 overflow-hidden shrink-0`}>
         <div className="p-4 border-b border-smokyTeal/20 flex flex-col min-w-[320px] gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-sm font-medium text-cyanGlow uppercase tracking-wider">Knowledge Sources</h2>
                {isPrivateMode && (
                    <button className="text-xs bg-smokyTeal/20 text-smokyTeal hover:bg-smokyTeal hover:text-carbon px-2 py-1 rounded transition-colors flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Upload
                    </button>
                )}
            </div>

            {/* Historical Context Toggle */}
            <div className="flex items-center justify-between bg-black/40 border border-smokyTeal/30 rounded-lg p-2.5">
                <div className="flex items-center gap-2">
                    <Globe className={`w-4 h-4 ${includeHistorical ? 'text-cyanGlow' : 'text-gray-500'}`} />
                    <span className="text-xs text-gray-300 font-medium">Historical Context</span>
                </div>
                <button 
                  onClick={() => setIncludeHistorical(!includeHistorical)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${includeHistorical ? 'bg-cyanGlow' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${includeHistorical ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-3 min-w-[320px]">
            {visibleSources.map((src, i) => (
                <div key={i} className="glass-morphism rounded-xl p-3 border border-smokyTeal/20 hover:border-cyanGlow/40 transition-colors cursor-pointer group flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${src.isPublic ? 'bg-smokyTeal/10 text-smokyTeal' : 'bg-burntOrange/10 text-burntOrange'}`}>
                        <FileText className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors leading-tight">{src.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider">{src.type}</span>
                            {!src.isPublic && <span className="text-[10px] text-burntOrange border border-burntOrange/30 px-1 rounded">Private</span>}
                        </div>
                    </div>
                </div>
            ))}
         </div>
         {/* Embed Code Snippet Generator */}
         {isPrivateMode && (
             <div className="p-4 border-t border-smokyTeal/20 bg-smokyTeal/5 min-w-[320px]">
                 <p className="text-xs text-gray-400 mb-2">Deploy directly to an external community site:</p>
                 <button className="w-full bg-black/50 border border-smokyTeal/30 hover:border-cyanGlow hover:text-white text-gray-400 py-2 rounded-lg text-xs flex justify-center items-center gap-2 transition-colors">
                     <Download className="w-3 h-3" /> Copy Embed Script
                 </button>
             </div>
         )}
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10 w-full min-w-0">
        <header className="h-14 border-b border-smokyTeal/20 flex items-center justify-between px-4 shrink-0 bg-carbon/80 backdrop-blur-md">
           <div className="flex items-center gap-3">
             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition-colors">
                {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
             </button>
             <h1 className="text-lg font-light tracking-tight text-white mt-0.5">
                LBKH Project <span className="text-smokyTeal font-medium">Liaison</span>
             </h1>
           </div>
           
           {/* Public / Private Toggle */}
           <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-smokyTeal/30">
              <button 
                onClick={() => setIsPrivateMode(false)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${!isPrivateMode ? 'bg-smokyTeal text-carbon shadow-sm' : 'text-gray-400 hover:text-white'}`}
              >
                 <Unlock className="w-3 h-3" /> Public
              </button>
              <button 
                onClick={() => setIsPrivateMode(true)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${isPrivateMode ? 'bg-burntOrange text-carbon shadow-sm' : 'text-gray-400 hover:text-white'}`}
              >
                 <Lock className="w-3 h-3" /> Private
              </button>
           </div>
        </header>

        {isPrivateMode && (
            <div className="bg-burntOrange/10 border-b border-burntOrange/20 px-4 py-2 flex items-center gap-3 text-xs text-burntOrange">
                <BarChart2 className="w-4 h-4 shrink-0" />
                <span><strong>Executive Mode Active.</strong> You are viewing internal notes and private documents not available in the public embedded widget.</span>
            </div>
        )}
        
        {/* Chat Interface */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col gap-6 hide-scrollbar relative">
          <div className="max-w-3xl w-full mx-auto flex flex-col gap-6 pb-4">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                   <div className={`p-4 rounded-2xl max-w-[90%] sm:max-w-[80%] text-sm leading-relaxed shadow-md ${m.role === 'user' ? 'bg-smokyTeal/90 text-white rounded-tr-sm' : 'glass-morphism border border-smokyTeal/30 text-gray-200 rounded-tl-sm'}`}>
                     {m.text}
                     {m.source && (
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-start gap-2">
                           <FileText className="w-4 h-4 text-cyanGlow mt-0.5 shrink-0" />
                           <span className="text-xs text-gray-300 italic">Source: {m.source}</span>
                        </div>
                     )}
                     {m.internalNotes && isPrivateMode && (
                        <div className="mt-3 bg-burntOrange/10 border border-burntOrange/30 rounded-lg p-2 text-xs text-burntOrange shadow-inner">
                            {m.internalNotes}
                        </div>
                     )}
                   </div>
                </div>
              ))}
              <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-6 bg-gradient-to-t from-carbon via-carbon to-transparent shrink-0">
            <div className="max-w-3xl mx-auto relative">
                <form onSubmit={handleSend} className="glass-morphism rounded-2xl border border-smokyTeal/40 flex items-end gap-2 p-2 shadow-xl focus-within:border-cyanGlow transition-colors bg-black/40">
                  <textarea 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                        if(e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend(e);
                        }
                    }}
                    placeholder={includeHistorical ? "Ask how Bonner compares to past projects..." : (isPrivateMode ? "Query internal and public documents..." : "Ask the project liaison a question...")}
                    className="flex-1 bg-transparent resize-none max-h-32 min-h-[44px] py-3 px-4 text-sm text-white focus:outline-none hide-scrollbar"
                    rows={1}
                  />
                  <button type="submit" disabled={!input.trim()} className="bg-smokyTeal hover:bg-cyanGlow disabled:opacity-50 disabled:hover:bg-smokyTeal text-carbon p-3 rounded-xl transition-colors shrink-0 mb-0.5 mr-0.5 border border-transparent">
                    <Send className="w-5 h-5 ml-0.5" />
                  </button>
                </form>
                <div className="text-center mt-2 text-[10px] text-gray-500">
                    LBKH Project Liaison is in prototyping simulation mode. Responses are pre-coded for demonstration purposes only.
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
