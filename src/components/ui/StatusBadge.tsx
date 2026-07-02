/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RegistrationStatus } from '../../types';

interface StatusBadgeProps {
  status: RegistrationStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  let text = 'Submitted';
  let classes = 'bg-gray-100 text-gray-800 border-gray-200';

  switch (status) {
    case 'submitted':
      text = 'Dikirim';
      classes = 'bg-blue-50 text-blue-700 border-blue-200';
      break;
    case 'in_review':
      text = 'Ditinjau';
      classes = 'bg-amber-50 text-amber-700 border-amber-200';
      break;
    case 'accepted':
      text = 'Diterima';
      classes = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      break;
    case 'rejected':
      text = 'Ditolak';
      classes = 'bg-rose-50 text-rose-700 border-rose-200';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${classes}`}>
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-current"></span>
      {text}
    </span>
  );
}
