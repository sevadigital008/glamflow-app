import React, { useState, useEffect } from 'react';
import { Home, Film, Settings, Sparkles, Wind, Droplets, Zap, Hand, X, Upload, Palette, Type, Clapperboard, Music, ChevronLeft, ChevronRight, CheckCircle2, Wand2, Copy, LoaderCircle, Lightbulb, FileText, Mic, Download, Brush, Image as ImageIcon, MessageSquare, Users, Smartphone, Shirt, Paintbrush, RectangleHorizontal, Target, TrendingUp, CalendarDays, Video, KeyRound, Check } from 'lucide-react';

// --- Helper Data ---
const trendingSoundsGlobal = [
  { id: 1, title: "Espresso", artist: "Sabrina Carpenter", category: "Upbeat & Fun", template: "Wipe Transition" },
  { id: 2, title: "Aesthetic Girl", artist: "Yusei", category: "GRWM & Soft", template: "Snap Transition" },
  { id: 3, title: "Birds of a Feather", artist: "Billie Eilish", category: "Elegant & Story", template: "Product Reveal" },
  { id: 4, title: "Gimme More", artist: "Britney Spears", category: "Dramatic & Bold", template: "Cover/Uncover" },
  { id: 5, title: "Please Please Please", artist: "Sabrina Carpenter", category: "Sassy & Pop", template: "Phone Drop" },
  { id: 6, title: "Good Luck, Babe!", artist: "Chappell Roan", category: "Powerful & Pop", template: "Outfit Change" },
  { id: 7, title: "LUNCH", artist: "Billie Eilish", category: "Chill & Vibey", template: "Mirror Reveal" },
  { id: 8, title: "Too Sweet", artist: "Hozier", category: "Indie & Cool", template: "Product Swatch" },
  { id: 9, title: "MILLION DOLLAR BABY", artist: "Tommy Richman", category: "Viral & Energetic", template: "Wipe Transition" },
  { id: 10, title: "Tell Ur Girlfriend", artist: "Lay Bankz", category: "Confident & Upbeat", template: "Snap Transition" },
];

const trendingSoundsIndonesia = [
  { id: 11, title: "Gala Suka", artist: "Ghea Indrawari", category: "Galau & Pop", template: "Mirror Reveal" },
  { id: 12, title: "Bermuara", artist: "Rizky Febian & Mahalini", category: "Romantis & Duet", template: "Product Reveal" },
  { id: 13, title: "Sialan", artist: "Juicy Luicy", category: "Indie Pop & Sedih", template: "Wipe Transition" },
  { id: 14, title: "Lampu Merah", artist: "The Lantis", category: "Indie & Senja", template: "Phone Drop" },
  { id: 15, title: "Dola", artist: "Angga Dermawan", category: "Lagu Daerah & Viral", template: "Outfit Change" },
  { id: 16, title: "Komang", artist: "Raim Laode", category: "Akustik & Cinta", template: "Snap Transition" },
  { id: 17, title: "Cikini Gondangdia (Remix)", artist: "Duo Anggrek", category: "Dangdut & Fun", template: "Outfit Change" },
  { id: 18, title: "Tak Segampang Itu", artist: "Anggi Marito", category: "Pop Ballad", template: "Cover/Uncover" },
  { id: 19, title: "Nemen", artist: "Gildcoustic", category: "Jawa Pop & Ambyar", template: "Mirror Reveal" },
  { id: 20, title: "Satu Satu", artist: "Idgitaf", category: "Self-love & Pop", template: "Wipe Transition" },
];


const transitionTemplates = [
    { id: "Wipe Transition", name: "Wipe Transition", icon: <Wind className="w-12 h-12 mx-auto text-sky-500" />, description: "Transisi klasik dengan usapan kuas atau tangan.", steps: ["Rekam klip pertama: Tampilkan wajah Anda tanpa makeup.", "Rekam klip kedua: Lakukan gerakan mengusap ke arah kamera dengan kuas atau tangan.", "Rekam klip ketiga: Tampilkan hasil akhir makeup Anda setelah 'usapan' selesai.",] },
    { id: "Snap Transition", name: "Snap Transition", icon: <Hand className="w-12 h-12 mx-auto text-yellow-500" />, description: "Perubahan instan dengan jentikan jari.", steps: ["Rekam klip pertama: Pose dengan wajah tanpa makeup.", "Rekam klip kedua: Lakukan gerakan menjentikkan jari di depan kamera.", "Rekam klip ketiga: Tampilkan hasil makeup Anda dalam sekejap setelah jentikan.",] },
    { id: "Product Reveal", name: "Product Reveal", icon: <Droplets className="w-12 h-12 mx-auto text-red-500" />, description: "Fokus pada produk yang Anda gunakan.", steps: ["Rekam klip pertama: Tunjukkan produk makeup (misal: foundation) di depan kamera.", "Rekam klip kedua: Tutupi lensa dengan produk tersebut.", "Rekam klip ketiga: Tarik produk dari lensa untuk menampilkan wajah yang sudah diaplikasikan produk itu.",] },
    { id: "Cover/Uncover", name: "Cover/Uncover", icon: <Zap className="w-12 h-12 mx-auto text-purple-500" />, description: "Transisi dramatis dengan menutupi wajah.", steps: ["Rekam klip pertama: Tampilkan wajah tanpa makeup.", "Rekam klip kedua: Tutupi wajah Anda dengan kedua tangan.", "Rekam klip ketiga: Tarik tangan Anda untuk memperlihatkan hasil makeup yang menakjubkan.",] },
    { id: "Phone Drop", name: "Phone Drop Transition", icon: <Smartphone className="w-12 h-12 mx-auto text-gray-600" />, description: "Jatuhkan ponsel (dengan aman!) untuk reveal.", steps: ["Rekam klip pertama: Tampilkan wajah tanpa makeup sambil memegang ponsel.", "Rekam klip kedua: Jatuhkan ponsel ke permukaan empuk (sofa/kasur).", "Rekam klip ketiga: Ambil ponsel dari permukaan untuk menampilkan hasil makeup Anda.",] },
    { id: "Outfit Change", name: "Outfit Change", icon: <Shirt className="w-12 h-12 mx-auto text-green-500" />, description: "Lompat untuk mengubah makeup dan pakaian.", steps: ["Rekam klip pertama: Dengan wajah tanpa makeup, lakukan gerakan melompat.", "Rekam klip kedua: Mendarat dari lompatan dengan hasil makeup dan outfit yang berbeda.", "Pastikan posisi kamera tidak berubah sama sekali untuk hasil terbaik.",] },
    { id: "Product Swatch", name: "Product Swatch", icon: <Paintbrush className="w-12 h-12 mx-auto text-orange-500" />, description: "Tunjukkan swatch produk di tangan atau wajah.", steps: ["Rekam klip pertama: Tunjukkan produk (eyeshadow/lipstick).", "Rekam klip kedua: Lakukan gerakan mengoleskan produk di tangan/lengan.", "Rekam klip ketiga: Tampilkan hasil swatch yang rapi dan jelas.",] },
    { id: "Mirror Reveal", name: "Mirror Reveal", icon: <RectangleHorizontal className="w-12 h-12 mx-auto text-blue-500" />, description: "Gunakan cermin untuk transisi before-after.", steps: ["Rekam klip pertama: Tampilkan bayangan Anda di cermin dengan wajah tanpa makeup.", "Rekam klip kedua: Gerakkan cermin menutupi kamera.", "Rekam klip ketiga: Jauhkan cermin dari kamera untuk menampilkan hasil makeup Anda.",] }
];

