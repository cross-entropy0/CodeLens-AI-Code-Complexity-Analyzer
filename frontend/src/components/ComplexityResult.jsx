import { FiClock, FiDatabase } from 'react-icons/fi';

const ComplexityResult = ({ result }) => {
  if (!result) return null;

  const ComplexityCard = ({ title, icon: Icon, data }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center space-x-2 mb-3">
        <Icon className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Best Case:</span>
          <span className="text-green-400 font-mono">{data.bestCase}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Average Case:</span>
          <span className="text-yellow-400 font-mono">{data.averageCase}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Worst Case:</span>
          <span className="text-red-400 font-mono">{data.worstCase}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Analysis Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ComplexityCard
          title="Time Complexity"
          icon={FiClock}
          data={result.timeComplexity}
        />
        <ComplexityCard
          title="Space Complexity"
          icon={FiDatabase}
          data={result.spaceComplexity}
        />
      </div>

      {result.explanation && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-2">Explanation</h3>
          <p className="text-gray-300 leading-relaxed">{result.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default ComplexityResult;
