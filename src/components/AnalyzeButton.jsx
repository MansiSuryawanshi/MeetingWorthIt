export default function AnalyzeButton({ onClick, disabled, isAnalyzing, hasApiKey }) {
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
        <>
          {!hasApiKey ? '🔑 Set API Key to Analyze' : 'Analyze This Meeting →'}
        </>
      )}
    </button>
  )
}
