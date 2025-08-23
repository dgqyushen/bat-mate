"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"cathode" | "anode">("cathode");
  
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
          电池材料计算器
        </h1>
        
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
              正极计算
            </button>
            <button
              onClick={() => setActiveTab("anode")}
              className={`flex-1 px-4 sm:px-6 py-2 rounded-md transition-colors text-sm sm:text-base ${
                activeTab === "anode"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              负极计算
            </button>
          </div>
        </div>

        {/* 正极计算界面 */}
        {activeTab === "cathode" && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              正极材料计算
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  极片总质量 (mg)
                </label>
                <input
                  type="number"
                  value={cathodeData.totalMass}
                  onChange={(e) => handleCathodeInputChange("totalMass", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="请输入极片总质量"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  铝箔质量 (mg)
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    默认: {CATHODE_DEFAULT_VALUES.aluminumFoilMass} mg
                  </span>
                </label>
                <input
                  type="number"
                  value={cathodeData.aluminumFoilMass}
                  onChange={(e) => handleCathodeInputChange("aluminumFoilMass", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder={`默认: ${CATHODE_DEFAULT_VALUES.aluminumFoilMass} mg`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活性物质比例
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    默认: {CATHODE_DEFAULT_VALUES.activeMaterialRatio}
                  </span>
                </label>
                <input
                  type="number"
                  value={cathodeData.activeMaterialRatio}
                  onChange={(e) => handleCathodeInputChange("activeMaterialRatio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder={`默认: ${CATHODE_DEFAULT_VALUES.activeMaterialRatio}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  导电剂比例
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    默认: {CATHODE_DEFAULT_VALUES.conductiveAgentRatio}
                  </span>
                </label>
                <input
                  type="number"
                  value={cathodeData.conductiveAgentRatio}
                  onChange={(e) => handleCathodeInputChange("conductiveAgentRatio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder={`默认: ${CATHODE_DEFAULT_VALUES.conductiveAgentRatio}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  粘结剂比例
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    默认: {CATHODE_DEFAULT_VALUES.binderRatio}
                  </span>
                </label>
                <input
                  type="number"
                  value={cathodeData.binderRatio}
                  onChange={(e) => handleCathodeInputChange("binderRatio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder={`默认: ${CATHODE_DEFAULT_VALUES.binderRatio}`}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                重置
              </button>
            </div>
            
            <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">当前默认值设置：</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-blue-800">
                <div>• 铝箔质量: {CATHODE_DEFAULT_VALUES.aluminumFoilMass} mg</div>
                <div>• 活性物质比例: {CATHODE_DEFAULT_VALUES.activeMaterialRatio}</div>
                <div>• 导电剂比例: {CATHODE_DEFAULT_VALUES.conductiveAgentRatio}</div>
                <div>• 粘结剂比例: {CATHODE_DEFAULT_VALUES.binderRatio}</div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                提示：留空输入框将使用上述默认值进行计算
              </p>
            </div>
          </div>
        )}

        {/* 负极计算界面 */}
        {activeTab === "anode" && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              负极材料计算
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  极片总质量 (mg)
                </label>
                <input
                  type="number"
                  value={anodeData.totalMass}
                  onChange={(e) => handleAnodeInputChange("totalMass", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  placeholder="请输入极片总质量"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  铜箔质量 (mg)
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    默认: {ANODE_DEFAULT_VALUES.copperFoilMass} mg
                  </span>
                </label>
                <input
                  type="number"
                  value={anodeData.copperFoilMass}
                  onChange={(e) => handleAnodeInputChange("copperFoilMass", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  placeholder={`默认: ${ANODE_DEFAULT_VALUES.copperFoilMass} mg`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活性物质比例
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    默认: {ANODE_DEFAULT_VALUES.activeMaterialRatio}
                  </span>
                </label>
                <input
                  type="number"
                  value={anodeData.activeMaterialRatio}
                  onChange={(e) => handleAnodeInputChange("activeMaterialRatio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  placeholder={`默认: ${ANODE_DEFAULT_VALUES.activeMaterialRatio}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  导电剂比例
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    默认: {ANODE_DEFAULT_VALUES.conductiveAgentRatio}
                  </span>
                </label>
                <input
                  type="number"
                  value={anodeData.conductiveAgentRatio}
                  onChange={(e) => handleAnodeInputChange("conductiveAgentRatio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  placeholder={`默认: ${ANODE_DEFAULT_VALUES.conductiveAgentRatio}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  粘结剂比例
                  <span className="text-gray-500 text-xs ml-1 sm:ml-2 block sm:inline">
                    默认: {ANODE_DEFAULT_VALUES.binderRatio}
                  </span>
                </label>
                <input
                  type="number"
                  value={anodeData.binderRatio}
                  onChange={(e) => handleAnodeInputChange("binderRatio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  placeholder={`默认: ${ANODE_DEFAULT_VALUES.binderRatio}`}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                重置
              </button>
            </div>
            
            <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2 text-sm sm:text-base">当前默认值设置：</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-green-800">
                <div>• 铜箔质量: {ANODE_DEFAULT_VALUES.copperFoilMass} mg</div>
                <div>• 活性物质比例: {ANODE_DEFAULT_VALUES.activeMaterialRatio}</div>
                <div>• 导电剂比例: {ANODE_DEFAULT_VALUES.conductiveAgentRatio}</div>
                <div>• 粘结剂比例: {ANODE_DEFAULT_VALUES.binderRatio}</div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                提示：留空输入框将使用上述默认值进行计算
              </p>
            </div>
          </div>
        )}
        
        {results.coatingMass !== null && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              计算结果
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 text-sm sm:text-base">涂敷质量</h3>
                <p className="text-xl sm:text-2xl font-bold text-blue-700">
                  {results.coatingMass.toFixed(3)} mg
                </p>
              </div>
              
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                <h3 className="font-medium text-green-900 text-sm sm:text-base">活性物质质量</h3>
                <p className="text-xl sm:text-2xl font-bold text-green-700">
                  {results.activeMaterialMass!.toFixed(3)} mg
                </p>
              </div>
              
              <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
                <h3 className="font-medium text-yellow-900 text-sm sm:text-base">导电剂质量</h3>
                <p className="text-xl sm:text-2xl font-bold text-yellow-700">
                  {results.conductiveAgentMass!.toFixed(3)} mg
                </p>
              </div>
              
              <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                <h3 className="font-medium text-purple-900 text-sm sm:text-base">粘结剂质量</h3>
                <p className="text-xl sm:text-2xl font-bold text-purple-700">
                  {results.binderMass!.toFixed(3)} mg
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">计算说明：</h3>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                <li>• 涂敷质量 = 极片总质量 - {activeTab === "cathode" ? "铝箔质量" : "铜箔质量"}</li>
                <li>• 总比例 = 活性物质比例 + 导电剂比例 + 粘结剂比例</li>
                <li>• 活性物质质量 = 涂敷质量 × (活性物质比例 ÷ 总比例)</li>
                <li>• 导电剂质量 = 涂敷质量 × (导电剂比例 ÷ 总比例)</li>
                <li>• 粘结剂质量 = 涂敷质量 × (粘结剂比例 ÷ 总比例)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
