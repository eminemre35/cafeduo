import React, { useState } from 'react';
import { RetroButton } from './RetroButton';
import { User, GameRequest, Reward, RedeemedReward } from '../types';
import { 
  Wifi, 
  MapPin, 
  Search, 
  Trophy, 
  Gift, 
  Users,
  Gamepad2,
  ChevronRight,
  X,
  Check,
  ShoppingBag,
  Ticket,
  History,
  Coffee,
  Percent,
  Cookie
} from 'lucide-react';

// Mock data - Başlangıç verileri
const INITIAL_REQUESTS: GameRequest[] = [
  { id: 1, hostName: 'GamerTr_99', gameType: 'Taş Kağıt Makas', points: 150, table: 'MASA04', status: 'waiting' },
  { id: 2, hostName: 'CoffeeLover', gameType: 'Kelime Eşleştirme', points: 320, table: 'MASA12', status: 'waiting' },
];

const AVAILABLE_REWARDS: Reward[] = [
  { id: 1, title: 'Bedava Filtre Kahve', cost: 500, description: 'Günün yorgunluğunu at.', icon: 'coffee' },
  { id: 2, title: '%20 Hesap İndirimi', cost: 850, description: 'Tüm masada geçerli.', icon: 'discount' },
  { id: 3, title: 'Cheesecake İkramı', cost: 400, description: 'Tatlı bir mola ver.', icon: 'dessert' },
  { id: 4, title: 'Oyun Jetonu x5', cost: 100, description: 'Ekstra oyun hakkı.', icon: 'game' },
];

// Geçerli masa kodları (Backend simülasyonu)
const VALID_TABLES = ['MASA01', 'MASA02', 'MASA03', 'MASA04', 'MASA05'];