// --- Components ---

const Header = () => (
  <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-20">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-8 h-8 text-pink-500" />
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">GlamFlow</h1>
      </div>
    </div>
  </header>
);

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: <Home />, label: 'Beranda' },
    { id: 'templates', icon: <Film />, label: 'Template' },
    { id: 'tools', icon: <Wand2 />, label: 'Tools' },
    { id: 'settings', icon: <Settings />, label: 'Pengaturan' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20">
      <div className="container mx-auto px-4 flex justify-around">
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center justify-center space-y-1 py-3 px-2 w-1/4 transition-all duration-300 ${activeTab === item.id ? 'text-pink-500 scale-110' : 'text-gray-500'}`}>
            <div className={`${activeTab === item.id ? 'transform scale-125' : ''}`}>{item.icon}</div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const AIIdeaGenerator = ({ apiKey }) => {
    const [theme, setTheme] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ideas, setIdeas] = useState([]);
    const [error, setError] = useState(null);

    const generateIdeas = async () => {
        if (!apiKey) { setError("Harap masukkan API Key Anda di menu Pengaturan."); return; }
        if (!theme) { setError("Masukkan tema atau kata kunci terlebih dahulu."); return; }
        setIsLoading(true); setError(null); setIdeas([]);
        const prompt = `You are a creative assistant for Make-Up Artists on TikTok. Generate 3 fresh and creative video ideas based on the theme: "${theme}". For each idea, provide a catchy title, a short description of the video concept, and a music suggestion (e.g., 'Upbeat Pop', 'Cinematic', 'Lo-fi'). The response must be in Indonesian. Format the output as a valid JSON object with a single key "ideas" which is an array of 3 objects. Each object should have three keys: "title", "description", and "musicSuggestion".`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { "ideas": { type: "ARRAY", items: { type: "OBJECT", properties: { "title": { "type": "STRING" }, "description": { "type": "STRING" }, "musicSuggestion": { "type": "STRING" } }, required: ["title", "description", "musicSuggestion"] } } }, required: ["ideas"] } } };
        try { const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`; const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) throw new Error(`API request failed with status ${response.status}`); const result = await response.json(); if (result.candidates && result.candidates.length > 0) { const text = result.candidates[0].content.parts[0].text; setIdeas(JSON.parse(text).ideas); } else { throw new Error("Respons dari AI tidak valid."); }
        } catch (err) { console.error("Error calling Gemini API for ideas:", err); setError("Gagal mendapatkan ide dari AI. Coba lagi."); } finally { setIsLoading(false); }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center"><Lightbulb className="w-5 h-5 mr-2 text-yellow-500"/>Dapatkan Ide Instan dengan AI</h3>
            <div className="flex space-x-2">
                <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="Ketik tema, mis: 'makeup lebaran'" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                <button onClick={generateIdeas} disabled={isLoading} className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:bg-yellow-300"> {isLoading ? <LoaderCircle className="animate-spin" /> : 'Buat'} </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-4 space-y-3">
                {ideas.map((idea, index) => ( <div key={index} className="bg-gray-50 p-3 rounded-lg animate-fade-in"> <p className="font-bold text-gray-800">{idea.title}</p> <p className="text-sm text-gray-600 mt-1">{idea.description}</p> <p className="text-xs text-yellow-700 font-medium mt-2 bg-yellow-100 inline-block px-2 py-1 rounded-full">Saran Musik: {idea.musicSuggestion}</p> </div> ))}
            </div>
        </div>
    );
};

