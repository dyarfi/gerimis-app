export function cToF(celsius) {
  const cTemp = celsius
  const cToFahr = (cTemp * 9) / 5 + 32
  return cToFahr
}

export function fToC(fahrenheit) {
  const fTemp = fahrenheit
  const fToCel = ((fTemp - 32) * 5) / 9
  return fToCel.toFixed(2)
}
