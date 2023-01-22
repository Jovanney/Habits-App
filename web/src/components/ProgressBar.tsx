interface ProgressBarProps {
    progress: number
}

export const ProgressBar = (props: ProgressBarProps) => {
    const progressstyle = {
        width: `${props.progress}%`
    }
    return (
        <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
        <div 
          role="progressbar"
          aria-label="Progresso de hábitos completados nesse dia"
          aria-valuenow={props.progress}
          className="h-3 rounded-xl bg-violet-600 transition-all"
          style={{
            width: `${props.progress}%`
          }}
        />
      </div>
    );
}