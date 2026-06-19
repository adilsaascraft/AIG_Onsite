'use client'

interface Props {
  qrSize: number
  setQrSize: (v: number) => void

  qrX: number
  setQrX: (v: number) => void

  qrY: number
  setQrY: (v: number) => void

  nameFontSize: number
  setNameFontSize: (v: number) => void

  nameWeight: number
  setNameWeight: (v: number) => void

  nameWidth: number
  setNameWidth: (v: number) => void

  nameX: number
  setNameX: (v: number) => void

  nameY: number
  setNameY: (v: number) => void
}

export function QrSettings({
  qrSize,
  setQrSize,

  qrX,
  setQrX,

  qrY,
  setQrY,

  nameFontSize,
  setNameFontSize,

  nameWeight,
  setNameWeight,

  nameWidth,
  setNameWidth,

  nameX,
  setNameX,

  nameY,
  setNameY,
}: Props) {
  return (
    <div className="rounded-lg border bg-card p-4 space-y-6">
      {/* ====================================================== */}
      {/* QR SETTINGS */}
      {/* ====================================================== */}

      <div>
        <h2 className="text-lg font-bold">QR Settings</h2>

        <p className="text-sm text-muted-foreground">
          QR position and size are controlled independently.
        </p>
      </div>

      <Slider
        label="QR Size"
        value={qrSize}
        onChange={setQrSize}
        min={80}
        max={250}
      />

      <Slider
        label="QR Center X"
        value={qrX}
        onChange={setQrX}
        min={-200}
        max={200}
      />

      <Slider
        label="QR Center Y"
        value={qrY}
        onChange={setQrY}
        min={-200}
        max={200}
      />

      {/* ====================================================== */}
      {/* NAME SETTINGS */}
      {/* ====================================================== */}

      <div className="border-t pt-5">
        <h2 className="text-lg font-bold">Name Settings</h2>

        <p className="text-sm text-muted-foreground">
          Name position is completely separate from QR position.
        </p>
      </div>

      <Slider
        label="Name Font Size"
        value={nameFontSize}
        onChange={setNameFontSize}
        min={12}
        max={48}
      />

      <Slider
        label="Font Weight"
        value={nameWeight}
        onChange={setNameWeight}
        min={400}
        max={900}
      />

      <Slider
        label="Name Width"
        value={nameWidth}
        onChange={setNameWidth}
        min={150}
        max={350}
      />

      <Slider
        label="Name Center X"
        value={nameX}
        onChange={setNameX}
        min={-200}
        max={200}
      />

      <Slider
        label="Name Center Y"
        value={nameY}
        onChange={setNameY}
        min={-200}
        max={200}
      />
    </div>
  )
}

interface SliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

function Slider({
  label,
  value,
  onChange,
  min = -100,
  max = 100,
}: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>

        <span className="text-xs rounded-md bg-muted px-2 py-1">{value}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}
