interface SceneMetaProps {
  scene: string
  label: string
}

export default function SceneMeta({ scene, label }: SceneMetaProps) {
  return (
    <div
      aria-hidden="true"
      /* @container frame: corner label nudges and grows slightly at desktop */
      className="absolute top-3 right-4 font-mono text-[8px] tracking-[0.20em] text-[var(--color-text-barely-visible)] @[1024px]/frame:top-4 @[1024px]/frame:right-5 @[1024px]/frame:text-[9px]"
    >
      SCENE_{scene} · {label}
    </div>
  )
}