interface DashboardProps {
  currentUser: User;
  onUpdateUser: (user: User) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentUser, onUpdateUser }) => {
  // State Yönetimi
  const [requests, setRequests] = useState<GameRequest[]>(INITIAL_REQUESTS);
  const [tableCode, setTableCode] = useState('');
  const [isMatched, setIsMatched] = useState(false);
  const [matchError, setMatchError] = useState('');
  const [loadingTable, setLoadingTable] = useState(false);
  
  // Oyun Kurma Modali State'leri
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGameType, setNewGameType] = useState('Taş Kağıt Makas');
  const [newGamePoints, setNewGamePoints] = useState(50);

  // Ödül State'leri
  const [redeemedRewards, setRedeemedRewards] = useState<RedeemedReward[]>([]);
  const [rewardTab, setRewardTab] = useState<'shop' | 'inventory'>('shop');

  // MASA BAĞLAMA FONKSİYONU
  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMatchError('');
    setLoadingTable(true);

    // Backend gecikme simülasyonu
    setTimeout(() => {
      const formattedCode = tableCode.toUpperCase().replace(/\s/g, '');
      if (VALID_TABLES.includes(formattedCode)) {
        setIsMatched(true);
        setTableCode(formattedCode);
      } else {
        setMatchError('Geçersiz masa kodu! (Örn: MASA01)');
      }
      setLoadingTable(false);
    }, 1000);
  };

  // OYUN KURMA FONKSİYONU
  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isMatched) {
      alert("Oyun kurmak için önce bir masaya bağlanmalısın!");
      setIsCreateModalOpen(false);
      return;
    }

    const newRequest: GameRequest = {
      id: Date.now(),
      hostName: currentUser.username,
      gameType: newGameType,
      points: newGamePoints,
      table: tableCode,
      status: 'waiting'
    };

    setRequests([newRequest, ...requests]);
    setIsCreateModalOpen(false);
    alert("Oyun Lobiye Eklendi! Rakip bekleniyor...");
  };

  // OYUNA KATILMA FONKSİYONU
  const handleJoinGame = (id: number) => {
    if (!isMatched) {
      alert("Oyuna katılmak için önce bir masaya bağlanmalısın!");
      return;
    }

    // Listeden oyunu kaldır (Eşleşme sağlandı)
    setRequests(requests.filter(req => req.id !== id));
    alert("Oyun Eşleşmesi Başarılı! Oyun ekranına yönlendiriliyorsunuz...");
  };

  // ÖDÜL ALMA FONKSİYONU
  const handleRedeemReward = (reward: Reward) => {
    if (currentUser.points < reward.cost) return;

    if (window.confirm(`${reward.title} ödülünü ${reward.cost} puan karşılığında almak istiyor musun?`)) {
        // Puan düş
        const updatedUser = { ...currentUser, points: currentUser.points - reward.cost };
        onUpdateUser(updatedUser);

        // Kupon oluştur
        const newRedemption: RedeemedReward = {
            ...reward,
            redeemId: Math.random().toString(36).substr(2, 9).toUpperCase(),
            redeemedAt: new Date(),
            code: `CD-${Math.floor(1000 + Math.random() * 9000)}`
        };

        setRedeemedRewards([newRedemption, ...redeemedRewards]);
        setRewardTab('inventory'); // Otomatik olarak envantere geç
    }
  };

  const getRewardIcon = (type: string) => {
      switch(type) {
          case 'coffee': return <Coffee size={24} />;
          case 'discount': return <Percent size={24} />;
          case 'dessert': return <Cookie size={24} />;
          default: return <Gamepad2 size={24} />;
      }
  };

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-[#0f141a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f141a] to-black relative">
      
      {/* Create Game Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCreateModalOpen(false)}></div>
          <div className="relative bg-[#1a1f2e] border-4 border-blue-500 p-6 w-full max-w-md shadow-2xl animate-bounce-x">
             <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
               <h3 className="font-pixel text-xl text-white">YENİ OYUN KUR</h3>
               <button onClick={() => setIsCreateModalOpen(false)} className="text-red-500 hover:text-red-400"><X /></button>
             </div>
             
             <form onSubmit={handleCreateGame} className="space-y-4">
               <div>
                 <label className="block text-gray-400 font-pixel text-xs mb-2">OYUN TÜRÜ</label>
                 <select 
                    value={newGameType}
                    onChange={(e) => setNewGameType(e.target.value)}
                    className="w-full bg-black border-2 border-gray-600 text-white p-3 font-retro text-xl focus:border-blue-500 outline-none"
                 >
                   <option>Taş Kağıt Makas</option>
                   <option>Kelime Eşleştirme</option>
                 </select>
               </div>
               <div>
                 <label className="block text-gray-400 font-pixel text-xs mb-2">BAHİS PUANI</label>
                 <input 
                    type="number" 
                    min="10"
                    max={currentUser.points}
                    value={newGamePoints}
                    onChange={(e) => setNewGamePoints(Number(e.target.value))}
                    className="w-full bg-black border-2 border-gray-600 text-white p-3 font-retro text-xl focus:border-blue-500 outline-none"
                 />
                 <span className="text-xs text-gray-500 mt-1 block">Mevcut Puanın: {currentUser.points}</span>
               </div>
               <RetroButton type="submit" className="w-full mt-4">LOBİYE GÖNDER</RetroButton>
             </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* Top Status Bar (Retro HUD) */}
        <div className="mb-8 bg-slate-900/80 border border-slate-700 rounded-lg p-4 flex flex-wrap justify-between items-center gap-4 shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md sticky top-20 z-40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center border-2 border-white shadow-lg">
               <span className="font-pixel text-xl">{currentUser.username.substring(0,2).toUpperCase()}</span>
            </div>
            <div>
              <h2 className="font-pixel text-lg md:text-xl text-white">HOŞGELDİN, {currentUser.username}</h2>
              <div className="flex items-center gap-2 text-xs font-mono text-green-400">
                <span className="animate-pulse">●</span> SYSTEM ONLINE
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 bg-black/40 px-6 py-2 rounded-full border border-slate-700">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">Toplam Puan</span>
              <span className="font-retro text-3xl text-yellow-400 leading-none shadow-yellow-500/20 drop-shadow-sm">{currentUser.points}</span>
            </div>
            <Trophy className="text-yellow-500" size={28} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT PANEL: Step 1 - Table & Status */}
          <div className="space-y-6">
            {/* Table Match Card */}
            <div className={`bg-[#1a1f2e] border-4 ${isMatched ? 'border-green-600' : 'border-gray-600'} relative overflow-hidden transition-colors duration-500`}>
              <div className="bg-gray-800 p-2 flex items-center justify-between border-b-2 border-gray-600">
                <span className="font-pixel text-xs text-gray-400">STEP 01 // CONNECTION</span>
                <div className="flex gap-1">
                   <div className={`w-2 h-2 rounded-full ${isMatched ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                </div>
              </div>
              
              <div className="p-6 relative z-10">
                <h3 className="font-pixel text-xl text-white mb-1">MASA EŞLEŞMESİ</h3>
                <p className="text-gray-400 text-sm mb-6 font-mono">Oturduğunuz masanın kodunu giriniz.</p>
                
                {!isMatched ? (
                  <form onSubmit={handleTableSubmit} className="space-y-4">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                      <input 
                        type="text" 
                        value={tableCode}
                        onChange={(e) => setTableCode(e.target.value)}
                        placeholder="Örn: MASA01" 
                        className="w-full bg-black border-2 border-gray-600 focus:border-blue-500 text-center font-retro text-3xl py-4 text-white outline-none tracking-widest transition-all shadow-inner uppercase"
                        maxLength={6}
                      />
                    </div>
                    {matchError && <p className="text-red-500 text-xs font-pixel">{matchError}</p>}
                    <RetroButton type="submit" className="w-full" variant="primary">
                      {loadingTable ? 'BAĞLANILIYOR...' : 'BAĞLAN'}
                    </RetroButton>
                  </form>
                ) : (
                  <div className="bg-green-500/10 border border-green-500/50 p-4 rounded-lg text-center animate-pulse-slow">
                    <div className="flex justify-center mb-2"><Check size={40} className="text-green-500" /></div>
                    <div className="text-green-400 font-pixel text-3xl mb-2">{tableCode}</div>
                    <span className="text-xs text-green-300 tracking-widest uppercase">BAĞLANTI BAŞARILI</span>
                    <button 
                      onClick={() => {setIsMatched(false); setTableCode('')}} 
                      className="mt-4 text-xs text-gray-400 hover:text-white underline block w-full"
                    >
                      Bağlantıyı Kes
                    </button>
                  </div>
                )}
              </div>
              
              {/* Decor */}
              <div className="absolute bottom-0 right-0 p-4 opacity-10 pointer-events-none">
                 <Wifi size={120} />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-[#1a1f2e] p-4 border-2 border-gray-700 rounded-lg">
                <h4 className="font-pixel text-sm text-gray-400 mb-3">İSTATİSTİKLER</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 p-3 rounded border border-gray-700">
                        <span className="block text-xs text-gray-500 mb-1">Oyun Sayısı</span>
                        <span className="font-retro text-2xl text-white">0</span>
                    </div>
                    <div className="bg-black/40 p-3 rounded border border-gray-700">
                        <span className="block text-xs text-gray-500 mb-1">Galibiyet</span>
                        <span className="font-retro text-2xl text-green-400">0</span>
                    </div>
                </div>
            </div>
          </div>

          {/* MIDDLE PANEL: Step 2 - Game Lobby */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="group relative bg-blue-600 hover:bg-blue-500 transition-all duration-200 h-32 rounded-xl border-b-8 border-blue-800 active:border-b-0 active:translate-y-2 overflow-hidden flex flex-col items-center justify-center gap-2"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pixel-weave.png')] opacity-20"></div>
                    <Gamepad2 size={40} className="text-white group-hover:scale-110 transition-transform" />
                    <span className="font-pixel text-xl text-white z-10">OYUN KUR</span>
                </button>
                
                <button className="group relative bg-purple-600 hover:bg-purple-500 transition-all duration-200 h-32 rounded-xl border-b-8 border-purple-800 active:border-b-0 active:translate-y-2 overflow-hidden flex flex-col items-center justify-center gap-2">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pixel-weave.png')] opacity-20"></div>
                    <Search size={40} className="text-white group-hover:scale-110 transition-transform" />
                    <span className="font-pixel text-xl text-white z-10">RAKİP ARA</span>
                </button>
            </div>

            {/* Active Requests List */}
            <div className="flex-1 bg-[#151921] border-2 border-gray-700 rounded-xl overflow-hidden flex flex-col min-h-[400px]">
                <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="font-pixel text-white flex items-center gap-2">
                        <Users size={18} className="text-green-400" />
                        AKTİF İSTEKLER (LOBİ)
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs text-gray-400 font-mono">LIVE</span>
                    </div>
                </div>

                <div className="p-4 space-y-3 overflow-y-auto max-h-[400px] custom-scrollbar">
                    {requests.length === 0 ? (
                      <div className="text-center py-10 text-gray-500 font-pixel">
                        ŞU AN AKTİF OYUN YOK...
                      </div>
                    ) : (
                      requests.map((req) => (
                        <div key={req.id} className="bg-[#1f2937] hover:bg-[#2d3748] p-4 rounded-lg border border-gray-700 transition-colors group flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center font-pixel text-lg">
                                    {req.hostName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="text-white font-bold flex items-center gap-2">
                                        {req.hostName}
                                        <span className="text-[10px] bg-blue-900 text-blue-200 px-1.5 rounded border border-blue-700">{req.table}</span>
                                    </div>
                                    <div className="text-sm text-gray-400">{req.gameType} • <span className="text-yellow-400">{req.points} Puan</span></div>
                                </div>
                            </div>
                            
                            {req.hostName !== currentUser.username && (
                              <button 
                                onClick={() => handleJoinGame(req.id)}
                                className="w-full md:w-auto px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-pixel text-sm rounded border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all"
                              >
                                  KABUL ET
                              </button>
                            )}
                            {req.hostName === currentUser.username && (
                               <span className="text-xs text-gray-500 font-pixel px-4">SENİN OYUNUN</span>
                            )}
                        </div>
                      ))
                    )}
                </div>
            </div>
          </div>

          {/* RIGHT PANEL: Step 3 - Rewards */}
          <div className="lg:col-span-3 mt-8">
             <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                 <div className="flex items-center gap-2">
                    <Gift size={32} className="text-yellow-400" />
                    <div>
                       <h3 className="font-pixel text-2xl text-white">ÖDÜL MERKEZİ</h3>
                       <p className="text-gray-400 text-sm">Puanlarını harca, kafede keyfini çıkar.</p>
                    </div>
                 </div>

                 {/* Tabs */}
                 <div className="flex bg-black p-1 rounded-lg border border-gray-700">
                    <button 
                      onClick={() => setRewardTab('shop')}
                      className={`px-6 py-2 rounded font-pixel text-sm transition-all ${rewardTab === 'shop' ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                      MAĞAZA
                    </button>
                    <button 
                      onClick={() => setRewardTab('inventory')}
                      className={`px-6 py-2 rounded font-pixel text-sm transition-all ${rewardTab === 'inventory' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      KUPONLARIM ({redeemedRewards.length})
                    </button>
                 </div>
             </div>

             {rewardTab === 'shop' ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {AVAILABLE_REWARDS.map((reward) => {
                     const canAfford = currentUser.points >= reward.cost;
                     return (
                       <div key={reward.id} className={`relative group bg-[#1a1f2e] border-2 ${canAfford ? 'border-yellow-500/30 hover:border-yellow-500' : 'border-gray-700 opacity-60'} rounded-xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 h-full`}>
                          
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
                          
                          <div>
                              <div className="flex justify-between items-start mb-4">
                                   <div className={`p-3 rounded-lg ${canAfford ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700/50 text-gray-500'}`}>
                                       {getRewardIcon(reward.icon)}
                                   </div>
                                   <div className="text-right">
                                       <span className={`block font-retro text-3xl ${canAfford ? 'text-white' : 'text-red-400'}`}>{reward.cost}</span>
                                   </div>
                              </div>
                              <h4 className="text-lg font-bold text-white mb-1 font-pixel leading-tight min-h-[3rem]">{reward.title}</h4>
                              <p className="text-xs text-gray-400 mb-6">{reward.description}</p>
                          </div>

                          <button 
                              disabled={!canAfford}
                              onClick={() => handleRedeemReward(reward)}
                              className={`w-full py-3 font-pixel text-sm rounded flex items-center justify-center gap-2 transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
                                  canAfford 
                                  ? 'bg-yellow-500 hover:bg-yellow-400 text-black border-yellow-700' 
                                  : 'bg-gray-800 text-gray-500 border-gray-900 cursor-not-allowed'
                              }`}
                          >
                              {canAfford ? (
                                  <>SATIN AL <ShoppingBag size={16} /></>
                              ) : (
                                  'YETERSİZ PUAN'
                              )}
                          </button>
                       </div>
                     );
                 })}
               </div>
             ) : (
                // INVENTORY TAB
                <div className="bg-[#151921] border-2 border-dashed border-gray-700 rounded-xl p-6 min-h-[300px]">
                   {redeemedRewards.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-gray-500 py-12">
                          <Ticket size={64} className="mb-4 opacity-20" />
                          <p className="font-pixel text-lg">HENÜZ KUPONUN YOK</p>
                          <p className="text-sm mt-2">Mağazadan puanlarınla ödül alabilirsin.</p>
                          <button onClick={() => setRewardTab('shop')} className="mt-6 text-blue-400 hover:underline font-pixel text-sm">MAĞAZAYA GİT</button>
                      </div>
                   ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {redeemedRewards.map((item) => (
                              <div key={item.redeemId} className="bg-[#fff8dc] text-black p-4 rounded relative overflow-hidden font-mono shadow-lg transform hover:scale-105 transition-transform">
                                  {/* Ticket Jagged Edges */}
                                  <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#151921] rounded-full"></div>
                                  <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#151921] rounded-full"></div>
                                  
                                  <div className="border-2 border-black border-dashed p-3 h-full flex flex-col justify-between">
                                      <div className="text-center border-b-2 border-black pb-2 mb-2">
                                          <h4 className="font-bold text-lg uppercase leading-tight">{item.title}</h4>
                                          <span className="text-xs">CAFE DUO KUPONU</span>
                                      </div>
                                      
                                      <div className="flex justify-between items-center mb-2">
                                          <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-[8px] p-1 text-center leading-none">
                                              QR KOD ALANI
                                          </div>
                                          <div className="text-right">
                                              <span className="block text-2xl font-bold tracking-widest">{item.code}</span>
                                              <span className="text-[10px] block">{item.redeemedAt.toLocaleDateString()}</span>
                                          </div>
                                      </div>
                                      
                                      <div className="bg-black text-white text-center py-1 text-xs font-bold mt-auto uppercase">
                                          KASADA GÖSTERİN
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                   )}
                </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};