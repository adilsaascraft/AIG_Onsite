'use client'

import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { toast } from 'sonner'

import { QrSettings } from '@/components/QrSettings'
import { BadgePreview } from '@/components/BadgePreview'

import { defaultBadgePrintSettings, useBadgePrintStore } from '@/store/badgePrintStore'

export default function QrSettingPage() {
  const settings = useBadgePrintStore()

  const [saving, setSaving] = useState(false)

  const [resetting, setResetting] = useState(false)

  const printRef = useRef<HTMLDivElement>(null)

  const [previewName, setPreviewName] = useState('S Mohan')

  const [previewPrefix, setPreviewPrefix] = useState('Dr.')

  const [previewRegNum, setPreviewRegNum] = useState('AIGBDM-0001')

  // ======================================================
  // DRAFT SETTINGS
  // ======================================================

  const [draftSettings, setDraftSettings] = useState({
    qrSize: settings.qrSize,
    qrX: settings.qrX,
    qrY: settings.qrY,

    nameFontSize: settings.nameFontSize,
    nameWeight: settings.nameWeight,
    nameWidth: settings.nameWidth,

    nameX: settings.nameX,
    nameY: settings.nameY,
  })

  useEffect(() => {
    setDraftSettings({
      qrSize: settings.qrSize,
      qrX: settings.qrX,
      qrY: settings.qrY,

      nameFontSize: settings.nameFontSize,
      nameWeight: settings.nameWeight,
      nameWidth: settings.nameWidth,

      nameX: settings.nameX,
      nameY: settings.nameY,
    })
  }, [settings])

  // ======================================================
  // PRINT
  // ======================================================

  const handlePrintView = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Badge Test Print',
  })

  // ======================================================
  // SAVE SETTINGS
  // ======================================================

  const handleSave = async () => {
    try {
      setSaving(true)

      settings.setSettings(draftSettings)

      await new Promise((resolve) => setTimeout(resolve, 500))

      toast.success('Badge layout settings saved successfully')
    } finally {
      setSaving(false)
    }
  }

  // ======================================================
  // RESET SETTINGS
  // ======================================================

  const handleReset = async () => {
    try {
      setResetting(true)

      settings.resetSettings()

      setDraftSettings(defaultBadgePrintSettings)

      await new Promise((resolve) => setTimeout(resolve, 300))

      toast.success('Default layout restored')
    } finally {
      setResetting(false)
    }
  }

  // ======================================================
  // PREVIEW DATA
  // ======================================================

  const previewAttendee = {
    _id: 'preview',
    regNum: previewRegNum,
    prefix: previewPrefix,
    name: previewName,
    email: '',
    mobile: '',
    badgeProfileName: 'Organizer Committee',
    badgePrinted: false,
    printCount: 0,
  }

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">
          Badge Layout Settings
        </h1>

        <p className="text-sm text-muted-foreground">
          Adjust QR position, name position, preview instantly and print a test
          badge before saving.
        </p>
      </div>

      <div className="space-y-6">
        {/* ============================================
          PREVIEW DATA
      ============================================ */}

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="bg-sky-800 px-4 py-3">
            <h2 className="font-semibold text-white">Preview Data</h2>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium">Prefix</label>

              <input
                value={previewPrefix}
                onChange={(e) => setPreviewPrefix(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Name</label>

              <input
                value={previewName}
                onChange={(e) => setPreviewName(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Registration Number</label>

              <input
                value={previewRegNum}
                onChange={(e) => setPreviewRegNum(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* ============================================
          SETTINGS + PREVIEW
      ============================================ */}

        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
          {/* LEFT PANEL */}

          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="bg-sky-800 px-4 py-3">
                <h2 className="font-semibold text-white">QR Settings</h2>
              </div>

              <div className="p-4">
                <QrSettings
                  qrSize={draftSettings.qrSize}
                  setQrSize={(v) =>
                    setDraftSettings((prev) => ({
                      ...prev,
                      qrSize: v,
                    }))
                  }
                  qrX={draftSettings.qrX}
                  setQrX={(v) =>
                    setDraftSettings((prev) => ({
                      ...prev,
                      qrX: v,
                    }))
                  }
                  qrY={draftSettings.qrY}
                  setQrY={(v) =>
                    setDraftSettings((prev) => ({
                      ...prev,
                      qrY: v,
                    }))
                  }
                  nameFontSize={draftSettings.nameFontSize}
                  setNameFontSize={(v) =>
                    setDraftSettings((prev) => ({
                      ...prev,
                      nameFontSize: v,
                    }))
                  }
                  nameWeight={draftSettings.nameWeight}
                  setNameWeight={(v) =>
                    setDraftSettings((prev) => ({
                      ...prev,
                      nameWeight: v,
                    }))
                  }
                  nameWidth={draftSettings.nameWidth}
                  setNameWidth={(v) =>
                    setDraftSettings((prev) => ({
                      ...prev,
                      nameWidth: v,
                    }))
                  }
                  nameX={draftSettings.nameX}
                  setNameX={(v) =>
                    setDraftSettings((prev) => ({
                      ...prev,
                      nameX: v,
                    }))
                  }
                  nameY={draftSettings.nameY}
                  setNameY={(v) =>
                    setDraftSettings((prev) => ({
                      ...prev,
                      nameY: v,
                    }))
                  }
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="bg-sky-800 px-4 py-3">
                <h2 className="font-semibold text-white">Actions</h2>
              </div>

              <div className="grid gap-3 p-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full rounded-md bg-sky-800 px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? 'Saving Settings...' : 'Save Settings'}
                </button>

                <button
                  onClick={handleReset}
                  disabled={resetting}
                  className="w-full rounded-md border px-4 py-3 font-medium disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resetting ? 'Resetting Layout...' : 'Reset Default Layout'}
                </button>

                <button
                  onClick={() => handlePrintView()}
                  className="w-full rounded-md bg-green-600 px-4 py-3 font-medium text-white"
                >
                  Print Test Badge
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}

          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="bg-sky-800 px-4 py-3">
              <h2 className="font-semibold text-white">Live Badge Preview</h2>
            </div>

            <div className="flex justify-center p-6">
              <BadgePreview
                attendee={previewAttendee}
                printRef={printRef}
                qrSize={draftSettings.qrSize}
                qrX={draftSettings.qrX}
                qrY={draftSettings.qrY}
                nameSize={draftSettings.nameFontSize}
                nameWeight={draftSettings.nameWeight}
                nameWidth={draftSettings.nameWidth}
                nameX={draftSettings.nameX}
                nameY={draftSettings.nameY}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