const HomeScreen = ({ onUseTemplate, apiKey }) => {
    const [region, setRegion] = useState('Global');
    const [soundList, setSoundList] = useState(trendingSoundsGlobal);
    const [selectedSoundId, setSelectedSoundId] = useState(trendingSoundsGlobal[0].id);

    useEffect(() => {
        const newSoundList = region === 'Global' ? trendingSoundsGlobal : trendingSoundsIndonesia;
        setSoundList(newSoundList);
        setSelectedSoundId(newSoundList[0].id);
    }, [region]);

    const handleSoundChange = (e) => {
        setSelectedSoundId(Number(e.target.value));
    };

    const selectedSound = soundList.find(s => s.id === selectedSoundId);

    return (
        <div className="p-4 space-y-6">
            <AIIdeaGenerator apiKey={apiKey} />
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <Music className="w-5 h-5 mr-2 text-pink-500" />Trending Sounds for MUA
                </h2>
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 space-y-3">
                    <div className="flex border-b">
                        <button onClick={() => setRegion('Global')} className={`px-4 py-2 text-sm font-semibold ${region === 'Global' ? 'border-b-2 border-pink-500 text-pink-500' : 'text-gray-500'}`}>Global</button>
                        <button onClick={() => setRegion('Indonesia')} className={`px-4 py-2 text-sm font-semibold ${region === 'Indonesia' ? 'border-b-2 border-pink-500 text-pink-500' : 'text-gray-500'}`}>Indonesia</button>
                    </div>
                    <label htmlFor="sound-select" className="block text-sm font-medium text-gray-700">Pilih suara yang sedang tren:</label>
                    <select id="sound-select" value={selectedSoundId} onChange={handleSoundChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 bg-white">
                        {soundList.map(sound => ( <option key={sound.id} value={sound.id}> {sound.title} - {sound.artist} </option> ))}
                    </select>
                    {selectedSound && (
                        <div className="flex items-center justify-between pt-2">
                            <div>
                                <p className="text-sm text-gray-500">Kategori: <span className="font-medium text-pink-500">{selectedSound.category}</span></p>
                                <p className="text-sm text-gray-500">Saran Template: <span className="font-medium text-purple-500">{selectedSound.template}</span></p>
                            </div>
                            <button onClick={() => onUseTemplate(selectedSound.template)} className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-600 transition-colors duration-300 shadow-sm hover:shadow-md flex-shrink-0"> Gunakan </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TemplatesScreen = ({ onUseTemplate, onOpenScriptGenerator }) => (
    <div className="p-4 space-y-6">
        <div>
            <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-5 rounded-xl shadow-lg text-white cursor-pointer hover:opacity-95 transition-opacity" onClick={onOpenScriptGenerator}>
                <div className="flex items-center space-x-3">
                    <FileText className="w-10 h-10"/>
                    <div> <h3 className="text-xl font-bold">✨ AI Scriptwriter</h3> <p className="text-sm opacity-90">Buat skrip video tutorial atau GRWM lengkap dengan AI.</p> </div>
                </div>
            </div>
        </div>
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Perpustakaan Template Transisi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {transitionTemplates.map(template => (
                    <div key={template.id} className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col text-center hover:shadow-lg transition-shadow duration-300">
                        {template.icon} <h3 className="text-lg font-bold text-gray-800 mt-3">{template.name}</h3> <p className="text-sm text-gray-500 mt-1 mb-4 flex-grow">{template.description}</p>
                        <button onClick={() => onUseTemplate(template.id)} className="bg-purple-500 text-white w-full px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 transition-colors duration-300 shadow-sm hover:shadow-md"> Mulai Rekam </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const AIContentStrategist = ({ apiKey }) => {
    const [goal, setGoal] = useState('');
    const [context, setContext] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [strategy, setStrategy] = useState(null);
    const [error, setError] = useState(null);

    const generateStrategy = async () => {
        if (!apiKey) { setError("Harap masukkan API Key Anda di menu Pengaturan."); return; }
        if (!goal) { setError("Tolong tentukan tujuan utama Anda."); return; }
        setIsLoading(true); setError(null); setStrategy(null);
        const prompt = `Act as a TikTok content strategist for a Make-Up Artist. Their main goal is to "${goal}". Their current situation is: "${context || 'tidak ada informasi tambahan'}". Create a simple, actionable content strategy for the next 7 days. The response must be in Indonesian. Format the output as a valid JSON object with keys: "strategyTitle", "contentPillars" (an array of strings), "videoSuggestions" (an array of objects, each with "day" and "idea" keys), and "generalTips" (an array of strings).`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { "strategyTitle": { "type": "STRING" }, "contentPillars": { "type": "ARRAY", "items": { "type": "STRING" } }, "videoSuggestions": { "type": "ARRAY", "items": { "type": "OBJECT", "properties": { "day": { "type": "STRING" }, "idea": { "type": "STRING" } }, "required": ["day", "idea"] } }, "generalTips": { "type": "ARRAY", "items": { "type": "STRING" } } }, required: ["strategyTitle", "contentPillars", "videoSuggestions", "generalTips"] } } };
        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`; const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) throw new Error(`API request failed with status ${response.status}`); const result = await response.json(); if (result.candidates && result.candidates.length > 0) { const text = result.candidates[0].content.parts[0].text; setStrategy(JSON.parse(text)); } else { throw new Error("Respons dari AI tidak valid."); }
        } catch (err) { console.error("Error calling Gemini API for strategy:", err); setError("Gagal membuat strategi. Coba lagi."); } finally { setIsLoading(false); }
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><Target className="w-6 h-6 mr-2 text-blue-500"/>AI Content Strategist</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="goal" className="block text-sm font-semibold text-gray-700 mb-1">Apa tujuan utama Anda?</label>
                    <input type="text" id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Contoh: 'Meningkatkan followers'" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="context-strategy" className="block text-sm font-semibold text-gray-700 mb-1">Catatan tentang performa video (Opsional)</label>
                    <textarea id="context-strategy" value={context} onChange={(e) => setContext(e.target.value)} placeholder="Contoh: 'Video transisi banyak disukai, tutorial kurang'" rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <button onClick={generateStrategy} disabled={isLoading} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2">
                    {isLoading ? <><LoaderCircle className="w-5 h-5 animate-spin"/><span>Menyusun Strategi...</span></> : <><Wand2/><span>✨ Buat Rencana Konten</span></>}
                </button>
                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                {strategy && (
                    <div className="space-y-4 pt-4 border-t animate-fade-in">
                        <h4 className="text-lg font-bold text-center text-gray-800">{strategy.strategyTitle}</h4>
                        <div className="space-y-3">
                            <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="font-bold text-blue-700 flex items-center"><TrendingUp className="w-4 h-4 mr-2"/>Pilar Konten Utama:</p>
                                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                                    {strategy.contentPillars.map((pillar, i) => <li key={i}>{pillar}</li>)}
                                </ul>
                            </div>
                            <div className="bg-indigo-50 p-3 rounded-lg">
                                <p className="font-bold text-indigo-700 flex items-center"><CalendarDays className="w-4 h-4 mr-2"/>Saran Jadwal Video:</p>
                                <ul className="space-y-1 text-sm text-gray-700 mt-1">
                                    {strategy.videoSuggestions.map((vid, i) => <li key={i}><b>{vid.day}:</b> {vid.idea}</li>)}
                                </ul>
                            </div>
                             <div className="bg-gray-100 p-3 rounded-lg">
                                <p className="font-bold text-gray-700 flex items-center"><Lightbulb className="w-4 h-4 mr-2"/>Tips Umum:</p>
                                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                                    {strategy.generalTips.map((tip, i) => <li key={i}>{tip}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AICommentResponder = ({ apiKey }) => {
    const [comment, setComment] = useState('');
    const [context, setContext] = useState('');
    const [tone, setTone] = useState('Ramah');
    const [isLoading, setIsLoading] = useState(false);
    const [replies, setReplies] = useState([]);
    const [error, setError] = useState(null);
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = (textToCopy) => { const textArea = document.createElement('textarea'); textArea.value = textToCopy; document.body.appendChild(textArea); textArea.select(); try { document.execCommand('copy'); setCopySuccess(textToCopy); setTimeout(() => setCopySuccess(''), 2000); } catch (err) { console.error('Gagal menyalin teks: ', err); } document.body.removeChild(textArea); };

    const generateReplies = async () => {
        if (!apiKey) { setError("Harap masukkan API Key Anda di menu Pengaturan."); return; }
        if (!comment) { setError("Mohon masukkan komentar yang ingin dibalas."); return; }
        setIsLoading(true); setError(null); setReplies([]);
        const prompt = `You are a friendly and professional social media manager for a popular Make-Up Artist. A user left a comment on a TikTok video. The video's context is: "${context || 'sebuah video makeup'}". The user's comment is: "${comment}". Please draft 3 distinct, engaging, and appropriate replies in a "${tone}" tone. The replies must be in Indonesian. Format the output as a valid JSON object with a single key "replies", which is an array of 3 strings.`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { "replies": { type: "ARRAY", items: { "type": "STRING" } } }, required: ["replies"] } } };
        
        try { const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`; const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) throw new Error(`API request failed with status ${response.status}`); const result = await response.json(); if (result.candidates && result.candidates.length > 0) { const text = result.candidates[0].content.parts[0].text; setReplies(JSON.parse(text).replies); } else { throw new Error("Respons dari AI tidak valid."); }
        } catch (err) { console.error("Error calling Gemini API for replies:", err); setError("Gagal membuat balasan. Coba lagi."); } finally { setIsLoading(false); }
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><MessageSquare className="w-6 h-6 mr-2 text-green-500"/>AI Comment Responder</h3>
            <div className="space-y-4">
                <div> <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-1">Tempel Komentar di Sini</label> <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Contoh: 'Kak, spill dong foundationnya!'" rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"></textarea> </div>
                <div> <label htmlFor="context" className="block text-sm font-semibold text-gray-700 mb-1">Konteks Video (Opsional)</label> <input type="text" id="context" value={context} onChange={(e) => setContext(e.target.value)} placeholder="Contoh: 'Video tutorial smokey eye'" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" /> </div>
                <div> <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Nada Balasan</label> <div className="flex flex-wrap gap-2"> {['Ramah', 'Profesional', 'Terima Kasih', 'Lucu'].map(t => ( <button key={t} onClick={() => setTone(t)} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${tone === t ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{t}</button> ))} </div> </div>
                <button onClick={generateReplies} disabled={isLoading} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"> {isLoading ? <><LoaderCircle className="w-5 h-5 animate-spin"/><span>Membuat Balasan...</span></> : <><Wand2/><span>✨ Buat Balasan (AI)</span></>} </button>
                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                {replies.length > 0 && (
                    <div className="space-y-3 pt-4 border-t">
                        <h4 className="font-bold text-gray-800">Saran Balasan:</h4>
                        {replies.map((reply, index) => (
                            <div key={index} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center gap-2">
                                <p className="text-gray-700 text-sm flex-grow">{reply}</p>
                                <button onClick={() => copyToClipboard(reply)} className="text-gray-500 hover:text-green-600 p-1 rounded-md flex-shrink-0"> {copySuccess === reply ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />} </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ToolsScreen = ({ onOpenLookbook, apiKey }) => (
    <div className="p-4 space-y-6">
        <div className="bg-gradient-to-r from-pink-500 to-orange-400 p-6 rounded-xl shadow-lg text-white cursor-pointer hover:opacity-95 transition-opacity" onClick={onOpenLookbook}>
            <div className="flex items-center space-x-4">
                <Brush className="w-12 h-12"/>
                <div> <h3 className="text-2xl font-bold">✨ AI Lookbook</h3> <p className="text-md opacity-90">Dapatkan konsep makeup detail dari tema atau foto outfit.</p> </div>
            </div>
        </div>
        <AIContentStrategist apiKey={apiKey} />
        <AICommentResponder apiKey={apiKey} />
    </div>
);

const SettingsScreen = ({ userApiKey, setUserApiKey }) => {
    const [tempKey, setTempKey] = useState(userApiKey);
    const [saveStatus, setSaveStatus] = useState('');

    const handleSave = () => {
        setUserApiKey(tempKey);
        setSaveStatus('Kunci API berhasil disimpan!');
        setTimeout(() => setSaveStatus(''), 3000);
    };

    return (
        <div className="p-4 space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><KeyRound className="w-6 h-6 mr-2 text-gray-600"/>Pengaturan API Key Gemini</h3>
                <div className="space-y-2">
                    <label htmlFor="api-key" className="block text-sm font-semibold text-gray-700">API Key Anda</label>
                    <input type="password" id="api-key" value={tempKey} onChange={(e) => setTempKey(e.target.value)} placeholder="Tempel API Key Anda di sini" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                </div>
                <button onClick={handleSave} className="mt-4 w-full bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors">Simpan</button>
                {saveStatus && <p className="text-green-600 text-sm mt-2 text-center flex items-center justify-center"><Check className="w-4 h-4 mr-1"/>{saveStatus}</p>}
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Cara Mendapatkan API Key Gemini</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>Kunjungi <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-semibold">Google AI Studio</a>.</li>
                    <li>Login dengan akun Google Anda.</li>
                    <li>Klik tombol "<b>Create API key</b>".</li>
                    <li>Pilih atau buat Proyek Google Cloud baru jika diminta.</li>
                    <li>Salin (copy) API key yang muncul dan tempel di kolom di atas.</li>
                </ol>
            </div>
        </div>
    );
};

const RecordingModal = ({ templateId, onClose, onOpenAIGenerator }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const template = transitionTemplates.find(t => t.id === templateId);

    if (!template) return null;

    const handleNext = () => { if (currentStep < template.steps.length - 1) { setCurrentStep(currentStep + 1); } else { setIsFinished(true); } };
    const handlePrev = () => { if (currentStep > 0) { setCurrentStep(currentStep - 1); } };
    const handleCloseAndReset = () => { setIsFinished(false); setCurrentStep(0); onClose(); };
    const handleOpenAI = () => { onOpenAIGenerator(template.name); handleCloseAndReset(); };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-scale-in">
                {isFinished ? (
                    <div className="p-8 text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4"/>
                        <h3 className="text-2xl font-bold text-gray-800">Video Dibuat!</h3>
                        <p className="text-gray-600 mt-2 mb-6">Video transisi Anda sudah siap. Sekarang, buat caption yang menarik dengan bantuan AI.</p>
                        <div className="space-y-3">
                            <button onClick={handleOpenAI} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300 flex items-center justify-center space-x-2"> <Wand2 /> <span>✨ Buat Caption (AI)</span> </button>
                            <button onClick={handleCloseAndReset} className="bg-gray-200 text-gray-700 w-full px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"> Nanti Saja </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">{template.name}</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X /></button>
                        </div>
                        <div className="p-6 text-center">
                            <div className="mb-4"> <span className="text-sm font-semibold text-pink-500 bg-pink-100 py-1 px-3 rounded-full">LANGKAH {currentStep + 1} DARI {template.steps.length}</span> </div>
                            <div className="bg-gray-100 rounded-lg p-8 my-4 flex items-center justify-center min-h-[150px]"> <p className="text-lg font-medium text-gray-700">{template.steps[currentStep]}</p> </div>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-b-2xl flex justify-between items-center">
                            <button onClick={handlePrev} disabled={currentStep === 0} className="text-gray-600 font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center"> <ChevronLeft className="w-5 h-5 mr-1"/> Kembali </button>
                            <button onClick={handleNext} className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-300 shadow-md"> {currentStep === template.steps.length - 1 ? 'Selesaikan & Buat Video' : 'Langkah Berikutnya'} </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// --- Gemini AI Components ---
const AICaptionGeneratorModal = ({ templateName, onClose, apiKey }) => {
    const [userPrompt, setUserPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = (textToCopy) => { const textArea = document.createElement('textarea'); textArea.value = textToCopy; document.body.appendChild(textArea); textArea.select(); try { document.execCommand('copy'); setCopySuccess(textToCopy); setTimeout(() => setCopySuccess(''), 2000); } catch (err) { console.error('Gagal menyalin teks: ', err); } document.body.removeChild(textArea); };

    const handleGenerate = async () => {
        if (!apiKey) { setError("Harap masukkan API Key Anda di menu Pengaturan."); return; }
        if (!userPrompt) { setError("Mohon isi deskripsi singkat video Anda."); return; }
        setIsLoading(true); setError(null); setGeneratedContent(null);
        const prompt = `You are a social media expert for Make-Up Artists. Create catchy TikTok captions and relevant hashtags for a makeup video. The video uses a "${templateName}" transition and is about "${userPrompt}". Provide 3 caption options and 1 set of optimized hashtags. The response must be in Indonesian. Format the output as a valid JSON object with two keys: "captions" (an array of 3 strings) and "hashtags" (a single string of space-separated hashtags).`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { "captions": { type: "ARRAY", items: { "type": "STRING" } }, "hashtags": { "type": "STRING" } }, required: ["captions", "hashtags"] } } };
        try { const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`; const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) throw new Error(`API request failed with status ${response.status}`); const result = await response.json(); if (result.candidates && result.candidates.length > 0) { const text = result.candidates[0].content.parts[0].text; setGeneratedContent(JSON.parse(text)); } else { throw new Error("Respons dari AI tidak valid."); } } catch (err) { console.error("Error calling Gemini API for captions:", err); setError("Maaf, terjadi kesalahan saat membuat konten. Coba lagi nanti."); } finally { setIsLoading(false); }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform animate-scale-in max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center"><Wand2 className="mr-2 text-purple-500"/>AI Caption & Hashtag Generator</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X /></button>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    <div> <label htmlFor="prompt" className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi singkat video Anda</label> <input type="text" id="prompt" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} placeholder="Contoh: 'Smokey eye look untuk pesta'" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" /> </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {isLoading && ( <div className="flex flex-col items-center justify-center text-center p-8 space-y-3"> <LoaderCircle className="w-10 h-10 text-pink-500 animate-spin" /> <p className="font-semibold text-gray-600">AI sedang meracik kata-kata...</p> </div> )}
                    {generatedContent && ( <div className="space-y-4 animate-fade-in"> <div> <h4 className="font-bold text-gray-800 mb-2">✨ Pilihan Caption:</h4> <div className="space-y-2"> {generatedContent.captions.map((caption, index) => ( <div key={index} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"> <p className="text-gray-700 text-sm flex-grow mr-2">{caption}</p> <button onClick={() => copyToClipboard(caption)} className="text-gray-500 hover:text-pink-500 p-1 rounded-md"> {copySuccess === caption ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} </button> </div> ))} </div> </div> <div> <h4 className="font-bold text-gray-800 mb-2">✨ Rekomendasi Hashtag:</h4> <div className="bg-purple-50 p-3 rounded-lg flex justify-between items-center"> <p className="text-purple-800 text-sm flex-grow mr-2 break-words">{generatedContent.hashtags}</p> <button onClick={() => copyToClipboard(generatedContent.hashtags)} className="text-purple-600 hover:text-purple-800 p-1 rounded-md"> {copySuccess === generatedContent.hashtags ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} </button> </div> </div> </div> )}
                </div>
                <div className="p-6 bg-gray-50 rounded-b-2xl mt-auto"> <button onClick={handleGenerate} disabled={isLoading} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center space-x-2"> {isLoading ? <><LoaderCircle className="w-5 h-5 animate-spin" /><span>Membuat...</span></> : <><Wand2 /><span>Buat Sekarang</span></>} </button> </div>
            </div>
        </div>
    );
};

const AIScriptGeneratorModal = ({ onClose, apiKey }) => {
    const [topic, setTopic] = useState('');
    const [isLoadingScript, setIsLoadingScript] = useState(false);
    const [script, setScript] = useState([]);
    const [scriptError, setScriptError] = useState(null);
    const [isLoadingAudio, setIsLoadingAudio] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioError, setAudioError] = useState(null);

    const base64ToArrayBuffer = (base64) => { const binaryString = window.atob(base64); const len = binaryString.length; const bytes = new Uint8Array(len); for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); } return bytes.buffer; };
    const pcmToWav = (pcmData, sampleRate) => { const numChannels = 1; const bitsPerSample = 16; const blockAlign = (numChannels * bitsPerSample) / 8; const byteRate = sampleRate * blockAlign; const dataSize = pcmData.byteLength; const buffer = new ArrayBuffer(44 + dataSize); const view = new DataView(buffer); view.setUint32(0, 0x52494646, false); view.setUint32(4, 36 + dataSize, true); view.setUint32(8, 0x57415645, false); view.setUint32(12, 0x666d7420, false); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, numChannels, true); view.setUint32(24, sampleRate, true); view.setUint32(28, byteRate, true); view.setUint16(32, blockAlign, true); view.setUint16(34, bitsPerSample, true); view.setUint32(36, 0x64617461, false); view.setUint32(40, dataSize, true); new Uint8Array(buffer, 44).set(new Uint8Array(pcmData)); return new Blob([view], { type: 'audio/wav' }); };

    const generateScript = async () => {
        if (!apiKey) { setScriptError("Harap masukkan API Key Anda di menu Pengaturan."); return; }
        if (!topic) { setScriptError("Mohon isi topik video Anda."); return; }
        setIsLoadingScript(true); setScriptError(null); setScript([]); setAudioUrl(null);
        const prompt = `You are an expert scriptwriter for MUA TikTok content. Generate a detailed video script based on the topic: "${topic}". The script should be broken down into 3-5 segments. The response must be in Indonesian. Format the output as a valid JSON object with a single key "script", which is an array of objects. Each object must have two keys: "visual" (a string describing the visual action) and "voiceover" (a string for the narration). Keep the tone friendly, engaging, and easy to follow. The script should be concise enough for a short TikTok video.`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { "script": { type: "ARRAY", items: { type: "OBJECT", properties: { "visual": { "type": "STRING" }, "voiceover": { "type": "STRING" } }, required: ["visual", "voiceover"] } } }, required: ["script"] } } };
        try { const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`; const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) throw new Error(`API request failed with status ${response.status}`); const result = await response.json(); if (result.candidates && result.candidates.length > 0) { const text = result.candidates[0].content.parts[0].text; setScript(JSON.parse(text).script); } else { throw new Error("Respons dari AI tidak valid."); }
        } catch (err) { console.error("Error calling Gemini API for script:", err); setScriptError("Gagal membuat skrip dari AI. Coba lagi."); } finally { setIsLoadingScript(false); }
    };

    const generateVoiceover = async () => {
        if (!apiKey) { setAudioError("Harap masukkan API Key Anda di menu Pengaturan."); return; }
        if (script.length === 0) { setAudioError("Buat skrip terlebih dahulu sebelum membuat voiceover."); return; }
        setIsLoadingAudio(true); setAudioError(null); setAudioUrl(null);
        const fullVoiceover = script.map(s => s.voiceover).join(' '); const prompt = `Say this in a friendly and clear female voice for a makeup tutorial: ${fullVoiceover}`;
        const payload = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Despina" } } } }, model: "gemini-2.5-flash-preview-tts" };
        try { const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`; const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) throw new Error(`API request failed with status ${response.status}`); const result = await response.json(); const part = result?.candidates?.[0]?.content?.parts?.[0]; const audioData = part?.inlineData?.data; const mimeType = part?.inlineData?.mimeType;
            if (audioData && mimeType && mimeType.startsWith("audio/")) { const sampleRateMatch = mimeType.match(/rate=(\d+)/); const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 24000; const pcmData = base64ToArrayBuffer(audioData); const wavBlob = pcmToWav(pcmData, sampleRate); const url = URL.createObjectURL(wavBlob); setAudioUrl(url); } else { throw new Error("Data audio tidak ditemukan dalam respons AI."); }
        } catch (err) { console.error("Error calling Gemini TTS API:", err); setAudioError("Gagal membuat voiceover. Coba lagi."); } finally { setIsLoadingAudio(false); }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform animate-scale-in max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center"><FileText className="mr-2 text-teal-500"/>AI Scriptwriter & Voiceover</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X /></button>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    <div>
                        <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-1">Topik Video Anda</label>
                        <div className="flex space-x-2">
                            <input type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Contoh: 'Tutorial makeup natural untuk remaja'" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" />
                            <button onClick={generateScript} disabled={isLoadingScript} className="bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:bg-teal-300 flex-shrink-0"> {isLoadingScript ? <LoaderCircle className="animate-spin" /> : 'Buat Skrip'} </button>
                        </div>
                    </div>
                    {scriptError && <p className="text-red-500 text-sm mt-2">{scriptError}</p>}
                    {isLoadingScript && ( <div className="flex flex-col items-center justify-center text-center p-8 space-y-3"> <LoaderCircle className="w-10 h-10 text-teal-500 animate-spin" /> <p className="font-semibold text-gray-600">AI sedang menyusun skrip terbaik...</p> </div> )}
                    {script.length > 0 && (
                        <div className="space-y-4 animate-fade-in mt-4 border-t pt-4">
                            {script.map((segment, index) => ( <div key={index} className="bg-gray-50 p-4 rounded-lg"> <p className="font-bold text-teal-600">SEGMENT {index + 1}</p> <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <p className="font-semibold text-gray-700 text-sm mb-1">Visual:</p> <p className="text-gray-600 text-sm">{segment.visual}</p> </div> <div> <p className="font-semibold text-gray-700 text-sm mb-1">Voiceover:</p> <p className="text-gray-600 text-sm italic">"{segment.voiceover}"</p> </div> </div> </div> ))}
                            <div className="mt-6">
                                <button onClick={generateVoiceover} disabled={isLoadingAudio} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"> {isLoadingAudio ? <><LoaderCircle className="w-5 h-5 animate-spin"/><span>Membuat Suara...</span></> : <><Mic/><span>✨ Buat Voiceover (AI)</span></>} </button>
                                {audioError && <p className="text-red-500 text-sm mt-2 text-center">{audioError}</p>}
                                {isLoadingAudio && <p className="text-sm text-center text-gray-500 mt-2">Proses ini mungkin memakan waktu beberapa saat...</p>}
                                {audioUrl && ( <div className="mt-4 p-4 bg-blue-50 rounded-lg flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0"> <audio controls src={audioUrl} className="w-full sm:w-auto"></audio> <a href={audioUrl} download="glamflow_voiceover.wav" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"> <Download className="w-4 h-4"/> <span>Unduh</span> </a> </div> )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AILookbookModal = ({ onClose, apiKey }) => {
    const [theme, setTheme] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [look, setLook] = useState(null);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => { if (e.target.files[0]) { const file = e.target.files[0]; setImage(file); setImagePreview(URL.createObjectURL(file)); } };
    const fileToGenerativePart = async (file) => { const base64EncodedDataPromise = new Promise((resolve) => { const reader = new FileReader(); reader.onloadend = () => resolve(reader.result.split(',')[1]); reader.readAsDataURL(file); }); return { inlineData: { data: await base64EncodedDataPromise, mimeType: file.type }, }; };

    const generateLook = async () => {
        if (!apiKey) { setError("Harap masukkan API Key Anda di menu Pengaturan."); return; }
        if (!theme) { setError("Mohon isi tema atau deskripsi acara."); return; }
        setIsLoading(true); setError(null); setLook(null);
        const textPart = { text: `You are a professional makeup artist and creative director. Based on the theme "${theme}" ${image ? "and the attached outfit image" : ""}, generate a detailed and creative makeup look concept. The response must be in Indonesian. Format the output as a valid JSON object with the following keys: "lookTitle", "overallVibe", "eyeLook", "baseMakeup", and "lipLook". For each key, provide a descriptive string.` };
        let parts = [textPart]; if (image) { const imagePart = await fileToGenerativePart(image); parts.push(imagePart); }
        const payload = { contents: [{ role: "user", parts }], generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { "lookTitle": { "type": "STRING" }, "overallVibe": { "type": "STRING" }, "eyeLook": { "type": "STRING" }, "baseMakeup": { "type": "STRING" }, "lipLook": { "type": "STRING" } }, required: ["lookTitle", "overallVibe", "eyeLook", "baseMakeup", "lipLook"] } } };
        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`; const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) throw new Error(`API request failed with status ${response.status}`); const result = await response.json(); if (result.candidates && result.candidates.length > 0) { const text = result.candidates[0].content.parts[0].text; setLook(JSON.parse(text)); } else { throw new Error("Respons dari AI tidak valid."); }
        } catch (err) { console.error("Error calling Gemini API for lookbook:", err); setError("Gagal membuat konsep makeup. Coba lagi."); } finally { setIsLoading(false); }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform animate-scale-in max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center"><Brush className="mr-2 text-pink-500"/>AI Lookbook</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X /></button>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    <div> <label htmlFor="theme" className="block text-sm font-semibold text-gray-700 mb-1">Tema / Acara / Warna</label> <input type="text" id="theme" value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="Contoh: 'Bridesmaid soft glam', 'Cyberpunk neon'" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" /> </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Unggah Foto Outfit (Opsional)</label>
                        <div className="mt-2 flex items-center space-x-4">
                            <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"> <ImageIcon className="w-5 h-5 inline-block mr-2" /> <span>Pilih File</span> <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" /> </label>
                            {imagePreview && <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-md object-cover" />}
                        </div>
                    </div>
                    <button onClick={generateLook} disabled={isLoading} className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"> {isLoading ? <><LoaderCircle className="w-5 h-5 animate-spin"/><span>Mencari Inspirasi...</span></> : <><Wand2/><span>✨ Buat Konsep Makeup</span></>} </button>
                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                    {look && (
                        <div className="space-y-4 animate-fade-in mt-4 border-t pt-4">
                            <h3 className="text-xl font-bold text-center text-gray-800">{look.lookTitle}</h3> <p className="text-center text-gray-600 italic">"{look.overallVibe}"</p>
                            <div className="space-y-3">
                                <div className="bg-pink-50 p-3 rounded-lg"> <p className="font-bold text-pink-700">Riasan Mata:</p> <p className="text-sm text-gray-700 mt-1">{look.eyeLook}</p> </div>
                                <div className="bg-orange-50 p-3 rounded-lg"> <p className="font-bold text-orange-700">Base & Wajah:</p> <p className="text-sm text-gray-700 mt-1">{look.baseMakeup}</p> </div>
                                <div className="bg-red-50 p-3 rounded-lg"> <p className="font-bold text-red-700">Riasan Bibir:</p> <p className="text-sm text-gray-700 mt-1">{look.lipLook}</p> </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const [isCaptionGeneratorOpen, setIsCaptionGeneratorOpen] = useState(false);
  const [isScriptGeneratorOpen, setIsScriptGeneratorOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [currentTemplateName, setCurrentTemplateName] = useState('');
  const [userApiKey, setUserApiKey] = useState('');

  const handleUseTemplate = (templateId) => { setIsRecordingModalOpen(true); setSelectedTemplateId(templateId); };
  const handleCloseRecordingModal = () => { setIsRecordingModalOpen(false); setSelectedTemplateId(null); };
  const handleOpenCaptionGenerator = (templateName) => { setIsCaptionGeneratorOpen(true); setCurrentTemplateName(templateName); };
  const handleCloseCaptionGenerator = () => { setIsCaptionGeneratorOpen(false); setCurrentTemplateName(''); };
  const handleOpenScriptGenerator = () => { setIsScriptGeneratorOpen(true); };
  const handleCloseScriptGenerator = () => { setIsScriptGeneratorOpen(false); };
  const handleOpenLookbook = () => { setIsLookbookOpen(true); };
  const handleCloseLookbook = () => { setIsLookbookOpen(false); };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen onUseTemplate={handleUseTemplate} apiKey={userApiKey} />;
      case 'templates': return <TemplatesScreen onUseTemplate={handleUseTemplate} onOpenScriptGenerator={handleOpenScriptGenerator} />;
      case 'tools': return <ToolsScreen onOpenLookbook={handleOpenLookbook} apiKey={userApiKey} />;
      case 'settings': return <SettingsScreen userApiKey={userApiKey} setUserApiKey={setUserApiKey} />;
      default: return <HomeScreen onUseTemplate={handleUseTemplate} apiKey={userApiKey} />;
    }
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      body { font-family: 'Poppins', sans-serif; }
      @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; } }
      .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <Header />
      <main className="container mx-auto px-0">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {isRecordingModalOpen && <RecordingModal templateId={selectedTemplateId} onClose={handleCloseRecordingModal} onOpenAIGenerator={handleOpenCaptionGenerator} />}
      {isCaptionGeneratorOpen && <AICaptionGeneratorModal templateName={currentTemplateName} onClose={handleCloseCaptionGenerator} apiKey={userApiKey} />}
      {isScriptGeneratorOpen && <AIScriptGeneratorModal onClose={handleCloseScriptGenerator} apiKey={userApiKey} />}
      {isLookbookOpen && <AILookbookModal onClose={handleCloseLookbook} apiKey={userApiKey} />}
    </div>
  );
}