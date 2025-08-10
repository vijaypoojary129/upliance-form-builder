/**
 * Very small and simple evaluator for derived formulas.
 * Formula can reference parents as p0, p1, p2...
 * Example: 'Math.floor((Date.now()-new Date(p0))/31557600000)' for age from DOB
 * Note: Using Function here for the assignment (no untrusted network inputs). In production, replace with safer parser.
 */
export function evalDerived(formula: string, parentValues: any[]) {
  try {
    const fn = new Function(...parentValues.map((_,i)=>`p${i}`), `return (${formula});`)
    return fn(...parentValues)
  } catch (e) {
    console.error('derived eval failed', e)
    return ''
  }
}
