'use client'

import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { BadgeRecord } from '@/types/badgePrinting'

interface Props {
  attendee: BadgeRecord | null

  // QR
  qrSize: number
  qrX: number
  qrY: number

  // Name
  nameSize: number
  nameWeight: number
  nameWidth: number
  nameX: number
  nameY: number

  printRef: React.RefObject<HTMLDivElement | null>
}

export function BadgePreview({
  attendee,
  printRef,

  qrSize,
  qrX,
  qrY,

  nameSize,
  nameWeight,
  nameWidth,
  nameX,
  nameY,
}: Props) {
  if (!attendee) return null

  return (
    <div className="w-full rounded-lg border bg-card p-3 sm:p-4">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Live Badge Preview</h2>

          <p className="text-sm text-muted-foreground">
            QR and Name will be printed only inside the center printable area.
          </p>
        </div>

        <div className="w-fit rounded-md border px-3 py-1 text-xs font-medium">
          4 × 6 inch
        </div>
      </div>

      {/* Preview Container */}
      <div className="overflow-x-auto">
        <div className="flex justify-center py-2 sm:py-4">
          {/* Responsive Scale Wrapper */}
          <div
            className="
              origin-top
              scale-[0.72]
              xs:scale-[0.8]
              sm:scale-100
            "
          >
            <div
              ref={printRef}
              className="relative bg-white shadow-lg"
              style={{
                width: '4in',
                height: '6in',
                minWidth: '4in',
                border: '1px solid #d1d5db',
              }}
            >
              {/* =============================================== */}
              {/* TOP PRE-PRINTED AREA */}
              {/* =============================================== */}

              <div
                className="absolute left-0 top-0 flex items-center justify-center border-b bg-slate-100 text-xs text-slate-500"
                style={{
                  width: '100%',
                  height: '30%',
                }}
              >
                Pre-Printed Banner Area
              </div>

              {/* =============================================== */}
              {/* PRINTABLE AREA */}
              {/* =============================================== */}

              <div
                className="absolute left-0"
                style={{
                  top: '30%',
                  width: '100%',
                  height: '50%',
                }}
              >
                <div className="absolute inset-0 border-2 border-dashed border-green-300 bg-green-50/30">
                  <div className="absolute left-2 top-2 text-xs font-medium text-green-700">
                    Printable Area
                  </div>
                </div>

                {/* =========================================== */}
                {/* QR CODE */}
                {/* =========================================== */}

                <div
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${qrX}px)`,
                    top: `calc(50% + ${qrY}px)`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20,
                  }}
                >
                  <QRCodeCanvas value={attendee.regNum} size={qrSize} />
                </div>

                {/* =========================================== */}
                {/* NAME */}
                {/* =========================================== */}

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
                    zIndex: 20,
                  }}
                >
                  {[attendee.prefix, attendee.name].filter(Boolean).join(' ')}
                </div>
              </div>

              {/* =============================================== */}
              {/* BOTTOM PRE-PRINTED AREA */}
              {/* =============================================== */}

              <div
                className="absolute bottom-0 left-0 flex items-center justify-center border-t bg-slate-100 text-xs text-slate-500"
                style={{
                  width: '100%',
                  height: '20%',
                }}
              >
                Pre-Printed Badge Profile Area
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
