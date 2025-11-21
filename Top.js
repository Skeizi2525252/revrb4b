import { useEffect } from 'react'
import TopMenu from '../components/TopMenu'
import BottomMenu from '../components/BottomMenu'
import { useStore } from '../store/useStore'

export default function Top() {
  const { topPlayers, userRank, fetchTop } = useStore()

  useEffect(() => {
    fetchTop()
    const interval = setInterval(fetchTop, 5000)
    return () => clearInterval(interval)
  }, [fetchTop])

  return (
    <div className="min-h-screen bg-dark-primary pb-20 pt-20">
      <TopMenu />
      
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">🏆 Топ игроков</h2>
        
        <div className="space-y-2 mb-6">
          {topPlayers.map((player, index) => (
            <div 
              key={player.id}
              className="bg-dark-secondary rounded-2xl p-4 flex items-center gap-3"
            >
              <span className={`text-2xl font-bold ${index === 0 ? 'text-yellow-500' : 'text-gray-400'}`}>
                {index + 1}
              </span>
              {player.photo_url && (
                <img 
                  src={player.photo_url} 
                  alt={player.username}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <span className="text-white flex-1">{player.username || 'Игрок'}</span>
              <span className="text-white font-semibold">❄️ {player.balance}</span>
            </div>
          ))}
        </div>

        {userRank && userRank > 5 && (
          <div className="bg-dark-tertiary rounded-2xl p-4">
            <p className="text-gray-400 text-center mb-2">Вы на {userRank} месте</p>
          </div>
        )}
      </div>

      <BottomMenu />
    </div>
  )
}
