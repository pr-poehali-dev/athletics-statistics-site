import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const disciplines = [
  { id: '100m', name: 'Бег 100м', icon: 'Zap' },
  { id: 'marathon', name: 'Марафон', icon: 'Flag' },
  { id: 'high-jump', name: 'Прыжки в высоту', icon: 'TrendingUp' },
  { id: 'javelin', name: 'Метание копья', icon: 'Target' }
];

const athletesData = {
  '100m': [
    { id: 1, name: 'Александр Петров', country: '🇷🇺', result: '9.85', pb: '9.82', position: 1, trend: 'up' },
    { id: 2, name: 'Джон Смит', country: '🇺🇸', result: '9.87', pb: '9.84', position: 2, trend: 'stable' },
    { id: 3, name: 'Кваме Обиаду', country: '🇬🇭', result: '9.92', pb: '9.88', position: 3, trend: 'up' },
    { id: 4, name: 'Лука Мартинес', country: '🇪🇸', result: '9.95', pb: '9.91', position: 4, trend: 'down' },
    { id: 5, name: 'Томас Андерсон', country: '🇸🇪', result: '9.98', pb: '9.95', position: 5, trend: 'stable' }
  ],
  'marathon': [
    { id: 1, name: 'Елена Иванова', country: '🇷🇺', result: '2:18:32', pb: '2:17:45', position: 1, trend: 'up' },
    { id: 2, name: 'Мария Гонсалес', country: '🇲🇽', result: '2:19:15', pb: '2:18:50', position: 2, trend: 'stable' },
    { id: 3, name: 'Кейт Джонсон', country: '🇬🇧', result: '2:20:08', pb: '2:19:30', position: 3, trend: 'up' },
    { id: 4, name: 'Анна Ковальски', country: '🇵🇱', result: '2:21:22', pb: '2:20:15', position: 4, trend: 'down' },
    { id: 5, name: 'Сара Ли', country: '🇰🇷', result: '2:22:45', pb: '2:21:55', position: 5, trend: 'stable' }
  ],
  'high-jump': [
    { id: 1, name: 'Иван Сидоров', country: '🇷🇺', result: '2.38', pb: '2.40', position: 1, trend: 'stable' },
    { id: 2, name: 'Марко Росси', country: '🇮🇹', result: '2.35', pb: '2.37', position: 2, trend: 'up' },
    { id: 3, name: 'Джеймс Уилсон', country: '🇺🇸', result: '2.33', pb: '2.35', position: 3, trend: 'stable' },
    { id: 4, name: 'Пьер Дюпон', country: '🇫🇷', result: '2.30', pb: '2.32', position: 4, trend: 'down' },
    { id: 5, name: 'Кеньи Танака', country: '🇯🇵', result: '2.28', pb: '2.30', position: 5, trend: 'up' }
  ],
  'javelin': [
    { id: 1, name: 'Дмитрий Волков', country: '🇷🇺', result: '89.45', pb: '91.20', position: 1, trend: 'stable' },
    { id: 2, name: 'Ханс Шмидт', country: '🇩🇪', result: '87.30', pb: '88.50', position: 2, trend: 'up' },
    { id: 3, name: 'Майкл Браун', country: '🇺🇸', result: '86.15', pb: '87.80', position: 3, trend: 'down' },
    { id: 4, name: 'Андреас Йоханссон', country: '🇸🇪', result: '85.20', pb: '86.45', position: 4, trend: 'stable' },
    { id: 5, name: 'Лукас Сильва', country: '🇧🇷', result: '84.05', pb: '85.30', position: 5, trend: 'up' }
  ]
};

const records = [
  { discipline: 'Бег 100м', holder: 'Усэйн Болт', country: '🇯🇲', result: '9.58', date: '16.08.2009', location: 'Берлин' },
  { discipline: 'Марафон (Ж)', holder: 'Бригид Косгей', country: '🇰🇪', result: '2:14:04', date: '13.10.2019', location: 'Чикаго' },
  { discipline: 'Прыжок в высоту', holder: 'Хавьер Сотомайор', country: '🇨🇺', result: '2.45м', date: '27.07.1993', location: 'Саламанка' },
  { discipline: 'Метание копья', holder: 'Ян Железны', country: '🇨🇿', result: '98.48м', date: '25.05.1996', location: 'Йена' }
];

