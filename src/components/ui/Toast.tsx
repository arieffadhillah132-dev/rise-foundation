/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  message: ToastMessage | null;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white rounded-xl shadow-2xl border border-gray-100 p-4 pointer-events-auto"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {message.type === 'success' ? (
                <CheckCircle2 className="h-6 w-6 text-brand-green" />
              ) : (
                <AlertCircle className="h-6 w-6 text-brand-orange" />
              )}
            </div>
            <div className="ml-3 flex-1 pt-0.5">
              <p className="text-sm font-medium text-brand-navy">
                {message.type === 'success' ? 'Sukses' : 'Pemberitahuan'}
              </p>
              <p className="mt-1 text-xs text-gray-500 font-sans">{message.text}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={onClose}
                className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Tutup</span>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
