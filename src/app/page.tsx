"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

// 语言类型定义
type Language = "zh" | "en";

// 多语言文本
const translations = {
  zh: {
    title: "电池材料计算器",
    cathode: "正极计算",
    anode: "负极计算",
    cathodeCalculation: "正极材料计算",
    anodeCalculation: "负极材料计算",
    totalMass: "极片总质量 (mg)",
    aluminumFoilMass: "铝箔质量 (mg)",
    copperFoilMass: "铜箔质量 (mg)",
    activeMaterialRatio: "活性物质比例",
    conductiveAgentRatio: "导电剂比例",
    binderRatio: "粘结剂比例",
    default: "默认",
    reset: "重置",
    currentDefaults: "当前默认值设置：",
    tip: "提示：留空输入框将使用上述默认值进行计算",
    results: "计算结果",
    coatingMass: "涂敷质量",
    activeMaterialMass: "活性物质质量",
    conductiveAgentMass: "导电剂质量",
    binderMass: "粘结剂质量",
    calculationNotes: "计算说明：",
    note1: "• 涂敷质量 = 极片总质量 - 铝箔质量",
    note2: "• 总比例 = 活性物质比例 + 导电剂比例 + 粘结剂比例",
    note3: "• 活性物质质量 = 涂敷质量 × (活性物质比例 ÷ 总比例)",
    note4: "• 导电剂质量 = 涂敷质量 × (导电剂比例 ÷ 总比例)",
    note5: "• 粘结剂质量 = 涂敷质量 × (粘结剂比例 ÷ 总比例)",
    note1Anode: "• 涂敷质量 = 极片总质量 - 铜箔质量",
    placeholder: "请输入极片总质量"
  },
  en: {
    title: "Battery Material Calculator",
    cathode: "Cathode",
    anode: "Anode",
    cathodeCalculation: "Cathode Material Calculation",
    anodeCalculation: "Anode Material Calculation",
    totalMass: "Total Electrode Mass (mg)",
    aluminumFoilMass: "Aluminum Foil Mass (mg)",
    copperFoilMass: "Copper Foil Mass (mg)",
    activeMaterialRatio: "Active Material Ratio",
    conductiveAgentRatio: "Conductive Agent Ratio",
    binderRatio: "Binder Ratio",
    default: "Default",
    reset: "Reset",
    currentDefaults: "Current Default Values:",
    tip: "Tip: Leave input fields empty to use default values for calculation",
    results: "Calculation Results",
    coatingMass: "Coating Mass",
    activeMaterialMass: "Active Material Mass",
    conductiveAgentMass: "Conductive Agent Mass",
    binderMass: "Binder Mass",
    calculationNotes: "Calculation Notes:",
    note1: "• Coating Mass = Total Electrode Mass - Aluminum Foil Mass",
    note2: "• Total Ratio = Active Material Ratio + Conductive Agent Ratio + Binder Ratio",
    note3: "• Active Material Mass = Coating Mass × (Active Material Ratio ÷ Total Ratio)",
    note4: "• Conductive Agent Mass = Coating Mass × (Conductive Agent Ratio ÷ Total Ratio)",
    note5: "• Binder Mass = Coating Mass × (Binder Ratio ÷ Total Ratio)",
    note1Anode: "• Coating Mass = Total Electrode Mass - Copper Foil Mass",
    placeholder: "Enter total electrode mass"
  }
};