const Index = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState('100m');
  const [viewMode, setViewMode] = useState<'leaderboard' | 'records'>('leaderboard');

  const currentAthletes = athletesData[selectedDiscipline as keyof typeof athletesData];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <Icon name="TrendingUp" size={16} className="text-green-500" />;
    if (trend === 'down') return <Icon name="TrendingDown" size={16} className="text-red-500" />;
    return <Icon name="Minus" size={16} className="text-muted-foreground" />;
  };

  const getMedalColor = (position: number) => {
    if (position === 1) return 'bg-yellow-500';
    if (position === 2) return 'bg-gray-400';
    if (position === 3) return 'bg-orange-600';
    return 'bg-muted';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Icon name="Trophy" size={28} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">TrackStats</h1>
                <p className="text-sm text-muted-foreground">Статистика легкой атлетики</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'leaderboard' ? 'default' : 'outline'}
                onClick={() => setViewMode('leaderboard')}
                className="gap-2"
              >
                <Icon name="BarChart3" size={18} />
                Рейтинги
              </Button>
              <Button 
                variant={viewMode === 'records' ? 'default' : 'outline'}
                onClick={() => setViewMode('records')}
                className="gap-2"
              >
                <Icon name="Award" size={18} />
                Рекорды
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {viewMode === 'leaderboard' ? (
          <>
            <div className="mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">Таблицы лидеров</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {disciplines.map((discipline) => (
                  <Button
                    key={discipline.id}
                    variant={selectedDiscipline === discipline.id ? 'default' : 'outline'}
                    className="h-auto py-4 flex flex-col gap-2 hover-scale"
                    onClick={() => setSelectedDiscipline(discipline.id)}
                  >
                    <Icon name={discipline.icon as any} size={24} />
                    <span className="text-sm font-medium">{discipline.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name={disciplines.find(d => d.id === selectedDiscipline)?.icon as any} size={24} className="text-primary" />
                  Топ-5 спортсменов: {disciplines.find(d => d.id === selectedDiscipline)?.name}
                </CardTitle>
                <CardDescription>Актуальные результаты сезона 2024/2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentAthletes.map((athlete, index) => (
                    <div 
                      key={athlete.id} 
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200 hover-scale animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={`w-10 h-10 rounded-full ${getMedalColor(athlete.position)} flex items-center justify-center font-bold text-white shadow-lg`}>
                        {athlete.position}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-lg">{athlete.name}</span>
                          <span className="text-xl">{athlete.country}</span>
                          {getTrendIcon(athlete.trend)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Личный рекорд: {athlete.pb}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{athlete.result}</div>
                        <Badge variant="secondary" className="mt-1">
                          Текущий
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Icon name="Activity" size={20} className="text-primary" />
                    Статистика
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Всего спортсменов</div>
                      <div className="text-2xl font-bold">{currentAthletes.length}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Улучшение формы</div>
                      <div className="text-2xl font-bold text-green-500">
                        {currentAthletes.filter(a => a.trend === 'up').length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Icon name="Flame" size={20} className="text-primary" />
                    Лидер сезона
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold mb-1">{currentAthletes[0]?.name}</div>
                  <div className="text-3xl font-bold text-primary mb-2">{currentAthletes[0]?.result}</div>
                  <Badge className="bg-primary">🏆 1 место</Badge>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Icon name="Target" size={20} className="text-secondary" />
                    Лучший результат
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-1">Личный рекорд</div>
                  <div className="text-3xl font-bold text-secondary mb-2">
                    {currentAthletes.reduce((best, curr) => 
                      parseFloat(curr.pb.replace(':', '.')) < parseFloat(best.pb.replace(':', '.')) ? curr : best
                    ).pb}
                  </div>
                  <div className="text-sm">
                    {currentAthletes.reduce((best, curr) => 
                      parseFloat(curr.pb.replace(':', '.')) < parseFloat(best.pb.replace(':', '.')) ? curr : best
                    ).name}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Award" size={28} className="text-primary" />
              Мировые рекорды
            </h2>
            <div className="grid gap-4">
              {records.map((record, index) => (
                <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{record.discipline}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{record.country}</span>
                          <span className="text-lg font-semibold">{record.holder}</span>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            {record.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="MapPin" size={14} />
                            {record.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-primary mb-1">{record.result}</div>
                        <Badge className="bg-yellow-500 text-white">
                          <Icon name="Crown" size={14} className="mr-1" />
                          Мировой рекорд
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>TrackStats © 2025 - Статистика легкой атлетики</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
