import React, { useState } from 'react';
import axios from 'axios';

const PdfUpload = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [rules, setRules] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      setPdfFile(file);
      setError('');
    }
  };

  const handleRuleChange = (index, value) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!pdfFile) {
      setError('Please select a PDF file');
      return;
    }

    const validRules = rules.filter(rule => rule.trim() !== '');
    if (validRules.length === 0) {
      setError('Please enter at least one rule');
      return;
    }

    if (validRules.length < 3) {
      setError('Please enter all 3 rules');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', pdfFile);
      formData.append('rules', JSON.stringify(validRules));

      console.log('Submitting form to:', 'http://localhost:8000/api/v1/pdf/check');
      console.log('Rules being sent:', validRules);
      console.log('PDF file:', pdfFile.name);

      const response = await axios.post(
        'http://localhost:8000/api/v1/pdf/check',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Response received:', response.data);

      // Handle response structure: response.data.data.result
      if (response.data && response.data.data && response.data.data.result) {
        setResult(response.data.data.result);
        setError('');
      } else {
        throw new Error('Unexpected response format from server');
      }
    } catch (err) {
      console.error('Error details:', err);
      console.error('Error response:', err.response?.data);
      
      // Better error handling
      let errorMessage = 'Failed to process PDF. Please try again.';
      
      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.message || 
                      err.response.data?.error || 
                      `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check if the backend is running.';
      } else {
        // Error setting up the request
        errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center">
            Upload PDF & Set Rules
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Upload your PDF document and define 3 compliance rules to check
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PDF Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="pdf-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a PDF file</span>
                      <input
                        id="pdf-upload"
                        name="pdf-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF up to 10MB</p>
                  {pdfFile && (
                    <p className="text-sm text-green-600 font-medium mt-2">
                      ✓ {pdfFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Rules Input */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Compliance Rules (Enter 3 rules)
              </label>
              {rules.map((rule, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rule {index + 1}
                  </label>
                  <input
                    type="text"
                    value={rule}
                    onChange={(e) => handleRuleChange(index, e.target.value)}
                    placeholder={`Enter rule ${index + 1}...`}
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Check Compliance'
              )}
            </button>
          </form>

          {/* Results Display */}
          {result && result.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Compliance Results</h3>
                <span className="text-sm text-gray-500">
                  {result.length} rule{result.length !== 1 ? 's' : ''} checked
                </span>
              </div>
              <div className="space-y-4">
                {result.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Rule {index + 1}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status?.toLowerCase() === 'compliant' ||
                          item.status?.toLowerCase() === 'pass' ||
                          item.status?.toLowerCase() === 'compliant: yes'
                            ? 'bg-green-100 text-green-800'
                            : item.status?.toLowerCase() === 'non-compliant' ||
                              item.status?.toLowerCase() === 'fail' ||
                              item.status?.toLowerCase() === 'compliant: no'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.status || 'Unknown'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <strong className="text-gray-900">Rule:</strong> {item.rule || 'N/A'}
                      </p>
                      {item.evidence && (
                        <p className="text-gray-600">
                          <strong className="text-gray-900">Evidence:</strong> {item.evidence}
                        </p>
                      )}
                      {item.reasoning && (
                        <p className="text-gray-600">
                          <strong className="text-gray-900">Reasoning:</strong> {item.reasoning}
                        </p>
                      )}
                      {item.confidence !== undefined && item.confidence !== null && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Confidence:</span>
                            <span className="text-sm font-semibold text-gray-900">{item.confidence}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                item.confidence >= 80
                                  ? 'bg-green-500'
                                  : item.confidence >= 50
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${item.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfUpload;

