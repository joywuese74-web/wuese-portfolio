// Every page except Home uses this wrapper so content clears the fixed
// navbar consistently, without each page having to remember the offset.
export default function PageWrapper({ children }) {
  return <div style={{ paddingTop: '68px' }}>{children}</div>
}