import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  Image as ImageIcon,
  Video,
  Brain,
  Sparkles,
  ArrowRight,
  Lightbulb,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

const steps = ['Problem', 'Evidence', 'Review', 'AI Analysis'];

const aiSteps = [
  { label: 'Understanding description', icon: '🧠' },
  { label: 'Classifying domain', icon: '📂' },
  { label: 'Identifying sub-category', icon: '🔍' },
  { label: 'Estimating priority', icon: '⚡' },
  { label: 'Extracting expertise', icon: '🎓' },
  { label: 'Checking duplicate challenges', icon: '🔄' },
];

export function PostProblemPage() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Water Management',
    subCategory: '',
    location: '',
    district: '',
    urgency: 'HIGH',
  });
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiStepIndex, setAiStepIndex] = useState(-1);
  const [aiComplete, setAiComplete] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 2) {
      // Start AI analysis
      setCurrentStep(3);
      setAiProcessing(true);
      aiSteps.forEach((_, i) => {
        setTimeout(() => setAiStepIndex(i), i * 800);
      });
      setTimeout(() => {
        setAiProcessing(false);
        setAiComplete(true);
        showToast('AI analysis complete!', 'success');
      }, aiSteps.length * 800 + 500);
    } else if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const categories = ['Water Management', 'Agriculture', 'Healthcare', 'Education', 'Waste Management', 'Energy', 'Environment'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50/30 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Turn Your Problem Into an Innovation Project
          </h1>
          <p className="mt-3 text-gray-500">
            Share your challenge and our AI will analyze it, classify it, and find the right people to solve it.
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                      i < currentStep
                        ? 'bg-emerald-500 text-white'
                        : i === currentStep
                        ? 'bg-navy-900 text-white shadow-glow-navy'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {i < currentStep ? <Check className="h-5 w-5" /> : i + 1}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${i === currentStep ? 'text-navy-900' : 'text-gray-400'}`}>
                    {step}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`mx-2 h-0.5 flex-1 transition-all duration-500 ${i < currentStep ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="card p-6 sm:p-8">
          {/* Step 1: Problem */}
          {currentStep === 0 && (
            <div className="animate-fade-in space-y-5">
              <div>
                <label className="label-text">Problem Title</label>
                <input
                  type="text"
                  placeholder="e.g., Unsafe drinking water in our village"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">Detailed Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe the problem in detail. What is happening? Who is affected? Since when?"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="input-field resize-none"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-text">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="input-field"
                  >
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-text">Sub-category</label>
                  <input
                    type="text"
                    placeholder="e.g., Water Quality"
                    value={formData.subCategory}
                    onChange={(e) => updateField('subCategory', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="label-text">Location</label>
                  <input
                    type="text"
                    placeholder="City/Town"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label-text">District</label>
                  <input
                    type="text"
                    placeholder="e.g., Ranchi"
                    value={formData.district}
                    onChange={(e) => updateField('district', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label-text">Urgency</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => updateField('urgency', e.target.value)}
                    className="input-field"
                  >
                    <option value="URGENT">Urgent</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Evidence */}
          {currentStep === 1 && (
            <div className="animate-fade-in space-y-6">
              <p className="text-sm text-gray-500">
                Upload supporting evidence — photos, videos, documents, or data files. This helps AI and
                solution providers understand the problem better.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { type: 'Photos', icon: ImageIcon, color: 'text-cyan-600 bg-cyan-50' },
                  { type: 'Videos', icon: Video, color: 'text-teal-600 bg-teal-50' },
                  { type: 'Documents', icon: FileText, color: 'text-navy-600 bg-navy-50' },
                  { type: 'Data Files', icon: Upload, color: 'text-emerald-600 bg-emerald-50' },
                ].map((upload, i) => {
                  const Icon = upload.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => showToast(`${upload.type} upload simulated for demo`, 'info')}
                      className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-gray-200 p-6 transition-all hover:border-teal-300 hover:bg-teal-50/30"
                    >
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${upload.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-semibold text-navy-700">{upload.type}</span>
                      <span className="text-xs text-gray-400">Click to upload</span>
                    </button>
                  );
                })}
              </div>
              <div className="rounded-xl bg-navy-50 p-4">
                <p className="text-xs text-navy-600">
                  <strong>Demo Note:</strong> File uploads are simulated. No actual files are stored.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 2 && (
            <div className="animate-fade-in space-y-6">
              <p className="text-sm text-gray-500">
                Review your submission. Once you confirm, our AI will analyze the problem.
              </p>
              <div className="space-y-4">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Problem Title</p>
                  <p className="font-semibold text-navy-900">{formData.title || 'Unsafe drinking water in our village'}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Description</p>
                  <p className="text-sm text-navy-700">{formData.description || 'Residents are unsure whether the available water is safe for drinking. The water from the local well has a strange color and smell, and several children have fallen ill recently.'}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: 'Category', value: formData.category },
                    { label: 'Sub-category', value: formData.subCategory || 'Water Quality' },
                    { label: 'Location', value: `${formData.location || 'Ranchi'}, ${formData.district || 'Ranchi'}` },
                    { label: 'Urgency', value: formData.urgency },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">{item.label}</p>
                      <p className="text-sm font-semibold text-navy-700">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: AI Analysis */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              {aiProcessing ? (
                <div className="flex flex-col items-center py-8">
                  <div className="relative mb-8">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 shadow-glow">
                      <Brain className="h-12 w-12 text-white animate-pulse" />
                    </div>
                    <div className="absolute inset-0 animate-ping rounded-full bg-teal-400/20" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-navy-900">Analyzing problem...</h3>
                  <p className="mb-8 text-sm text-gray-500">Our AI is processing your submission</p>

                  <div className="w-full max-w-md space-y-3">
                    {aiSteps.map((step, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-500 ${
                          aiStepIndex >= i
                            ? 'border-teal-200 bg-teal-50/50 opacity-100'
                            : 'border-gray-100 bg-gray-50 opacity-40'
                        }`}
                      >
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                          aiStepIndex > i ? 'bg-emerald-500' : aiStepIndex === i ? 'bg-teal-500' : 'bg-gray-200'
                        }`}>
                          {aiStepIndex > i ? (
                            <Check className="h-4 w-4 text-white" />
                          ) : aiStepIndex === i ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          ) : (
                            <span className="text-gray-400">{step.icon}</span>
                          )}
                        </div>
                        <span className={`text-sm font-medium ${aiStepIndex >= i ? 'text-navy-900' : 'text-gray-400'}`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : aiComplete ? (
                <div className="animate-scale-in">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-900">Problem Intelligence</h3>
                      <p className="text-sm text-gray-500">AI analysis complete</p>
                    </div>
                  </div>

                  {/* Split screen */}
                  <div className="grid gap-4 lg:grid-cols-2">
                    {/* Left: Citizen Report */}
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-bold text-navy-900">Citizen Report</span>
                        <span className="text-xs text-gray-400">— Original</span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {formData.description || 'Residents are unsure whether the available water is safe for drinking. The water from the local well has a strange color and smell, and several children have fallen ill recently.'}
                      </p>
                    </div>

                    {/* Right: AI Structured */}
                    <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Brain className="h-4 w-4 text-teal-600" />
                        <span className="text-sm font-bold text-navy-900">AI Structured Problem</span>
                      </div>
                      <div className="space-y-2.5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Classification:</span>
                          <span className="font-semibold text-navy-900">{formData.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Sub-category:</span>
                          <span className="font-semibold text-navy-900">{formData.subCategory || 'Water Quality'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Priority:</span>
                          <span className="font-bold text-amber-600">{formData.urgency}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Required expertise:</span>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {['IoT', 'Environmental Engineering', 'Data Science'].map((exp) => (
                              <span key={exp} className="rounded-md bg-white px-2 py-0.5 text-xs font-medium text-teal-700">
                                {exp}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between border-t border-teal-100 pt-2">
                          <span className="text-gray-500">Similar challenges:</span>
                          <span className="font-bold text-navy-900">7 detected</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => navigate('/ai-matching')}
                      className="btn-accent text-base"
                    >
                      Find Solution Providers
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        {currentStep < 3 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <button onClick={handleNext} className="btn-primary">
              {currentStep === 2 ? 'Run AI Analysis' : 'Continue'}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
