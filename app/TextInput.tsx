
export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  optional?: boolean
}

export const TextInput = ({ label, optional, ...props }: TextInputProps) => {

  return <div style={{ display: 'flex', flexDirection: 'column' }}>
    {label && (
    <label className='input-label'>
      {label}{optional && <span className='optional'>(optional)</span>}
    </label>
    )}
    <input className='input' {...props} />
  </div>
}