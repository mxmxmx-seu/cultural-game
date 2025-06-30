import { useState, useRef } from 'react'
import Button from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./components/ui/card"

// 定义部署路径前缀
const DEPLOY_PATH = process.env.NODE_ENV === 'production' ? '' : '';
// 所有图片路径都添加部署前缀
const images = {
  yaoTomb: `${DEPLOY_PATH}/yaoling.jpg`,
  
  // 剪纸工坊专用的牡丹纹样
  paperCutPatterns: [
    `${DEPLOY_PATH}/papercut-peony1.jpg`,
    `${DEPLOY_PATH}/papercut-peony2.jpg`,
  ],
  
  // 文创设计专用的牡丹图案
  designPatterns: [
    `${DEPLOY_PATH}/design-peony1.jpg`,
    `${DEPLOY_PATH}/design-peony2.jpg`,
    `${DEPLOY_PATH}/design-peony3.jpg`,
  ],

  products: {
    bookmark: `${DEPLOY_PATH}/bookmark-template.jpg`,
    postcard: `${DEPLOY_PATH}/postcard-template.jpg`,
  },

  designProductsFinished: {
    bookmark: [
      `${DEPLOY_PATH}/design-finished/bookmark-pattern1.jpg`,
      `${DEPLOY_PATH}/design-finished/bookmark-pattern2.jpg`,
      `${DEPLOY_PATH}/design-finished/bookmark-pattern3.jpg`
    ],
    postcard: [
      `${DEPLOY_PATH}/design-finished/postcard-pattern1.jpg`,
      `${DEPLOY_PATH}/design-finished/postcard-pattern2.jpg`,
      `${DEPLOY_PATH}/design-finished/postcard-pattern3.jpg`
    ]
  }
}

function HomeView({ gameProgress, setActiveModule }: {
  gameProgress: any,
  setActiveModule: (module: 'home' | 'yao' | 'papercut' | 'peony') => void
}) {
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl text-center">华夏文化探索之旅</CardTitle>
        <CardDescription className="text-center">探索三大文化体验模块</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button 
          onClick={() => setActiveModule('yao')} 
          className="h-24 text-lg"
          variant={gameProgress.yao.completed ? 'default' : 'outline'}
        >
          <div className="flex items-center">
            <img src={images.yaoTomb} alt="尧陵遗址" className="w-16 h-16 rounded mr-3 object-cover" />
            尧陵遗址探秘 {gameProgress.yao.completed && '✓'}
          </div>
        </Button>
        <Button 
          onClick={() => setActiveModule('papercut')} 
          className="h-24 text-lg"
          variant={gameProgress.papercut.completed ? 'default' : 'outline'}
        >
          <div className="flex items-center">
            <img src={images.paperCutPatterns[0]} alt="牡丹剪纸纹样" className="w-16 h-16 rounded mr-3 object-cover" />
            剪纸工坊体验 {gameProgress.papercut.completed && '✓'}
          </div>
        </Button>
        <Button 
          onClick={() => setActiveModule('peony')} 
          className="h-24 text-lg"
          variant={gameProgress.peony.completed ? 'default' : 'outline'}
        >
          <div className="flex items-center">
            <img src={images.products.bookmark} alt="牡丹书签" className="w-16 h-16 rounded mr-3 object-cover" />
            牡丹文创设计 {gameProgress.peony.completed && '✓'}
          </div>
        </Button>
      </CardContent>
    </Card>
  )
}

