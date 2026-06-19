'use client'

import { forwardRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

import type { BadgeRecord } from '@/types/badgePrinting'

interface Props {
  attendee: BadgeRecord

  qrSize: number
  qrX: number
  qrY: number

  nameSize: number
  nameWeight: number
  nameWidth: number

  nameX: number
  nameY: number
}

export const BadgePrintLayout = forwardRef<HTMLDivElement, Props>(
  (
    {
      attendee,

      qrSize,
      qrX,
      qrY,

      nameSize,
      nameWeight,
      nameWidth,

      nameX,
      nameY,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        style={{
          width: '4in',
          height: '6in',
          background: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* QR */}

        <div
          style={{
            position: 'absolute',
            left: `calc(50% + ${qrX}px)`,
            top: `calc(50% + ${qrY}px)`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <QRCodeCanvas value={attendee.regNum} size={qrSize} />
        </div>

        {/* NAME */}

        <div
          style={{
            position: 'absolute',
            left: `calc(50% + ${nameX}px)`,
            top: `calc(50% + ${nameY}px)`,
            transform: 'translate(-50%, -50%)',

            fontSize: `${nameSize}px`,
            fontWeight: nameWeight,

            width: `${nameWidth}px`,
            maxWidth: `${nameWidth}px`,

            lineHeight: 1.15,

            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',

            textAlign: 'center',
          }}
        >
          {[attendee.prefix, attendee.name].filter(Boolean).join(' ')}
        </div>
      </div>
    )
  },
)

BadgePrintLayout.displayName = 'BadgePrintLayout'
