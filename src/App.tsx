import React, { useState, useMemo } from 'react';
import { Wind, Thermometer, Box, Circle, Square, Info } from 'lucide-react';

type Shape = 'square' | 'circle' | 'rectangle';

export default function App() {
  const [shape, setShape] = useState<Shape>('square');
  const [perimeter, setPerimeter] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [velocity, setVelocity] = useState<string>('');
  const [tIn, setTIn] = useState<string>('');
  const [tOut, setTOut] = useState<string>('');

  const results = useMemo(() => {
    let area = 0;
    const p = parseFloat(perimeter) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const v = parseFloat(velocity) || 0;
    const tin = parseFloat(tIn) || 0;
    const tout = parseFloat(tOut) || 0;

    if (shape === 'square') {
      area = Math.pow(p / 4, 2);
    } else if (shape === 'circle') {
      area = Math.pow(p, 2) / (4 * Math.PI);
    } else if (shape === 'rectangle') {
      area = w * h;
    }

    const volume = 3600 * v * area; // L = 3600 * v * S
    const deltaT = Math.max(0, tout - tin);
    const powerW = volume * 0.336 * deltaT; // Q = L * 0.336 * (Tout - Tin)
    const powerKW = powerW / 1000;

    return {
      area,
      volume,
      powerKW,
      deltaT
    };
  }, [shape, perimeter, width, height, velocity, tIn, tOut]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-3 space-y-8 bg-white p-6 sm:p-10 rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-stone-100">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-800 mb-2">
              Розрахунок тепловентилятора
            </h1>
            <p className="text-stone-500 text-sm">
              Введіть параметри для обчислення продуктивності та теплової потужності.
            </p>
          </div>

          <div className="space-y-6">
            {/* Shape Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                <Box className="w-4 h-4 text-stone-400" />
                Форма отвору
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setShape('square')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    shape === 'square' 
                      ? 'border-stone-800 bg-stone-800 text-white' 
                      : 'border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <Square className="w-5 h-5 mb-1.5" />
                  <span className="text-xs font-medium">Квадрат</span>
                </button>
                <button
                  onClick={() => setShape('circle')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    shape === 'circle' 
                      ? 'border-stone-800 bg-stone-800 text-white' 
                      : 'border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <Circle className="w-5 h-5 mb-1.5" />
                  <span className="text-xs font-medium">Коло</span>
                </button>
                <button
                  onClick={() => setShape('rectangle')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    shape === 'rectangle' 
                      ? 'border-stone-800 bg-stone-800 text-white' 
                      : 'border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <Box className="w-5 h-5 mb-1.5" />
                  <span className="text-xs font-medium">Прямокутник</span>
                </button>
              </div>
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(shape === 'square' || shape === 'circle') ? (
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">Периметр отвору (м)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={perimeter}
                    onChange={(e) => setPerimeter(e.target.value)}
                    placeholder="Наприклад: 1.2"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-800/20 focus:border-stone-800 transition-all"
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">Ширина (м)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="Наприклад: 0.4"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-800/20 focus:border-stone-800 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">Висота (м)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Наприклад: 0.2"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-800/20 focus:border-stone-800 transition-all"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Air Speed */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5" />
                Швидкість повітря (м/с)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                placeholder="Середня швидкість, напр: 3.5"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-800/20 focus:border-stone-800 transition-all"
              />
            </div>

            {/* Temperatures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5" />
                  Темп. на вході (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={tIn}
                  onChange={(e) => setTIn(e.target.value)}
                  placeholder="Напр: 15"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-800/20 focus:border-stone-800 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                  Темп. на виході (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={tOut}
                  onChange={(e) => setTOut(e.target.value)}
                  placeholder="Напр: 45"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-800/20 focus:border-stone-800 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-stone-900 text-white p-8 rounded-3xl shadow-lg flex-1 flex flex-col justify-center relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-stone-800 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10 space-y-8">
              <div>
                <p className="text-stone-400 text-sm font-medium uppercase tracking-widest mb-2">
                  Теплова потужність
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-light tracking-tight">
                    {results.powerKW > 0 ? results.powerKW.toFixed(2) : '0.00'}
                  </span>
                  <span className="text-stone-400 font-medium">кВт</span>
                </div>
              </div>

              <div className="h-px w-full bg-stone-800"></div>

              <div>
                <p className="text-stone-400 text-sm font-medium uppercase tracking-widest mb-2">
                  Продуктивність (повітря)
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-light tracking-tight">
                    {results.volume > 0 ? Math.round(results.volume).toLocaleString('uk-UA') : '0'}
                  </span>
                  <span className="text-stone-400 font-medium">м³/год</span>
                </div>
              </div>
              
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Площа отвору:</span>
                  <span className="text-stone-300">{results.area > 0 ? results.area.toFixed(4) : '0'} м²</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Різниця температур:</span>
                  <span className="text-stone-300">Δ {results.deltaT > 0 ? results.deltaT.toFixed(1) : '0'} °C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-orange-50/50 border border-orange-100 p-5 rounded-3xl text-sm text-stone-600 flex gap-3">
            <Info className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Для точнішого результату заміряйте швидкість повітря у кількох точках отвору та введіть <strong>середнє значення</strong>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