function YaoMausoleumView({ returnHome, gameProgress, setGameProgress, nextModule }: {
  returnHome: () => void,
  gameProgress: any,
  setGameProgress: any,
  nextModule: () => void
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    if (answer === 'A') {
      setGameProgress((prev: any) => ({
        ...prev,
        yao: { ...prev.yao, completed: true, unlockedCard: true }
      }))
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-xl">尧陵遗址探秘</CardTitle>
        <CardDescription>点击石碑回答问题</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
          <img 
            src={images.yaoTomb} 
            alt="尧陵遗址石碑" 
            className="w-full h-48 object-cover"
          />
        </div>
        
        <p className="mb-4 font-medium">问题：帝尧陵为何是中华文明重要实证？</p>
        
        <div className="grid gap-2">
          {['A. 上古文明遗迹', 'B. 唐代建筑标本', 'C. 近代革命遗址'].map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswer(option[0])}
              variant={
                selectedAnswer === option[0]
                  ? option[0] === 'A' ? 'default' : 'destructive'
                  : 'outline'
              }
              disabled={!!selectedAnswer}
              className="justify-start"
            >
              {option}
            </Button>
          ))}
        </div>

        {selectedAnswer && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            {selectedAnswer === 'A' ? (
              <>
                <p className="font-bold text-green-600">✓ 正确答案！</p>
                <p className="mt-1">解锁「文明根脉」卡片</p>
                <div className="mt-2 p-2 bg-white rounded border border-blue-200">
                  <p className="font-medium">文明根脉</p>
                  <p className="text-sm">帝尧陵是研究中华文明演进的重要实证，展现了上古文明的历史遗迹。</p>
                </div>
              </>
            ) : (
              <p className="text-red-600">✗ 错误答案，请再思考一下</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={returnHome}>返回</Button>
        {gameProgress.yao.completed && <Button onClick={nextModule}>继续</Button>}
      </CardFooter>
    </Card>
  )
}

function PaperCutView({ returnHome, gameProgress, setGameProgress, nextModule }: {
  returnHome: () => void,
  gameProgress: any,
  setGameProgress: any,
  nextModule: () => void
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [cutProgress, setCutProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragAreaRef = useRef<HTMLDivElement>(null)
  
  // 新增：记录触摸开始时的位置
  const [touchStartX, setTouchStartX] = useState(0)

  const steps = [
    "选择牡丹纹样",
    "沿虚线剪裁图案",
    "完成剪纸作品"
  ]

  // 处理鼠标移动事件（桌面端）
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !dragAreaRef.current) return
    
    const rect = dragAreaRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const progress = Math.round((x / rect.width) * 100)
    setCutProgress(progress)
    
    if (progress >= 95 && currentStep === 1) {
      completeCutting()
    }
  }

  // 处理触摸移动事件（移动端）
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !dragAreaRef.current) return
    e.preventDefault(); // 防止页面滚动
    
    const rect = dragAreaRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width))
    const progress = Math.round((x / rect.width) * 100)
    setCutProgress(progress)
    
    if (progress >= 95 && currentStep === 1) {
      completeCutting()
    }
  }

  // 完成剪纸逻辑
  const completeCutting = () => {
    setCurrentStep(2)
    setIsDragging(false)
    setGameProgress((prev: any) => ({
      ...prev,
      papercut: { 
        completed: true, 
        heritageValue: prev.papercut.heritageValue + 1 
      }
    }))
  }

  const resetCutting = () => {
    setCutProgress(0)
    setIsDragging(false)
    setTouchStartX(0) // 重置触摸起始位置
  }

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
      setCutProgress(0)
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-xl">剪纸工坊体验</CardTitle>
        <CardDescription>体验曹州剪纸非遗技艺</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${
                index < currentStep ? 'bg-green-100 text-green-800' : 
                index === currentStep ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'
              }`}>
                {index < currentStep ? '✓' : index + 1}
              </div>
              <p className={`text-xs ${index === currentStep ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                {step}
              </p>
            </div>
          ))}
        </div>

        {currentStep === 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {images.paperCutPatterns.map((pattern, index) => (
              <div 
                key={index}
                className="border rounded-lg p-3 cursor-pointer hover:border-blue-300 transition-colors"
                onClick={nextStep}
              >
                <img 
                  src={pattern}
                  alt={`牡丹图案${index + 1}`}
                  className="w-full h-20 object-contain mb-2"
                />
                <p className="text-center text-sm">牡丹纹样 {index + 1}</p>
              </div>
            ))}
          </div>
        )}

        {currentStep === 1 && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">请沿虚线拖动剪刀完成剪纸：</p>
            
            <div 
              ref={dragAreaRef}
              // 鼠标事件 - 桌面端
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={resetCutting}
              onMouseLeave={resetCutting}
              onMouseMove={handleMouseMove}
              // 触摸事件 - 移动端
              onTouchStart={(e) => {
                setIsDragging(true);
                setTouchStartX(e.touches[0].clientX);
              }}
              onTouchEnd={resetCutting}
              onTouchCancel={resetCutting}
              onTouchMove={handleTouchMove}
              className="relative h-32 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 bg-white border-2 border-dashed border-red-300 relative">
                  <div 
                    className="absolute top-1/2 left-0 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                    style={{ left: `${cutProgress}%` }}
                  >
                    <div className="text-3xl">✂️</div>
                  </div>
                  
                  <div 
                    className="absolute top-0 left-0 h-full bg-red-50 opacity-30"
                    style={{ width: `${cutProgress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="absolute bottom-2 left-0 right-0 text-center text-xs">
                {cutProgress < 30 && "请按住剪刀并向右拖动"}
                {cutProgress >= 30 && cutProgress < 70 && "剪纸进行中..."}
                {cutProgress >= 70 && cutProgress < 95 && "快完成了！"}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <p className="font-bold text-green-700">剪纸完成！</p>
              <p className="text-sm text-green-600 mb-3">非遗传承值 +1</p>
              
              <div className="bg-white p-3 rounded border border-green-200 inline-block">
                <img 
                  src={images.paperCutPatterns[0]} 
                  alt="完成的牡丹剪纸"
                  className="w-40 h-32 object-contain mx-auto"
                />
              </div>
              
              <p className="mt-3 text-sm text-gray-600">
                您已成功完成曹州剪纸技艺体验！
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          {currentStep > 0 && currentStep < 2 ? (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
              上一步
            </Button>
          ) : (
            <Button variant="outline" onClick={returnHome}>
              返回
            </Button>
          )}
          
          {currentStep < 1 ? (
            <Button onClick={nextStep}>
              下一步
            </Button>
          ) : currentStep === 1 ? (
            <Button 
              onClick={nextStep} 
              disabled={!gameProgress.papercut.completed}
            >
              完成
            </Button>
          ) : (
            <Button onClick={nextModule}>
              继续探索
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function PeonyDesignView({ returnHome, gameProgress, setGameProgress }: {
  returnHome: () => void,
  gameProgress: any,
  setGameProgress: any
}) {
  const [selectedProduct, setSelectedProduct] = useState<null | 'bookmark' | 'postcard'>(null)
  const [selectedPattern, setSelectedPattern] = useState<null | number>(null)
  const [isDownloading, setIsDownloading] = useState(false); // 下载状态
  const canvasRef = useRef<HTMLCanvasElement>(null); // Canvas引用

  const patterns = [
    { name: '富贵牡丹', meaning: '象征繁荣昌盛，家庭美满' },
    { name: '花开富贵', meaning: '代表幸福生活，吉祥如意' },
    { name: '国色天香', meaning: '体现中华文化精髓，高雅尊贵' }
  ]

  const handleComplete = () => {
    if (selectedProduct && selectedPattern !== null) {
      setGameProgress((prev: any) => ({
        ...prev,
        peony: { 
          completed: true,
          productType: selectedProduct,
          selectedPattern
        }
      }))
    }
  }

  // 下载成品图片
  const handleDownload = () => {
    if (!gameProgress.peony.completed || !selectedProduct || selectedPattern === null) {
      alert('请先完成设计！');
      return;
    }
    
    setIsDownloading(true);
    const imageUrl = images.designProductsFinished[selectedProduct][selectedPattern];
    
    // 创建图片元素
    const img = new Image();
    img.crossOrigin = 'anonymous'; // 处理跨域
    
    img.onload = () => {
      // 初始化Canvas
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      // 绘制图片到Canvas
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      
      // 添加水印（可选）
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.font = '16px Arial';
      ctx.fillText('华夏文化探索之旅', 10, 30);
      
      // 转换为Blob并下载
      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `牡丹文创_${patterns[selectedPattern].name}.png`;
          document.body.appendChild(a);
          a.click();
          
          // 清理资源
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setIsDownloading(false);
          }, 100);
        }
      }, 'image/png');
    };
    
    img.onerror = () => {
      alert('图片加载失败，无法下载');
      setIsDownloading(false);
    };
    
    img.src = imageUrl;
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-xl">牡丹文创设计</CardTitle>
        <CardDescription>设计您的牡丹文化创意产品</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="font-medium mb-2">1. 选择产品类型：</p>
          <div className="grid grid-cols-2 gap-3">
            <div 
              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                selectedProduct === 'bookmark' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedProduct('bookmark')}
            >
              <img 
                src={images.products.bookmark}
                alt="书签模板"
                className="w-full h-32 object-contain mb-2"
              />
              <p className="text-center text-sm">牡丹书签</p>
            </div>
            <div 
              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                selectedProduct === 'postcard' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedProduct('postcard')}
            >
              <img 
                src={images.products.postcard}
                alt="明信片模板"
                className="w-full h-32 object-contain mb-2"
              />
              <p className="text-center text-sm">牡丹明信片</p>
            </div>
          </div>
        </div>

        {selectedProduct && (
          <div className="mb-6">
            <p className="font-medium mb-2">2. 选择牡丹图案：</p>
            <div className="grid grid-cols-3 gap-2">
              {patterns.map((pattern, index) => (
                <div 
                  key={index}
                  className={`border rounded-lg p-2 cursor-pointer transition-all ${
                    selectedPattern === index 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedPattern(index)}
                >
                  <img 
                    src={images.designPatterns[index % images.designPatterns.length]}
                    alt={pattern.name}
                    className="w-full h-16 object-contain mb-1"
                  />
                  <p className="text-center text-xs truncate">{pattern.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {gameProgress.peony.completed && selectedPattern !== null && (
          <div className="mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-bold text-yellow-700 text-center mb-3">文创作品完成！</p>
              
              <div className="bg-white p-3 rounded border border-yellow-200">
                {/* 根据产品类型和图案索引获取成品图 */}
                <img 
                  src={images.designProductsFinished[selectedProduct][selectedPattern]} 
                  alt="文创作品成品"
                  className="w-full h-32 object-contain mb-2"
                />
                <p className="text-sm text-center text-gray-600">
                  <span className="font-medium">文化寓意：</span>
                  {patterns[selectedPattern].meaning}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={returnHome}>
            返回
          </Button>
          
          {!gameProgress.peony.completed ? (
            <Button 
              onClick={handleComplete}
              disabled={!selectedProduct || selectedPattern === null}
            >
              完成设计
            </Button>
          ) : (
            <Button 
              variant="secondary" 
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? '下载中...' : '下载作品'}
            </Button>
          )}
        </div>
      </CardContent>
      {/* 隐藏的Canvas元素用于图片处理 */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Card>
  )
}

export default function CulturalGame() {
  const [activeModule, setActiveModule] = useState<'home' | 'yao' | 'papercut' | 'peony'>('home')
  const [gameProgress, setGameProgress] = useState({
    yao: { completed: false, unlockedCard: false },
    papercut: { completed: false, heritageValue: 0 },
    peony: { completed: false, productType: null, selectedPattern: null }
  })

  // 重置游戏状态
  const resetGame = () => {
    setGameProgress({
      yao: { completed: false, unlockedCard: false },
      papercut: { completed: false, heritageValue: 0 },
      peony: { completed: false, productType: null, selectedPattern: null }
    });
  };

  const returnHome = () => setActiveModule('home')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-4">
      {activeModule === 'home' && (
        <HomeView 
          gameProgress={gameProgress}
          setActiveModule={(module) => {
            resetGame(); // 切换模块前重置状态
            setActiveModule(module);
          }}
        />
      )}

      {activeModule === 'yao' && (
        <YaoMausoleumView 
          returnHome={returnHome}
          gameProgress={gameProgress}
          setGameProgress={setGameProgress}
          nextModule={() => setActiveModule('papercut')}
        />
      )}

      {activeModule === 'papercut' && (
        <PaperCutView 
          returnHome={returnHome}
          gameProgress={gameProgress}
          setGameProgress={setGameProgress}
          nextModule={() => setActiveModule('peony')}
        />
      )}

      {activeModule === 'peony' && (
        <PeonyDesignView 
          returnHome={returnHome}
          gameProgress={gameProgress}
          setGameProgress={setGameProgress}
        />
      )}
    </div>
  )
}