// 语言切换组件
const LanguageSwitcher = ({ currentLang, onLanguageChange }: { 
  currentLang: Language; 
  onLanguageChange: (lang: Language) => void; 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        title="Switch Language"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm font-medium text-gray-700">
          {currentLang === "zh" ? "中文" : "EN"}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <button
            onClick={() => {
              onLanguageChange("zh");
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
              currentLang === "zh" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"
            }`}
          >
            中文
          </button>
          <button
            onClick={() => {
              onLanguageChange("en");
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
              currentLang === "en" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"
            }`}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"cathode" | "anode">("cathode");
  const [language, setLanguage] = useState<Language>("zh");
  const t = translations[language];
  
  const [cathodeData, setCathodeData] = useState({
    totalMass: "",
    aluminumFoilMass: "",
    activeMaterialRatio: "",
    conductiveAgentRatio: "",
    binderRatio: ""
  });

  const [anodeData, setAnodeData] = useState({
    totalMass: "",
    copperFoilMass: "",
    activeMaterialRatio: "",
    conductiveAgentRatio: "",
    binderRatio: ""
  });

  const [results, setResults] = useState<{
    coatingMass: number | null;
    activeMaterialMass: number | null;
    conductiveAgentMass: number | null;
    binderMass: number | null;
  }>({
    coatingMass: null,
    activeMaterialMass: null,
    conductiveAgentMass: null,
    binderMass: null
  });

  // 默认值
  const CATHODE_DEFAULT_VALUES = {
    aluminumFoilMass: 3.24,
    activeMaterialRatio: 8,
    conductiveAgentRatio: 1,
    binderRatio: 1
  };

  const ANODE_DEFAULT_VALUES = {
    copperFoilMass: 8.34,
    activeMaterialRatio: 8,
    conductiveAgentRatio: 1,
    binderRatio: 1
  };

  const calculateCathodeMaterials = () => {
    const totalMass = parseFloat(cathodeData.totalMass);
    
    if (isNaN(totalMass)) {
      setResults({
        coatingMass: null,
        activeMaterialMass: null,
        conductiveAgentMass: null,
        binderMass: null
      });
      return;
    }

    // 使用输入值或默认值
    const aluminumFoilMass = cathodeData.aluminumFoilMass === "" 
      ? CATHODE_DEFAULT_VALUES.aluminumFoilMass 
      : parseFloat(cathodeData.aluminumFoilMass);
    
    const activeMaterialRatio = cathodeData.activeMaterialRatio === "" 
      ? CATHODE_DEFAULT_VALUES.activeMaterialRatio 
      : parseFloat(cathodeData.activeMaterialRatio);
    
    const conductiveAgentRatio = cathodeData.conductiveAgentRatio === "" 
      ? CATHODE_DEFAULT_VALUES.conductiveAgentRatio 
      : parseFloat(cathodeData.conductiveAgentRatio);
    
    const binderRatio = cathodeData.binderRatio === "" 
      ? CATHODE_DEFAULT_VALUES.binderRatio 
      : parseFloat(cathodeData.binderRatio);

    // 验证数值 - 只有当用户输入了值但不是有效数字时才验证失败
    const aluminumFoilMassInput = cathodeData.aluminumFoilMass === "" ? null : parseFloat(cathodeData.aluminumFoilMass);
    const activeMaterialRatioInput = cathodeData.activeMaterialRatio === "" ? null : parseFloat(cathodeData.activeMaterialRatio);
    const conductiveAgentRatioInput = cathodeData.conductiveAgentRatio === "" ? null : parseFloat(cathodeData.conductiveAgentRatio);
    const binderRatioInput = cathodeData.binderRatio === "" ? null : parseFloat(cathodeData.binderRatio);

    if ((aluminumFoilMassInput !== null && isNaN(aluminumFoilMassInput)) || 
        (activeMaterialRatioInput !== null && isNaN(activeMaterialRatioInput)) || 
        (conductiveAgentRatioInput !== null && isNaN(conductiveAgentRatioInput)) || 
        (binderRatioInput !== null && isNaN(binderRatioInput))) {
      setResults({
        coatingMass: null,
        activeMaterialMass: null,
        conductiveAgentMass: null,
        binderMass: null
      });
      return;
    }

    // 计算涂敷质量 = 极片总质量 - 铝箔质量
    const coatingMass = totalMass - aluminumFoilMass;

    // 计算总比例
    const totalRatio = activeMaterialRatio + conductiveAgentRatio + binderRatio;

    // 计算各成分的实际质量
    const activeMaterialMass = (coatingMass * activeMaterialRatio) / totalRatio;
    const conductiveAgentMass = (coatingMass * conductiveAgentRatio) / totalRatio;
    const binderMass = (coatingMass * binderRatio) / totalRatio;

    setResults({
      coatingMass,
      activeMaterialMass,
      conductiveAgentMass,
      binderMass
    });
  };

  const calculateAnodeMaterials = () => {
    const totalMass = parseFloat(anodeData.totalMass);
    
    if (isNaN(totalMass)) {
      setResults({
        coatingMass: null,
        activeMaterialMass: null,
        conductiveAgentMass: null,
        binderMass: null
      });
      return;
    }

    // 使用输入值或默认值
    const copperFoilMass = anodeData.copperFoilMass === "" 
      ? ANODE_DEFAULT_VALUES.copperFoilMass 
      : parseFloat(anodeData.copperFoilMass);
    
    const activeMaterialRatio = anodeData.activeMaterialRatio === "" 
      ? ANODE_DEFAULT_VALUES.activeMaterialRatio 
      : parseFloat(anodeData.activeMaterialRatio);
    
    const conductiveAgentRatio = anodeData.conductiveAgentRatio === "" 
      ? ANODE_DEFAULT_VALUES.conductiveAgentRatio 
      : parseFloat(anodeData.conductiveAgentRatio);
    
    const binderRatio = anodeData.binderRatio === "" 
      ? ANODE_DEFAULT_VALUES.binderRatio 
      : parseFloat(anodeData.binderRatio);

    // 验证数值 - 只有当用户输入了值但不是有效数字时才验证失败
    const copperFoilMassInput = anodeData.copperFoilMass === "" ? null : parseFloat(anodeData.copperFoilMass);
    const activeMaterialRatioInput = anodeData.activeMaterialRatio === "" ? null : parseFloat(anodeData.activeMaterialRatio);
    const conductiveAgentRatioInput = anodeData.conductiveAgentRatio === "" ? null : parseFloat(anodeData.conductiveAgentRatio);
    const binderRatioInput = anodeData.binderRatio === "" ? null : parseFloat(anodeData.binderRatio);

    if ((copperFoilMassInput !== null && isNaN(copperFoilMassInput)) || 
        (activeMaterialRatioInput !== null && isNaN(activeMaterialRatioInput)) || 
        (conductiveAgentRatioInput !== null && isNaN(conductiveAgentRatioInput)) || 
        (binderRatioInput !== null && isNaN(binderRatioInput))) {
      setResults({
        coatingMass: null,
        activeMaterialMass: null,
        conductiveAgentMass: null,
        binderMass: null
      });
      return;
    }

    // 计算涂敷质量 = 极片总质量 - 铜箔质量
    const coatingMass = totalMass - copperFoilMass;

    // 计算总比例
    const totalRatio = activeMaterialRatio + conductiveAgentRatio + binderRatio;

    // 计算各成分的实际质量
    const activeMaterialMass = (coatingMass * activeMaterialRatio) / totalRatio;
    const conductiveAgentMass = (coatingMass * conductiveAgentRatio) / totalRatio;
    const binderMass = (coatingMass * binderRatio) / totalRatio;

    setResults({
      coatingMass,
      activeMaterialMass,
      conductiveAgentMass,
      binderMass
    });
  };

  // 实时计算
  useEffect(() => {
    if (activeTab === "cathode") {
      calculateCathodeMaterials();
    } else {
      calculateAnodeMaterials();
    }
  }, [cathodeData, anodeData, activeTab]);

  const handleCathodeInputChange = (field: string, value: string) => {
    setCathodeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAnodeInputChange = (field: string, value: string) => {
    setAnodeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    if (activeTab === "cathode") {
      setCathodeData({
        totalMass: "",
        aluminumFoilMass: "",
        activeMaterialRatio: "",
        conductiveAgentRatio: "",
        binderRatio: ""
      });
    } else {
      setAnodeData({
        totalMass: "",
        copperFoilMass: "",
        activeMaterialRatio: "",
        conductiveAgentRatio: "",
        binderRatio: ""
      });
    }
    setResults({
      coatingMass: null,
      activeMaterialMass: null,
      conductiveAgentMass: null,
      binderMass: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      {/* Google AdSense Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1525530800359816"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-6">
        {/* 左侧广告 */}
        <div className="hidden lg:block lg:w-48 xl:w-64">
          <div className="sticky top-4">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '160px', height: '600px' }}
              data-ad-client="ca-pub-1525530800359816"
              data-ad-slot="1234567890"
              data-ad-format="vertical"
              data-full-width-responsive="false"
            ></ins>
          </div>
        </div>
        
        {/* 主要内容 */}
        <div className="flex-1 max-w-4xl">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left text-gray-900 flex-1">
                {t.title}
              </h1>
              <div className="flex justify-center sm:justify-end">
                <LanguageSwitcher currentLang={language} onLanguageChange={setLanguage} />
              </div>
            </div>
          </div>
        
        {/* 切换按钮 */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 flex w-full sm:w-auto max-w-xs">
            <button
              onClick={() => setActiveTab("cathode")}
              className={`flex-1 px-4 sm:px-6 py-2 rounded-md transition-colors text-sm sm:text-base ${
                activeTab === "cathode"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t.cathode}
            </button>
            <button
              onClick={() => setActiveTab("anode")}
              className={`flex-1 px-4 sm:px-6 py-2 rounded-md transition-colors text-sm sm:text-base ${
                activeTab === "anode"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t.anode}
            </button>
          </div>
        </div>

        {/* 正极计算界面 */}
        {activeTab === "cathode" && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              {t.cathodeCalculation}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.totalMass}
                </label>
                <input
                  type="number"
                  value={cathodeData.totalMass}
                  onChange={(e) => handleCathodeInputChange("totalMass", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder={t.placeholder}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.aluminumFoilMass}
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    {t.default}: {CATHODE_DEFAULT_VALUES.aluminumFoilMass} mg
                  </span>
                </label>
                <input
                  type="number"
                  value={cathodeData.aluminumFoilMass}
                  onChange={(e) => handleCathodeInputChange("aluminumFoilMass", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder={`${t.default}: ${CATHODE_DEFAULT_VALUES.aluminumFoilMass} mg`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.activeMaterialRatio}
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    {t.default}: {CATHODE_DEFAULT_VALUES.activeMaterialRatio}
                  </span>
                </label>
                <input
                  type="number"
                  value={cathodeData.activeMaterialRatio}
                  onChange={(e) => handleCathodeInputChange("activeMaterialRatio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder={`${t.default}: ${CATHODE_DEFAULT_VALUES.activeMaterialRatio}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.conductiveAgentRatio}
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    {t.default}: {CATHODE_DEFAULT_VALUES.conductiveAgentRatio}
                  </span>
                </label>
                <input
                  type="number"
                  value={cathodeData.conductiveAgentRatio}
                  onChange={(e) => handleCathodeInputChange("conductiveAgentRatio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder={`${t.default}: ${CATHODE_DEFAULT_VALUES.conductiveAgentRatio}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.binderRatio}
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    {t.default}: {CATHODE_DEFAULT_VALUES.binderRatio}
                  </span>
                </label>
                <input
                  type="number"
                  value={cathodeData.binderRatio}
                  onChange={(e) => handleCathodeInputChange("binderRatio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder={`${t.default}: ${CATHODE_DEFAULT_VALUES.binderRatio}`}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                {t.reset}
              </button>
            </div>
            
            <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">{t.currentDefaults}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-blue-800">
                <div>• {t.aluminumFoilMass}: {CATHODE_DEFAULT_VALUES.aluminumFoilMass} mg</div>
                <div>• {t.activeMaterialRatio}: {CATHODE_DEFAULT_VALUES.activeMaterialRatio}</div>
                <div>• {t.conductiveAgentRatio}: {CATHODE_DEFAULT_VALUES.conductiveAgentRatio}</div>
                <div>• {t.binderRatio}: {CATHODE_DEFAULT_VALUES.binderRatio}</div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                {t.tip}
              </p>
            </div>
          </div>
        )}

        {/* 负极计算界面 */}
        {activeTab === "anode" && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              {t.anodeCalculation}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.totalMass}
                </label>
                <input
                  type="number"
                  value={anodeData.totalMass}
                  onChange={(e) => handleAnodeInputChange("totalMass", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  placeholder={t.placeholder}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.copperFoilMass}
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    {t.default}: {ANODE_DEFAULT_VALUES.copperFoilMass} mg
                  </span>
                </label>
                <input
                  type="number"
                  value={anodeData.copperFoilMass}
                  onChange={(e) => handleAnodeInputChange("copperFoilMass", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  placeholder={`${t.default}: ${ANODE_DEFAULT_VALUES.copperFoilMass} mg`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.activeMaterialRatio}
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    {t.default}: {ANODE_DEFAULT_VALUES.activeMaterialRatio}
                  </span>
                </label>
                <input
                  type="number"
                  value={anodeData.activeMaterialRatio}
                  onChange={(e) => handleAnodeInputChange("activeMaterialRatio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  placeholder={`${t.default}: ${ANODE_DEFAULT_VALUES.activeMaterialRatio}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.conductiveAgentRatio}
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    {t.default}: {ANODE_DEFAULT_VALUES.conductiveAgentRatio}
                  </span>
                </label>
                <input
                  type="number"
                  value={anodeData.conductiveAgentRatio}
                  onChange={(e) => handleAnodeInputChange("conductiveAgentRatio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  placeholder={`${t.default}: ${ANODE_DEFAULT_VALUES.conductiveAgentRatio}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.binderRatio}
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    {t.default}: {ANODE_DEFAULT_VALUES.binderRatio}
                  </span>
                </label>
                <input
                  type="number"
                  value={anodeData.binderRatio}
                  onChange={(e) => handleAnodeInputChange("binderRatio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  placeholder={`${t.default}: ${ANODE_DEFAULT_VALUES.binderRatio}`}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                {t.reset}
              </button>
            </div>
            
            <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2 text-sm sm:text-base">{t.currentDefaults}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-green-800">
                <div>• {t.copperFoilMass}: {ANODE_DEFAULT_VALUES.copperFoilMass} mg</div>
                <div>• {t.activeMaterialRatio}: {ANODE_DEFAULT_VALUES.activeMaterialRatio}</div>
                <div>• {t.conductiveAgentRatio}: {ANODE_DEFAULT_VALUES.conductiveAgentRatio}</div>
                <div>• {t.binderRatio}: {ANODE_DEFAULT_VALUES.binderRatio}</div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                {t.tip}
              </p>
            </div>
          </div>
        )}
        
        {results.coatingMass !== null && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              {t.results}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 text-sm sm:text-base">{t.coatingMass}</h3>
                <p className="text-xl sm:text-2xl font-bold text-blue-700">
                  {results.coatingMass.toFixed(3)} mg
                </p>
              </div>
              
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                <h3 className="font-medium text-green-900 text-sm sm:text-base">{t.activeMaterialMass}</h3>
                <p className="text-xl sm:text-2xl font-bold text-green-700">
                  {results.activeMaterialMass!.toFixed(3)} mg
                </p>
              </div>
              
              <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
                <h3 className="font-medium text-yellow-900 text-sm sm:text-base">{t.conductiveAgentMass}</h3>
                <p className="text-xl sm:text-2xl font-bold text-yellow-700">
                  {results.conductiveAgentMass!.toFixed(3)} mg
                </p>
              </div>
              
              <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                <h3 className="font-medium text-purple-900 text-sm sm:text-base">{t.binderMass}</h3>
                <p className="text-xl sm:text-2xl font-bold text-purple-700">
                  {results.binderMass!.toFixed(3)} mg
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">{t.calculationNotes}</h3>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                <li>{activeTab === "cathode" ? t.note1 : t.note1Anode}</li>
                <li>{t.note2}</li>
                <li>{t.note3}</li>
                <li>{t.note4}</li>
                <li>{t.note5}</li>
              </ul>
            </div>
          </div>
        )}
        </div>
        
        {/* 右侧广告 */}
        <div className="hidden lg:block lg:w-48 xl:w-64">
          <div className="sticky top-4">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '160px', height: '600px' }}
              data-ad-client="ca-pub-1525530800359816"
              data-ad-slot="0987654321"
              data-ad-format="vertical"
              data-full-width-responsive="false"
            ></ins>
          </div>
        </div>
      </div>
      
      {/* 初始化广告的脚本 */}
      <Script
        id="ads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({});
            (adsbygoogle = window.adsbygoogle || []).push({});
          `,
        }}
      />
    </div>
  );
}
