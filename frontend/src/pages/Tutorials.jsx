import { FiClock, FiDatabase, FiTrendingUp, FiBookOpen } from 'react-icons/fi';

const Tutorials = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">
          Understanding Time & Space Complexity
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Learn the fundamentals of algorithm analysis and Big O notation to write more efficient code
        </p>
      </div>

      {/* What is Big O */}
      <section className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <FiBookOpen className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-white">What is Big O Notation?</h2>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <p className="text-gray-300 mb-4">
            Big O notation is a mathematical notation that describes the limiting behavior of a function 
            when the argument tends towards a particular value or infinity. In computer science, it's used 
            to classify algorithms according to how their run time or space requirements grow as the input size grows.
          </p>
          <p className="text-gray-300">
            It provides an upper bound on the growth rate, helping us understand the worst-case scenario 
            for an algorithm's performance.
          </p>
        </div>
      </section>

      {/* Time Complexity */}
      <section className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <FiClock className="h-6 w-6 text-green-500" />
          <h2 className="text-2xl font-bold text-white">Time Complexity</h2>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <p className="text-gray-300 mb-6">
            Time complexity measures how the runtime of an algorithm increases with the size of the input.
          </p>

          <div className="space-y-6">
            {/* O(1) */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-white mb-2">O(1) - Constant Time</h3>
              <p className="text-gray-400 mb-3">
                The algorithm takes the same amount of time regardless of input size.
              </p>
              <pre className="bg-gray-900 rounded p-3 text-sm text-gray-300 overflow-x-auto">
{`// Example: Accessing an array element by index
function getFirst(arr) {
  return arr[0];  // Always one operation
}`}
              </pre>
            </div>

            {/* O(log n) */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-white mb-2">O(log n) - Logarithmic Time</h3>
              <p className="text-gray-400 mb-3">
                The algorithm reduces the problem size by half with each step (e.g., binary search).
              </p>
              <pre className="bg-gray-900 rounded p-3 text-sm text-gray-300 overflow-x-auto">
{`// Example: Binary Search
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`}
              </pre>
            </div>

            {/* O(n) */}
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-lg font-semibold text-white mb-2">O(n) - Linear Time</h3>
              <p className="text-gray-400 mb-3">
                The runtime grows linearly with the input size.
              </p>
              <pre className="bg-gray-900 rounded p-3 text-sm text-gray-300 overflow-x-auto">
{`// Example: Finding maximum in array
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}`}
              </pre>
            </div>

            {/* O(n log n) */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-semibold text-white mb-2">O(n log n) - Linearithmic Time</h3>
              <p className="text-gray-400 mb-3">
                Common in efficient sorting algorithms like Merge Sort and Quick Sort (average case).
              </p>
              <pre className="bg-gray-900 rounded p-3 text-sm text-gray-300 overflow-x-auto">
{`// Example: Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}`}
              </pre>
            </div>

            {/* O(n²) */}
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-lg font-semibold text-white mb-2">O(n²) - Quadratic Time</h3>
              <p className="text-gray-400 mb-3">
                Usually involves nested loops. Runtime grows quadratically with input size.
              </p>
              <pre className="bg-gray-900 rounded p-3 text-sm text-gray-300 overflow-x-auto">
{`// Example: Bubble Sort
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`}
              </pre>
            </div>

            {/* O(2^n) */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-white mb-2">O(2ⁿ) - Exponential Time</h3>
              <p className="text-gray-400 mb-3">
                Runtime doubles with each addition to the input. Often seen in recursive algorithms.
              </p>
              <pre className="bg-gray-900 rounded p-3 text-sm text-gray-300 overflow-x-auto">
{`// Example: Recursive Fibonacci (inefficient)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Space Complexity */}
      <section className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <FiDatabase className="h-6 w-6 text-purple-500" />
          <h2 className="text-2xl font-bold text-white">Space Complexity</h2>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <p className="text-gray-300 mb-6">
            Space complexity measures the total amount of memory an algorithm needs relative to the input size.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-white mb-2">O(1) - Constant Space</h3>
              <p className="text-gray-400 mb-3">
                The algorithm uses a fixed amount of extra space regardless of input size.
              </p>
              <pre className="bg-gray-900 rounded p-3 text-sm text-gray-300 overflow-x-auto">
{`// Example: In-place swap
function swap(arr, i, j) {
  const temp = arr[i];  // Only one extra variable
  arr[i] = arr[j];
  arr[j] = temp;
}`}
              </pre>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-lg font-semibold text-white mb-2">O(n) - Linear Space</h3>
              <p className="text-gray-400 mb-3">
                The algorithm needs space proportional to the input size.
              </p>
              <pre className="bg-gray-900 rounded p-3 text-sm text-gray-300 overflow-x-auto">
{`// Example: Creating a copy of array
function duplicate(arr) {
  const copy = [];  // New array of size n
  for (let item of arr) {
    copy.push(item);
  }
  return copy;
}`}
              </pre>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-white mb-2">O(log n) - Logarithmic Space</h3>
              <p className="text-gray-400 mb-3">
                Often seen in recursive algorithms that divide the problem (call stack depth).
              </p>
              <pre className="bg-gray-900 rounded p-3 text-sm text-gray-300 overflow-x-auto">
{`// Example: Binary Search (recursive)
function binarySearch(arr, target, left, right) {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  // Call stack grows logarithmically
  if (arr[mid] < target)
    return binarySearch(arr, target, mid + 1, right);
  return binarySearch(arr, target, left, mid - 1);
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Complexity Chart */}
      <section className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <FiTrendingUp className="h-6 w-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-white">Complexity Comparison</h2>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-gray-400 font-medium">Complexity</th>
                <th className="py-3 px-4 text-gray-400 font-medium">n = 10</th>
                <th className="py-3 px-4 text-gray-400 font-medium">n = 100</th>
                <th className="py-3 px-4 text-gray-400 font-medium">n = 1000</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700/50">
                <td className="py-3 px-4 font-mono text-green-400">O(1)</td>
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-sm">Excellent</span></td>
              </tr>
              <tr className="border-b border-gray-700/50">
                <td className="py-3 px-4 font-mono text-green-400">O(log n)</td>
                <td className="py-3 px-4">3</td>
                <td className="py-3 px-4">7</td>
                <td className="py-3 px-4">10</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-sm">Excellent</span></td>
              </tr>
              <tr className="border-b border-gray-700/50">
                <td className="py-3 px-4 font-mono text-yellow-400">O(n)</td>
                <td className="py-3 px-4">10</td>
                <td className="py-3 px-4">100</td>
                <td className="py-3 px-4">1,000</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded text-sm">Good</span></td>
              </tr>
              <tr className="border-b border-gray-700/50">
                <td className="py-3 px-4 font-mono text-orange-400">O(n log n)</td>
                <td className="py-3 px-4">33</td>
                <td className="py-3 px-4">664</td>
                <td className="py-3 px-4">9,966</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-orange-600/20 text-orange-400 rounded text-sm">Fair</span></td>
              </tr>
              <tr className="border-b border-gray-700/50">
                <td className="py-3 px-4 font-mono text-red-400">O(n²)</td>
                <td className="py-3 px-4">100</td>
                <td className="py-3 px-4">10,000</td>
                <td className="py-3 px-4">1,000,000</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-red-600/20 text-red-400 rounded text-sm">Poor</span></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-red-500">O(2ⁿ)</td>
                <td className="py-3 px-4">1,024</td>
                <td className="py-3 px-4">1.27 × 10³⁰</td>
                <td className="py-3 px-4">∞</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-red-800/30 text-red-500 rounded text-sm">Terrible</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">🔍 Identify Loops</h3>
            <p className="text-gray-400 text-sm">
              Single loop = O(n), Nested loops = O(n²), Loop halving = O(log n)
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">📊 Drop Constants</h3>
            <p className="text-gray-400 text-sm">
              O(2n) and O(n + 100) both simplify to O(n)
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">⚡ Keep Dominant Term</h3>
            <p className="text-gray-400 text-sm">
              O(n² + n) simplifies to O(n²) as n² dominates for large n
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">🔄 Recursion Depth</h3>
            <p className="text-gray-400 text-sm">
              Space complexity often relates to maximum call stack depth
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tutorials;
