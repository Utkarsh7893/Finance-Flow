import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Background3D from '../components/Background3D';
import { useStore } from '../store';

export default function TermsView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const termsAccepted = useStore(state => state.termsAccepted);
  const setTermsAccepted = useStore(state => state.setTermsAccepted);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background3D />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12 md:py-20">
        <div className="glass-panel p-6 md:p-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <ShieldAlert className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Terms & Conditions</h1>
              <p className="text-sm text-gray-800 dark:text-gray-300">Centsible — Full Terms of Service</p>
            </div>
          </div>

          {/* Terms Content */}
          <div className="text-gray-800 dark:text-gray-300 space-y-6 custom-scrollbar">
            <p className="leading-relaxed">
              Welcome to the S.H.I.E.L.D. Protocol for Financial Management. By using Centsible, you agree to the following terms and conditions. Please read them carefully before proceeding.
            </p>

            <div>
              <h3 className="text-lg text-gray-900 dark:text-white font-semibold mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/20 text-primary text-sm font-bold flex items-center justify-center">1</span>
                Data Privacy & Security
              </h3>
              <p className="leading-relaxed pl-9">
                We take your data security seriously. Your financial records are encrypted and stored securely using industry-standard protocols. We will not sell, share, or distribute your personal or financial data to any third-party organizations, marketing agencies, or unauthorized entities. All data transmissions are protected through SSL/TLS encryption.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 dark:text-white font-semibold mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#0b4a99]/20 text-[#0b4a99] text-sm font-bold flex items-center justify-center">2</span>
                Usage Responsibilities
              </h3>
              <p className="leading-relaxed pl-9">
                You are responsible for maintaining the confidentiality of your account credentials. Do not share your login details with anyone. You agree to use this platform solely for personal financial tracking and management purposes. Any misuse, unauthorized access attempts, or malicious activities may result in immediate account termination.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 dark:text-white font-semibold mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#fbc02d]/20 text-[#fbc02d] text-sm font-bold flex items-center justify-center">3</span>
                Rewards Program (Coming Soon)
              </h3>
              <p className="leading-relaxed pl-9">
                The upcoming real-time UPI and rewards system is subject to beta testing. Rewards are granted based on consistent saving behaviors and financial discipline. The specifics of the rewards program, including eligibility criteria and reward values, are subject to change without prior notice during the beta phase.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 dark:text-white font-semibold mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#512da8]/20 text-[#512da8] text-sm font-bold flex items-center justify-center">4</span>
                Financial Disclaimer
              </h3>
              <p className="leading-relaxed pl-9">
                Centsible is a student project designed for educational and tracking purposes only. We do not provide investment advice, tax guidance, or guarantee returns on savings. Users should consult certified financial advisors for professional financial planning and investment decisions.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 dark:text-white font-semibold mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#00796b]/20 text-[#00796b] text-sm font-bold flex items-center justify-center">5</span>
                Account Data & Deletion
              </h3>
              <p className="leading-relaxed pl-9">
                You may request deletion of your account and all associated data at any time. Guest accounts and their data are automatically purged periodically. We retain minimal operational logs for security auditing purposes only, which are anonymized and cannot be linked back to individual users.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 dark:text-white font-semibold mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#c2185b]/20 text-[#c2185b] text-sm font-bold flex items-center justify-center">6</span>
                Modifications to Terms
              </h3>
              <p className="leading-relaxed pl-9">
                We reserve the right to update or modify these terms at any time. Users will be notified of significant changes through in-app notifications. Continued use of Centsible after such changes constitutes acceptance of the updated terms.
              </p>
            </div>

            <p className="pt-4 text-sm text-gray-800 dark:text-gray-300 italic border-t border-gray-200 dark:border-gray-800 mt-8">
              *This is a student project. The information provided is for educational and tracking purposes. Last updated: April 2026.
            </p>
          </div>

          {/* Back to Login CTA */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <label className="flex items-center gap-3 cursor-pointer group mb-6">
              <input 
                type="checkbox" 
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary dark:focus:ring-primary dark:bg-gray-800 transition-colors cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                I have read and agree to the terms and conditions
              </span>
            </label>

            <button
              onClick={() => navigate(searchParams.get('mode') === 'signup' ? '/login?mode=signup' : '/login')}
              disabled={!termsAccepted}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${termsAccepted ? 'btn-primary' : 'bg-slate-200 dark:bg-gray-800 text-slate-500 dark:text-gray-500 cursor-not-allowed opacity-70'}`}
            >
              <ArrowLeft size={18} />
              {searchParams.get('mode') === 'signup' ? 'Back to Sign Up' : 'Back to Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
