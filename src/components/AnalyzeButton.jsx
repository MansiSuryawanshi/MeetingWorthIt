export default function AnalyzeButton({ onClick, disabled, isAnalyzing, hasApiKey, demoMode }) {
  const label = demoMode
    ? 'Analyze This Meeting (Demo) →'
    : (!hasApiKey ? '🔑 Set API Key to Analyze' : 'Analyze This Meeting →')

  return (
    <button
      className="btn-primary"
      onClick={onClick}
      disabled={disabled || isAnalyzing}
    >
      {isAnalyzing ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Analyzing...
        </>
      ) : (
        label
      )}
    </button>
  )
}
